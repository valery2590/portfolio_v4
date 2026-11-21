export type Tab = "node" | "php" | "python" | "tests";

export const TABS: { id: Tab; label: string }[] = [
  { id: "node", label: "Node.js" },
  { id: "php", label: "PHP" },
  { id: "python", label: "Python" },
  { id: "tests", label: "Tests" },
];

export const SNIPPETS: Record<Tab, { file: string; runtime: string; status: string; code: string }> = {
  node: {
    file: "webhook.js",
    runtime: "node 20 · express · bullmq",
    status: "● 200 OK · queued in 38 ms",
    code: `// WhatsApp → CRM with signature check, idempotency and a queue
app.post('/webhook/whatsapp', verifySignature(META_SECRET), async (req, res) => {
  const msg = req.body.entry[0].changes[0].value.messages[0];
  if (await seen(msg.id)) return res.sendStatus(200); // idempotency

  await queue.add('sync-lead', normalize(msg), {
    attempts: 5, backoff: { type: 'exponential', delay: 2000 },
  });
  res.sendStatus(200); // answer fast, the CRM call goes through the queue
});

worker('sync-lead', async (lead) => {
  const existing = await crm.findByPhone(lead.phone);
  return existing ? crm.addNote(existing.id, lead.text)
                  : crm.createLead({ ...lead, source: 'whatsapp' });
});`,
  },
  php: {
    file: "WebhookController.php",
    runtime: "php 8.3 · queues",
    status: "● 200 OK · SyncLead job queued",
    code: `// WhatsApp → CRM with signature check, idempotency and a queue
$raw = file_get_contents('php://input');
$sig = 'sha256=' . hash_hmac('sha256', $raw, $secret);
if (!hash_equals($sig, $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '')) {
    http_response_code(401); exit;
}

$msg = json_decode($raw, true)['entry'][0]['changes'][0]['value']['messages'][0];
if ($cache->has('wa:' . $msg['id'])) { http_response_code(200); exit; } // idempotency

$queue->push(new SyncLead(normalize($msg)), tries: 5, backoff: [2, 10, 60]);
http_response_code(200);`,
  },
  python: {
    file: "main.py",
    runtime: "python 3.12 · cloud functions · cloud tasks",
    status: "● 200 OK · task created",
    code: `# WhatsApp → CRM with signature check, idempotency and retries
@functions_framework.http
def whatsapp_webhook(request):
    if not valid_signature(request, META_SECRET):
        return ('', 401)

    msg = request.get_json()['entry'][0]['changes'][0]['value']['messages'][0]
    if store.exists('wa:' + msg['id']):  # idempotency
        return ('', 200)

    tasks.enqueue('sync_lead', normalize(msg), max_attempts=5)
    return ('', 200)`,
  },
  tests: {
    file: "sync-lead.test.js",
    runtime: "vitest",
    status: "✓ 3 tests passed",
    code: `// What it has to guarantee before reaching production
test('does not duplicate the lead when Meta resends the webhook', async () => {
  await post('/webhook/whatsapp', payload);
  await post('/webhook/whatsapp', payload); // Meta retry
  expect(await crm.leads.count()).toBe(1);
});

test('retries when the CRM returns 503', async () => {
  crm.failNext(503, { times: 2 });
  await runWorker('sync-lead', lead);
  expect(crm.createLead).toHaveBeenCalledTimes(3);
});

test('rejects requests without a valid signature', async () => {
  const res = await post('/webhook/whatsapp', payload, { signature: 'x' });
  expect(res.status).toBe(401);
});`,
  },
};

const KEYWORDS = /^(const|let|async|await|if|else|def|return|true|false|null|new|not|exit|test|expect)$/;
const TOKEN = /(\/\/.*$|#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(@[\w_]+)|(\$\w+)|\b([A-Za-z_]+)\b/gm;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Tiny syntax highlighter for the hardcoded snippets above (trusted input). */
export function highlight(src: string): string {
  let out = "";
  let last = 0;
  for (const m of src.matchAll(TOKEN)) {
    out += esc(src.slice(last, m.index));
    const tok = esc(m[0]);
    if (m[1]) out += `<span class="cm">${tok}</span>`;
    else if (m[2]) out += `<span class="st">${tok}</span>`;
    else if (m[3]) out += `<span class="kw">${tok}</span>`;
    else if (m[4]) out += `<span class="vr">${tok}</span>`;
    else if (m[5] && KEYWORDS.test(m[5])) out += `<span class="kw">${tok}</span>`;
    else out += tok;
    last = (m.index ?? 0) + m[0].length;
  }
  out += esc(src.slice(last));
  return out
    .split("\n")
    .map((l) => `<span class="ln">${l || " "}</span>`)
    .join("");
}

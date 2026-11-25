import type { Post } from "@/lib/blog";

const post: Post = {
  slug: "idempotency",
  number: 2,
  date: "2026-11-28",
  content: {
    es: {
      title: "Un clic, dos leads: por qué tu API crea duplicados",
      description:
        "Bloquear el botón evita el doble clic, pero no los reintentos ni los webhooks repetidos. Una clave de idempotencia evita el doble efecto en el backend.",
      tags: ["idempotencia", "apis", "webhooks"],
      social: {
        hook: "El frontend evita el doble clic. El backend evita el doble efecto.",
        highlight: "El backend evita el doble efecto.",
        points: ["Bloquear el botón solo protege tu interfaz", "Un timeout no es un fallo: es no saber", "Misma clave, misma respuesta: sin duplicados"],
      },
      body: [
        { t: "p", text: "La primera solución que casi todo el mundo aplica contra las peticiones duplicadas es bloquear el botón al enviar el formulario. Funciona… hasta que un webhook reintenta." },
        { t: "p", text: "Es un patrón muy común: la conexión va lenta, la misma petición llega dos veces a la API y el resultado son dos leads iguales en el CRM, dos mensajes de WhatsApp o dos cobros." },
        { t: "h2", text: "Por qué bloquear el botón no basta" },
        { t: "p", text: "Bloquear el botón es buena idea y conviene mantenerlo. Pero solo protege **tu interfaz**. Hay muchas formas de que la misma petición llegue dos veces sin que nadie haga doble clic:" },
        { t: "ul", items: [
          "**Webhooks:** si tu endpoint tarda en responder, el proveedor da la entrega por fallida y la reintenta.",
          "**Reintentos de red:** la petición llega, pero la respuesta se pierde, y el cliente HTTP vuelve a enviarla.",
          "**El usuario:** recarga la página, abre otra pestaña o pulsa «atrás» y reenvía el formulario.",
          "**Otros clientes:** una app, un script o una integración ni siquiera pasan por tu botón.",
        ] },
        { t: "h2", text: "Un timeout no es un fallo" },
        { t: "p", text: "Esta es la idea clave: cuando una petición caduca, **no sabes qué ha pasado**. Puede que el servidor ya haya creado el registro y solo se haya perdido la respuesta. Si reintentas a ciegas, lo duplicas." },
        { t: "h2", text: "La solución: una clave de idempotencia" },
        { t: "p", text: "Una operación es idempotente cuando repetirla da el mismo resultado que hacerla una vez. Para conseguirlo en un `POST`, cada petición lleva un identificador único:" },
        { t: "code", text: "POST /leads\nIdempotency-Key: 7f3c9a2e-4b1d-4c8a-9e2f-1a6b0d5c3e7f" },
        { t: "ul", items: [
          "El cliente genera la clave **una vez** por operación y la reutiliza en cada reintento.",
          "La API guarda la clave junto con la respuesta.",
          "Si la misma clave vuelve a llegar, devuelve la respuesta guardada en vez de crear otro registro.",
        ] },
        { t: "p", text: "En los webhooks entrantes la clave suele venir hecha: casi todos los proveedores envían un ID de evento. Guárdalo y descarta los que ya hayas procesado." },
        { t: "h2", text: "Lo difícil" },
        { t: "p", text: "Generar la clave es lo fácil. Lo complicado está en los detalles:" },
        { t: "ul", items: [
          "**Cuánto tiempo guardarla:** lo suficiente para cubrir los reintentos (horas o días), no para siempre.",
          "**Peticiones simultáneas:** si la segunda llega mientras la primera aún se procesa, hace falta un bloqueo o una restricción única en la base de datos.",
          "**Misma clave, otros datos:** si cambia el contenido de la petición, lo correcto es rechazarla con un error claro.",
        ] },
        { t: "quote", text: "Comprobar «¿ya existe este lead?» antes de insertarlo no basta: dos peticiones simultáneas pueden pasar la comprobación a la vez. Usa una restricción única en la base de datos." },
        { t: "h2", text: "Checklist" },
        { t: "ul", items: [
          "¿Qué endpoints crean algo o tienen efectos (registros, mensajes, cobros)?",
          "¿Aceptan una clave de idempotencia o un ID de evento?",
          "¿Dónde la guardas y cuánto tiempo?",
          "¿Qué pasa si llegan dos peticiones iguales a la vez?",
          "¿Tu frontend reutiliza la misma clave al reintentar?",
        ] },
        { t: "p", text: "El frontend evita el doble clic. **El backend evita el doble efecto.**" },
      ],
    },
    en: {
      title: "One click, two leads: why your API creates duplicates",
      description:
        "Disabling the button stops double clicks, but not retries or repeated webhooks. An idempotency key stops the double effect in the backend.",
      tags: ["idempotency", "apis", "webhooks"],
      social: {
        hook: "The frontend prevents the double click. The backend prevents the double effect.",
        highlight: "The backend prevents the double effect.",
        points: ["Disabling the button only protects your UI", "A timeout means you don't know, not that it failed", "Same key, same response: no duplicates"],
      },
      linkedin: `My first fix for duplicate requests?
Disable the button. Problem solved. 🙌 Until a webhook retried. 🥲

It's a very common pattern: a form is submitted, the connection is slow, and the same request reaches the API twice.

The result: two identical leads in the CRM, two WhatsApp messages, or two charges.

Disabling the button helps, and I still do it. But it only protects your UI.

It doesn't stop:
→ A webhook provider retrying because you answered too slowly.
→ A network retry after the response got lost.
→ A second tab, or the "back" button resending the form.

Here's the key: a timeout doesn't mean the request failed. It means you don't know what happened.

The real fix lives in the backend: an idempotency key.

→ Each request carries a unique ID.
→ The API stores that ID with its response.
→ If the same ID comes back, it returns the saved response instead of creating a new record.

The hard part isn't generating the key. It's deciding how long to keep it, and what to do when the second request arrives while the first one is still running.

The frontend prevents the double click. The backend prevents the double effect.

Have you ever found a "ghost" duplicate in your database? 👇

📌 This is #2 of Integrations without drama.
A new pattern every week. Follow me so you don't miss the next one.

#IntegrationsWithoutDrama #APIDesign #Webhooks #NodeJS #BackendDevelopment`,
      body: [
        { t: "p", text: "The first fix almost everyone applies against duplicate requests is disabling the button when the form is submitted. It works… until a webhook retries." },
        { t: "p", text: "It's a very common pattern: the connection is slow, the same request reaches the API twice, and you end up with two identical leads in the CRM, two WhatsApp messages, or two charges." },
        { t: "h2", text: "Why disabling the button isn't enough" },
        { t: "p", text: "Disabling the button is a good idea, and you should keep doing it. But it only protects **your UI**. There are plenty of ways for the same request to arrive twice without anyone double-clicking:" },
        { t: "ul", items: [
          "**Webhooks:** if your endpoint is slow to respond, the provider marks the delivery as failed and retries it.",
          "**Network retries:** the request arrives, but the response gets lost, and the HTTP client sends it again.",
          "**The user:** reloads the page, opens a second tab, or hits \"back\" and resubmits the form.",
          "**Other clients:** an app, a script, or another integration never goes through your button.",
        ] },
        { t: "h2", text: "A timeout isn't a failure" },
        { t: "p", text: "Here's the key idea: when a request times out, **you don't know what happened**. The server may have already created the record, and only the response got lost. Retry blindly and you create a duplicate." },
        { t: "h2", text: "The fix: an idempotency key" },
        { t: "p", text: "An operation is idempotent when doing it twice has the same result as doing it once. To get there with a `POST`, every request carries a unique ID:" },
        { t: "code", text: "POST /leads\nIdempotency-Key: 7f3c9a2e-4b1d-4c8a-9e2f-1a6b0d5c3e7f" },
        { t: "ul", items: [
          "The client generates the key **once** per operation and reuses it on every retry.",
          "The API stores the key along with its response.",
          "If the same key comes back, it returns the saved response instead of creating a new record.",
        ] },
        { t: "p", text: "For incoming webhooks, the key usually comes for free: almost every provider sends an event ID. Store it and skip the events you've already processed." },
        { t: "h2", text: "The hard part" },
        { t: "p", text: "Generating the key is easy. The tricky part is in the details:" },
        { t: "ul", items: [
          "**How long to keep it:** long enough to cover retries (hours or days), not forever.",
          "**Concurrent requests:** if the second one arrives while the first is still running, you need a lock or a unique constraint in the database.",
          "**Same key, different data:** if the request body changed, the right move is to reject it with a clear error.",
        ] },
        { t: "quote", text: "Checking \"does this lead already exist?\" before inserting isn't enough: two concurrent requests can both pass the check. Use a unique constraint in the database." },
        { t: "h2", text: "Checklist" },
        { t: "ul", items: [
          "Which endpoints create something or have side effects (records, messages, charges)?",
          "Do they accept an idempotency key or an event ID?",
          "Where do you store it, and for how long?",
          "What happens if two identical requests arrive at the same time?",
          "Does your frontend reuse the same key when it retries?",
        ] },
        { t: "p", text: "The frontend prevents the double click. **The backend prevents the double effect.**" },
      ],
    },
    it: {
      title: "Un clic, due lead: perché la tua API crea duplicati",
      description:
        "Bloccare il pulsante evita il doppio clic, ma non i tentativi ripetuti né i webhook doppi. Una chiave di idempotenza evita il doppio effetto nel backend.",
      tags: ["idempotenza", "api", "webhook"],
      social: {
        hook: "Il frontend evita il doppio clic. Il backend evita il doppio effetto.",
        highlight: "Il backend evita il doppio effetto.",
        points: ["Bloccare il pulsante protegge solo l'interfaccia", "Un timeout non è un errore: è non sapere", "Stessa chiave, stessa risposta: niente duplicati"],
      },
      body: [
        { t: "p", text: "La prima soluzione che quasi tutti applicano contro le richieste duplicate è bloccare il pulsante all'invio del modulo. Funziona… finché un webhook non riprova." },
        { t: "p", text: "È uno schema molto comune: la connessione è lenta, la stessa richiesta arriva due volte all'API e il risultato sono due lead identici nel CRM, due messaggi WhatsApp o due addebiti." },
        { t: "h2", text: "Perché bloccare il pulsante non basta" },
        { t: "p", text: "Bloccare il pulsante è una buona idea e conviene mantenerlo. Ma protegge solo **la tua interfaccia**. Ci sono molti modi in cui la stessa richiesta arriva due volte senza nessun doppio clic:" },
        { t: "ul", items: [
          "**Webhook:** se il tuo endpoint risponde lentamente, il fornitore considera fallita la consegna e la ripete.",
          "**Tentativi di rete:** la richiesta arriva, ma la risposta si perde, e il client HTTP la invia di nuovo.",
          "**L'utente:** ricarica la pagina, apre un'altra scheda o torna «indietro» e reinvia il modulo.",
          "**Altri client:** un'app, uno script o un'altra integrazione non passano nemmeno dal tuo pulsante.",
        ] },
        { t: "h2", text: "Un timeout non è un errore" },
        { t: "p", text: "Ecco l'idea chiave: quando una richiesta va in timeout, **non sai cosa è successo**. Il server potrebbe aver già creato il record e si è persa solo la risposta. Se riprovi alla cieca, lo duplichi." },
        { t: "h2", text: "La soluzione: una chiave di idempotenza" },
        { t: "p", text: "Un'operazione è idempotente quando ripeterla dà lo stesso risultato che farla una volta. Per ottenerlo con un `POST`, ogni richiesta porta un identificativo univoco:" },
        { t: "code", text: "POST /leads\nIdempotency-Key: 7f3c9a2e-4b1d-4c8a-9e2f-1a6b0d5c3e7f" },
        { t: "ul", items: [
          "Il client genera la chiave **una sola volta** per operazione e la riusa a ogni nuovo tentativo.",
          "L'API salva la chiave insieme alla risposta.",
          "Se la stessa chiave torna, restituisce la risposta salvata invece di creare un nuovo record.",
        ] },
        { t: "p", text: "Nei webhook in arrivo la chiave di solito c'è già: quasi tutti i fornitori inviano un ID evento. Salvalo e scarta quelli già elaborati." },
        { t: "h2", text: "La parte difficile" },
        { t: "p", text: "Generare la chiave è facile. Il difficile sta nei dettagli:" },
        { t: "ul", items: [
          "**Quanto tempo conservarla:** abbastanza da coprire i tentativi (ore o giorni), non per sempre.",
          "**Richieste simultanee:** se la seconda arriva mentre la prima è ancora in corso, serve un lock o un vincolo di unicità nel database.",
          "**Stessa chiave, dati diversi:** se il contenuto della richiesta è cambiato, la cosa giusta è rifiutarla con un errore chiaro.",
        ] },
        { t: "quote", text: "Controllare «questo lead esiste già?» prima di inserirlo non basta: due richieste simultanee possono superare il controllo insieme. Usa un vincolo di unicità nel database." },
        { t: "h2", text: "Checklist" },
        { t: "ul", items: [
          "Quali endpoint creano qualcosa o hanno effetti (record, messaggi, addebiti)?",
          "Accettano una chiave di idempotenza o un ID evento?",
          "Dove la salvi e per quanto tempo?",
          "Cosa succede se arrivano due richieste identiche nello stesso momento?",
          "Il tuo frontend riusa la stessa chiave quando riprova?",
        ] },
        { t: "p", text: "Il frontend evita il doppio clic. **Il backend evita il doppio effetto.**" },
      ],
    },
  },
};

export default post;

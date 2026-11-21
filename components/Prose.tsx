import type { Block } from "@/lib/blog";

/** Renders **bold** and `code` inside a line of trusted article text. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((item) => (
                  <li key={item}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <Inline text={b.text} />
              </blockquote>
            );
          default:
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
        }
      })}
    </div>
  );
}

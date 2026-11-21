import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="wrap">
        <p className="mono">404 · route not connected</p>
        <h1>Esta ruta no está conectada</h1>
        <Link className="btn primary" href="/">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}

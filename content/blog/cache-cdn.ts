import type { Post } from "@/lib/blog";

const post: Post = {
  slug: "cache-cdn",
  number: 1,
  date: "2026-11-21",
  customImage: true,
  content: {
    es: {
      title: "Cada visita, una llamada a la API: ¿de verdad hace falta?",
      description:
        "Un patrón muy común que ralentiza webs y satura servidores, y cómo un caché en el CDN lo resuelve sin escalar infraestructura.",
      tags: ["rendimiento", "javascript", "cdn"],
      social: {
        hook: "Antes de escalar el servidor, pregúntate qué peticiones necesitan llegar a él.",
        highlight: "pregúntate qué peticiones necesitan llegar a él.",
        points: ["Un fetch en cada visita satura el servidor", "Si el dato cambia poco, sirve una copia desde el CDN", "Lo difícil es decidir cuándo renovar"],
      },
      linkedin: `Cada visita, una llamada a la API.
¿De verdad hace falta? 🤔

Es un patrón muy común: un script en JavaScript que, al cargar la página, hace un fetch para traer los datos que el usuario necesita.

Con poco tráfico funciona perfecto.

Pero cuando crecen las visitas, cada usuario es una consulta más contra el servidor. Y llega el síntoma clásico: todo va más lento.

Antes de escalar el servidor, conviene hacerse una pregunta:

👉 ¿Estos datos cambian en cada visita, o solo de vez en cuando?

Si cambian una vez al día, estás consultando al servidor miles de veces para obtener la misma respuesta.

La solución suele ser sencilla: un caché en el CDN.

→ La primera petición llega al servidor.
→ Las siguientes reciben una copia desde el nodo más cercano al usuario.
→ Cuando el dato se actualiza, se renueva la copia.

Resultado: datos al instante, un servidor que respira y una experiencia fluida.

Lo difícil no es cachear. Es decidir cuándo renovar: cada cuánto cambia el dato y qué pasa si alguien ve una versión de hace unas horas.

Antes de escalar el servidor, pregúntate cuántas de esas peticiones necesitan llegar a él.

📌 Esto es el #1 de Integraciones sin drama.
Cada semana, un patrón nuevo. Sígueme si no quieres perderte el siguiente.

#IntegracionesSinDrama #webperformance #javascript #cdn`,
      body: [
        { t: "p", text: "Es un patrón muy común: un script en JavaScript que, al cargar la página, hace un `fetch` para traer los datos que el usuario necesita." },
        { t: "p", text: "Con poco tráfico funciona perfecto. Pero cuando crecen las visitas, cada usuario es una consulta más contra el servidor. Y llega el síntoma clásico: **todo va más lento**." },
        { t: "h2", text: "La pregunta clave" },
        { t: "p", text: "Antes de escalar el servidor, conviene hacerse una pregunta: **¿estos datos cambian en cada visita, o solo de vez en cuando?**" },
        { t: "p", text: "Si cambian, por ejemplo, una vez al día, estás consultando al servidor miles de veces para obtener la misma respuesta. Cada una de esas peticiones cuesta tiempo al usuario y recursos al servidor." },
        { t: "h2", text: "La solución: un caché en el CDN" },
        { t: "p", text: "Un CDN tiene nodos repartidos por todo el mundo. Si le dices que puede guardar una copia de la respuesta, el flujo cambia por completo:" },
        { t: "ul", items: [
          "La primera petición llega al servidor.",
          "Las siguientes reciben una copia desde el nodo más cercano al usuario.",
          "Cuando el dato se actualiza, se renueva la copia.",
        ] },
        { t: "p", text: "Normalmente basta con que la API devuelva las cabeceras adecuadas:" },
        { t: "code", text: "Cache-Control: public, max-age=60, s-maxage=86400, stale-while-revalidate=3600" },
        { t: "ul", items: [
          "`max-age=60`: el navegador reutiliza la respuesta durante un minuto.",
          "`s-maxage=86400`: el CDN la guarda hasta 24 horas.",
          "`stale-while-revalidate=3600`: si la copia ha caducado, el CDN sigue sirviéndola mientras pide una nueva en segundo plano. El usuario nunca espera.",
        ] },
        { t: "h2", text: "Lo difícil: decidir cuándo renovar" },
        { t: "p", text: "Cachear es fácil. Lo que de verdad hay que pensar es **cuándo deja de ser válida la copia** y qué pasa si alguien ve una versión de hace unas horas. Hay tres estrategias habituales:" },
        { t: "ul", items: [
          "**Caducidad (TTL):** la copia expira sola cada cierto tiempo. Ideal cuando el dato cambia con un ritmo conocido, por ejemplo una vez al día.",
          "**Purga al actualizar:** cuando el dato cambia, se llama a la API del CDN para borrar la copia. Siempre fresco, pero exige integrarlo en el proceso que actualiza.",
          "**Versionar la URL:** añadir una versión o fecha a la URL (`/datos?v=2026-11-21`). Cada versión es una copia distinta y nunca se mezclan.",
        ] },
        { t: "quote", text: "Ojo: si la respuesta depende del usuario (sesión, permisos, datos personales), no puede ir en un caché compartido. Esos datos se marcan como `private` o se separan de la parte común." },
        { t: "h2", text: "Checklist antes de escalar el servidor" },
        { t: "ul", items: [
          "¿Cuántas peticiones reciben exactamente la misma respuesta?",
          "¿Cada cuánto cambia realmente ese dato?",
          "¿Es aceptable que alguien vea una versión de hace unos minutos u horas?",
          "¿La respuesta contiene algo personal o depende de la sesión?",
          "¿Cómo se renovará la copia cuando el dato cambie?",
        ] },
        { t: "p", text: "Muchas veces, la mejora de rendimiento más barata no es un servidor más grande, sino **dejar de preguntar lo que ya sabes**." },
      ],
    },
    en: {
      title: "An API call on every visit: do you really need it?",
      description:
        "A very common pattern that slows sites down and overloads servers, and how a CDN cache fixes it without scaling infrastructure.",
      tags: ["performance", "javascript", "cdn"],
      social: {
        hook: "Before scaling the server, ask which requests actually need to reach it.",
        highlight: "ask which requests actually need to reach it.",
        points: ["A fetch on every visit overloads the server", "If data rarely changes, serve a CDN copy", "The hard part is deciding when to refresh"],
      },
      body: [
        { t: "p", text: "It's a very common pattern: a JavaScript snippet that, when the page loads, runs a `fetch` to get the data the user needs." },
        { t: "p", text: "With little traffic it works perfectly. But as visits grow, every user is one more request hitting the server. And the classic symptom shows up: **everything gets slower**." },
        { t: "h2", text: "The key question" },
        { t: "p", text: "Before scaling the server, ask yourself: **does this data change on every visit, or only once in a while?**" },
        { t: "p", text: "If it changes, say, once a day, you're asking the server thousands of times for the same answer. Each of those requests costs the user time and the server resources." },
        { t: "h2", text: "The fix: a CDN cache" },
        { t: "p", text: "A CDN has nodes all over the world. If you let it keep a copy of the response, the flow changes completely:" },
        { t: "ul", items: [
          "The first request reaches the server.",
          "The following ones get a copy from the node closest to the user.",
          "When the data changes, the copy is refreshed.",
        ] },
        { t: "p", text: "Usually all it takes is the right headers on the API response:" },
        { t: "code", text: "Cache-Control: public, max-age=60, s-maxage=86400, stale-while-revalidate=3600" },
        { t: "ul", items: [
          "`max-age=60`: the browser reuses the response for one minute.",
          "`s-maxage=86400`: the CDN keeps it for up to 24 hours.",
          "`stale-while-revalidate=3600`: if the copy has expired, the CDN keeps serving it while fetching a fresh one in the background. The user never waits.",
        ] },
        { t: "h2", text: "The hard part: deciding when to refresh" },
        { t: "p", text: "Caching is easy. What you really need to think about is **when the copy stops being valid**, and what happens if someone sees a version from a few hours ago. There are three common strategies:" },
        { t: "ul", items: [
          "**Expiry (TTL):** the copy expires on its own after a set time. Ideal when the data changes at a known pace, like once a day.",
          "**Purge on update:** when the data changes, call the CDN's API to drop the copy. Always fresh, but it has to be wired into whatever updates the data.",
          "**Versioned URLs:** add a version or date to the URL (`/data?v=2026-11-21`). Each version is a separate copy and they never mix.",
        ] },
        { t: "quote", text: "Careful: if the response depends on the user (session, permissions, personal data), it can't go in a shared cache. Mark that data as `private` or split it from the shared part." },
        { t: "h2", text: "Checklist before scaling the server" },
        { t: "ul", items: [
          "How many requests get exactly the same response?",
          "How often does that data really change?",
          "Is it acceptable for someone to see a version that's minutes or hours old?",
          "Does the response contain anything personal or session-dependent?",
          "How will the copy be refreshed when the data changes?",
        ] },
        { t: "p", text: "Often the cheapest performance win isn't a bigger server. It's **not asking for what you already know**." },
      ],
    },
    it: {
      title: "Una chiamata all'API a ogni visita: serve davvero?",
      description:
        "Un pattern molto comune che rallenta i siti e sovraccarica i server, e come una cache sulla CDN lo risolve senza scalare l'infrastruttura.",
      tags: ["performance", "javascript", "cdn"],
      social: {
        hook: "Prima di scalare il server, chiediti quali richieste devono davvero arrivarci.",
        highlight: "chiediti quali richieste devono davvero arrivarci.",
        points: ["Un fetch a ogni visita sovraccarica il server", "Se il dato cambia poco, servi una copia dalla CDN", "La parte difficile è decidere quando rinnovare"],
      },
      body: [
        { t: "p", text: "È un pattern molto comune: uno script JavaScript che, al caricamento della pagina, esegue un `fetch` per ottenere i dati di cui l'utente ha bisogno." },
        { t: "p", text: "Con poco traffico funziona perfettamente. Ma quando le visite crescono, ogni utente è una richiesta in più verso il server. E arriva il sintomo classico: **tutto diventa più lento**." },
        { t: "h2", text: "La domanda chiave" },
        { t: "p", text: "Prima di scalare il server, chiediti: **questi dati cambiano a ogni visita o solo ogni tanto?**" },
        { t: "p", text: "Se cambiano, ad esempio, una volta al giorno, stai chiedendo al server migliaia di volte la stessa risposta. Ognuna di queste richieste costa tempo all'utente e risorse al server." },
        { t: "h2", text: "La soluzione: una cache sulla CDN" },
        { t: "p", text: "Una CDN ha nodi in tutto il mondo. Se le permetti di conservare una copia della risposta, il flusso cambia completamente:" },
        { t: "ul", items: [
          "La prima richiesta arriva al server.",
          "Le successive ricevono una copia dal nodo più vicino all'utente.",
          "Quando il dato cambia, la copia viene rinnovata.",
        ] },
        { t: "p", text: "Di solito bastano le intestazioni giuste nella risposta dell'API:" },
        { t: "code", text: "Cache-Control: public, max-age=60, s-maxage=86400, stale-while-revalidate=3600" },
        { t: "ul", items: [
          "`max-age=60`: il browser riutilizza la risposta per un minuto.",
          "`s-maxage=86400`: la CDN la conserva fino a 24 ore.",
          "`stale-while-revalidate=3600`: se la copia è scaduta, la CDN continua a servirla mentre ne richiede una nuova in background. L'utente non aspetta mai.",
        ] },
        { t: "h2", text: "La parte difficile: decidere quando rinnovare" },
        { t: "p", text: "Mettere in cache è facile. Ciò a cui bisogna davvero pensare è **quando la copia smette di essere valida** e cosa succede se qualcuno vede una versione di qualche ora fa. Ci sono tre strategie comuni:" },
        { t: "ul", items: [
          "**Scadenza (TTL):** la copia scade da sola dopo un certo tempo. Ideale quando il dato cambia con un ritmo noto, ad esempio una volta al giorno.",
          "**Purge all'aggiornamento:** quando il dato cambia, si chiama l'API della CDN per eliminare la copia. Sempre aggiornato, ma va integrato nel processo che aggiorna i dati.",
          "**URL versionate:** aggiungere una versione o una data all'URL (`/dati?v=2026-11-21`). Ogni versione è una copia distinta e non si mescolano mai.",
        ] },
        { t: "quote", text: "Attenzione: se la risposta dipende dall'utente (sessione, permessi, dati personali), non può finire in una cache condivisa. Quei dati vanno marcati come `private` o separati dalla parte comune." },
        { t: "h2", text: "Checklist prima di scalare il server" },
        { t: "ul", items: [
          "Quante richieste ricevono esattamente la stessa risposta?",
          "Ogni quanto cambia davvero quel dato?",
          "È accettabile che qualcuno veda una versione di qualche minuto o ora fa?",
          "La risposta contiene qualcosa di personale o dipende dalla sessione?",
          "Come verrà rinnovata la copia quando il dato cambia?",
        ] },
        { t: "p", text: "Spesso il miglioramento di performance più economico non è un server più grande, ma **smettere di chiedere ciò che sai già**." },
      ],
    },
  },
};

export default post;

import type { Post } from "@/lib/blog";

const post: Post = {
  slug: "lead-scoring",
  number: 2,
  date: "2026-11-28",
  content: {
    es: {
      title: "No necesitas más leads: necesitas leer mejor los que ya llegan",
      description:
        "Cada dato que recibe un CRM ya dice algo sobre el lead. El lead scoring convierte esas señales en una prioridad clara para el equipo comercial.",
      tags: ["leadscoring", "crm", "integraciones"],
      social: {
        hook: "No necesitas más leads. Necesitas leer mejor los que ya llegan.",
        highlight: "Necesitas leer mejor los que ya llegan.",
        points: ["Cada dato del lead es una señal", "El scoring convierte señales en prioridad", "La clave está en conectar chat, formulario y CRM"],
      },
      linkedin: `No todos los leads valen lo mismo.
Pero muchos CRMs los tratan igual.

Un lead que pregunta por el precio a las 10 de la mañana, desde una campaña concreta y tras visitar tres páginas…

…no es lo mismo que uno que solo deja su email en un formulario genérico.

Y aun así, los dos suelen acabar en la misma lista, con la misma prioridad.

Cada dato que recibimos ya dice algo:

→ De dónde viene: la campaña, el portal o el canal.
→ Qué pregunta: precio, disponibilidad o información general.
→ Cuándo y cómo responde: rápido, tarde o nunca.
→ Qué ha visto antes: páginas, productos, interacciones previas.

El lead scoring convierte esas señales en un número.
Y ese número, en una decisión: a quién llamar primero. 📞

La oportunidad no está en tener más leads.
Está en leer mejor los que ya llegan.

La mayoría de empresas tiene estos datos repartidos entre el chat, el formulario y el CRM, sin conectar.

Ahí es donde una buena integración cambia el juego: no solo mueve datos de A a B, sino que los convierte en prioridad para el equipo comercial.

¿En tu empresa diferenciáis entre leads calientes y fríos, o todos entran por la misma puerta? 👇

📌 Esto es el #2 de Integraciones sin drama.
Cada semana, un patrón nuevo. Sígueme si no quieres perderte el siguiente.

#IntegracionesSinDrama #leadscoring #crm #ventas`,
      body: [
        { t: "p", text: "No todos los leads valen lo mismo. Pero en muchos CRMs entran todos por la misma puerta, con la misma prioridad y en la misma lista." },
        { t: "p", text: "Un lead que pregunta por el precio a media mañana, desde una campaña concreta y después de visitar tres páginas, no se parece en nada a uno que solo deja su email en un formulario genérico. Y aun así, el equipo comercial los ve igual." },
        { t: "h2", text: "Cada dato ya es una señal" },
        { t: "p", text: "La buena noticia es que la información para distinguirlos **ya existe**. Llega con cada lead, solo que nadie la está leyendo:" },
        { t: "ul", items: [
          "**Origen:** la campaña, el portal o el canal por el que llega.",
          "**Intención:** qué pregunta (precio, disponibilidad, información general).",
          "**Comportamiento:** cuándo responde, cuánto tarda, si vuelve.",
          "**Contexto previo:** páginas vistas, productos consultados, interacciones anteriores.",
        ] },
        { t: "h2", text: "Qué hace el lead scoring" },
        { t: "p", text: "El lead scoring asigna puntos a cada señal y los suma en un número, normalmente de 0 a 100. Ese número se traduce en una decisión sencilla: **a quién llamar primero**." },
        { t: "ul", items: [
          "**Caliente:** contactar hoy, idealmente en minutos.",
          "**Templado:** seguimiento en los próximos días.",
          "**Frío:** nutrir con contenido hasta que dé nuevas señales.",
        ] },
        { t: "p", text: "No hace falta empezar con nada complejo. Un modelo de reglas con cinco o seis señales bien elegidas ya cambia la forma de trabajar de un equipo." },
        { t: "h2", text: "El problema real: los datos están separados" },
        { t: "p", text: "Casi nunca falta información. Lo que falta es **conectarla**. El chat sabe qué preguntó el lead, el formulario sabe de qué campaña venía y el CRM sabe si ya era cliente. Cada sistema tiene una parte de la historia." },
        { t: "p", text: "Por eso el scoring es, sobre todo, un problema de integración: reunir las señales en un mismo sitio, en el momento en que llega el lead, y devolver la puntuación al CRM para que el equipo la vea donde ya trabaja." },
        { t: "quote", text: "Ojo con puntuar solo lo fácil de medir. Que alguien abra un email no dice lo mismo que pedir un presupuesto. Da más peso a las señales que reflejan intención real." },
        { t: "h2", text: "Checklist para empezar" },
        { t: "ul", items: [
          "¿Qué señales recibes hoy con cada lead y dónde se guardan?",
          "¿Cuáles predicen de verdad una venta? Pregunta al equipo comercial.",
          "¿Cuántos puntos vale cada una y qué umbral separa caliente de frío?",
          "¿Dónde verá el equipo la puntuación? Mejor en el CRM, no en otra herramienta.",
          "¿Cada cuánto revisarás si el modelo acierta?",
        ] },
        { t: "p", text: "La oportunidad no está en conseguir más leads. Está en **leer mejor los que ya llegan**." },
      ],
    },
    en: {
      title: "You don't need more leads: you need to read the ones you have",
      description:
        "Every piece of data a CRM receives already says something about the lead. Lead scoring turns those signals into a clear priority for sales.",
      tags: ["leadscoring", "crm", "integrations"],
      social: {
        hook: "You don't need more leads. You need to read the ones you already have.",
        highlight: "You need to read the ones you already have.",
        points: ["Every lead data point is a signal", "Scoring turns signals into priority", "The key is connecting chat, forms and CRM"],
      },
      linkedin: `Not every lead is worth the same.
But most CRMs treat them all alike.

A lead asking about pricing at 10am, from a specific campaign, after visiting three pages…

…is nothing like one who just drops an email into a generic form.

And yet both usually end up in the same list, with the same priority.

Every data point you receive already says something:

→ Where it comes from: the campaign, the portal or the channel.
→ What it asks: pricing, availability or general info.
→ When and how it replies: fast, late or never.
→ What it saw before: pages, products, previous interactions.

Lead scoring turns those signals into a number.
And that number into a decision: who to call first. 📞

The opportunity isn't getting more leads.
It's reading the ones you already have.

Most companies have this data scattered across chat, forms and the CRM, unconnected.

That's where a good integration changes the game: it doesn't just move data from A to B, it turns it into priority for the sales team.

Does your team tell hot leads from cold ones, or does everyone come in through the same door? 👇

📌 This is #2 of Integrations without drama.
A new pattern every week. Follow me so you don't miss the next one.

#IntegrationsWithoutDrama #leadscoring #crm #sales`,
      body: [
        { t: "p", text: "Not every lead is worth the same. Yet in many CRMs they all come through the same door, with the same priority, into the same list." },
        { t: "p", text: "A lead asking about pricing mid-morning, from a specific campaign, after visiting three pages, is nothing like one who just leaves an email in a generic form. And still, the sales team sees them the same way." },
        { t: "h2", text: "Every data point is already a signal" },
        { t: "p", text: "The good news: the information to tell them apart **already exists**. It arrives with every lead; nobody is reading it:" },
        { t: "ul", items: [
          "**Source:** the campaign, portal or channel it came from.",
          "**Intent:** what they ask about (pricing, availability, general info).",
          "**Behaviour:** when they reply, how long they take, whether they come back.",
          "**Prior context:** pages viewed, products checked, earlier interactions.",
        ] },
        { t: "h2", text: "What lead scoring does" },
        { t: "p", text: "Lead scoring assigns points to each signal and adds them up into a number, usually from 0 to 100. That number becomes a simple decision: **who to call first**." },
        { t: "ul", items: [
          "**Hot:** contact today, ideally within minutes.",
          "**Warm:** follow up in the next few days.",
          "**Cold:** nurture with content until new signals appear.",
        ] },
        { t: "p", text: "You don't need anything complex to start. A rule-based model with five or six well-chosen signals already changes how a team works." },
        { t: "h2", text: "The real problem: the data lives apart" },
        { t: "p", text: "Information is rarely missing. What's missing is **connecting it**. The chat knows what the lead asked, the form knows which campaign they came from, and the CRM knows whether they were already a customer. Each system holds part of the story." },
        { t: "p", text: "That's why scoring is, above all, an integration problem: bringing the signals together the moment the lead arrives, and writing the score back to the CRM so the team sees it where they already work." },
        { t: "quote", text: "Beware of scoring only what's easy to measure. Opening an email doesn't mean the same as asking for a quote. Give more weight to signals that show real intent." },
        { t: "h2", text: "Checklist to get started" },
        { t: "ul", items: [
          "Which signals arrive with each lead today, and where are they stored?",
          "Which ones actually predict a sale? Ask the sales team.",
          "How many points is each worth, and what threshold separates hot from cold?",
          "Where will the team see the score? Ideally in the CRM, not another tool.",
          "How often will you check whether the model is right?",
        ] },
        { t: "p", text: "The opportunity isn't getting more leads. It's **reading the ones you already have better**." },
      ],
    },
    it: {
      title: "Non ti servono più lead: ti serve leggere meglio quelli che arrivano",
      description:
        "Ogni dato che riceve un CRM dice già qualcosa sul lead. Il lead scoring trasforma questi segnali in una priorità chiara per il team commerciale.",
      tags: ["leadscoring", "crm", "integrazioni"],
      social: {
        hook: "Non ti servono più lead. Ti serve leggere meglio quelli che arrivano.",
        highlight: "Ti serve leggere meglio quelli che arrivano.",
        points: ["Ogni dato del lead è un segnale", "Lo scoring trasforma segnali in priorità", "La chiave è collegare chat, moduli e CRM"],
      },
      body: [
        { t: "p", text: "Non tutti i lead valgono lo stesso. Eppure in molti CRM entrano tutti dalla stessa porta, con la stessa priorità e nella stessa lista." },
        { t: "p", text: "Un lead che chiede il prezzo a metà mattina, da una campagna precisa e dopo aver visitato tre pagine, non ha nulla a che vedere con chi lascia solo l'email in un modulo generico. Eppure il team commerciale li vede allo stesso modo." },
        { t: "h2", text: "Ogni dato è già un segnale" },
        { t: "p", text: "La buona notizia: le informazioni per distinguerli **esistono già**. Arrivano con ogni lead, solo che nessuno le legge:" },
        { t: "ul", items: [
          "**Origine:** la campagna, il portale o il canale di provenienza.",
          "**Intenzione:** cosa chiede (prezzo, disponibilità, informazioni generali).",
          "**Comportamento:** quando risponde, quanto ci mette, se ritorna.",
          "**Contesto precedente:** pagine viste, prodotti consultati, interazioni passate.",
        ] },
        { t: "h2", text: "Cosa fa il lead scoring" },
        { t: "p", text: "Il lead scoring assegna punti a ogni segnale e li somma in un numero, di solito da 0 a 100. Quel numero diventa una decisione semplice: **chi chiamare per primo**." },
        { t: "ul", items: [
          "**Caldo:** contattarlo oggi, idealmente in pochi minuti.",
          "**Tiepido:** follow-up nei prossimi giorni.",
          "**Freddo:** coltivarlo con contenuti finché non dà nuovi segnali.",
        ] },
        { t: "p", text: "Non serve partire con qualcosa di complesso. Un modello a regole con cinque o sei segnali ben scelti cambia già il modo di lavorare di un team." },
        { t: "h2", text: "Il vero problema: i dati sono separati" },
        { t: "p", text: "Raramente mancano le informazioni. Manca **collegarle**. La chat sa cosa ha chiesto il lead, il modulo sa da quale campagna arrivava e il CRM sa se era già cliente. Ogni sistema ha una parte della storia." },
        { t: "p", text: "Per questo lo scoring è soprattutto un problema di integrazione: riunire i segnali nel momento in cui arriva il lead e riportare il punteggio nel CRM, dove il team lavora già." },
        { t: "quote", text: "Attenzione a dare punti solo a ciò che è facile da misurare. Aprire un'email non vale quanto chiedere un preventivo. Dai più peso ai segnali che mostrano un'intenzione reale." },
        { t: "h2", text: "Checklist per iniziare" },
        { t: "ul", items: [
          "Quali segnali ricevi oggi con ogni lead e dove vengono salvati?",
          "Quali prevedono davvero una vendita? Chiedilo al team commerciale.",
          "Quanti punti vale ognuno e quale soglia separa caldo da freddo?",
          "Dove vedrà il team il punteggio? Meglio nel CRM, non in un altro strumento.",
          "Ogni quanto verificherai se il modello funziona?",
        ] },
        { t: "p", text: "L'opportunità non è ottenere più lead. È **leggere meglio quelli che arrivano**." },
      ],
    },
  },
};

export default post;

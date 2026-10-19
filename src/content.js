/* All text that appears on korolkov.pro lives here, so the copy can be
 * reviewed in one place. This is the personal site: the idea, what I am
 * doing now, the roadmap, the notes. Client work lives on premavision.net.
 * Rules it follows (session of 15 Oct 2026): no prices, no hours cap,
 * no current C-title (CTO only as a past role). Routine Run is a platform;
 * the app is its first form. Denys is Founder, never co-founder. */

export const SITE = {
  name: 'Denys Korolkov',
  place: 'Palm Coast, Florida',
  email: 'denys.korolkov@gmail.com',
  links: {
    routineRun: 'https://routinerun.com',
    beta: 'https://routinerun.com/beta',
    linkedin: 'https://linkedin.com/in/denyskorolkov/',
    github: 'https://github.com/denyskorolkov',
    x: 'https://x.com/denys_korolkov'
  }
};

export const HERO = {
  eyebrow: 'Founder of Routine Run \u00B7 Palm Coast, Florida',
  background: '/hero-bg.webp',
  status: [
    { label: 'Building Routine Run', href: '#now', kind: 'building' },
    { label: 'Looking for AI process projects', href: '#contact', kind: 'looking' },
    { label: 'App Clip pilots around Palm Coast', href: '#contact', kind: 'looking' }
  ],
  lead: 'Your head is for decisions.',
  rest: 'Not for remembering the order of steps.',
  body:
    'I am Denys. I take the part of a system that still lives in someone’s head and give it a form people and AI can work with.'
};

export const BELIEF = {
  heading: 'Why I keep building this',
  cards: [
    {
      key: 'shape',
      title: 'The part with no shape',
      body:
        'The hardest part of any system is the part that still lives in someone’s head. It is never written down, it cannot be handed on, and it breaks the week that person is away. That is the part I take on.'
    },
    {
      key: 'decisions',
      title: 'Your head is for decisions',
      body:
        'A method I carried for years before I wrote a line of code. Once a process has a form, it can be handed on: to the system for the predictable steps, to people who run it the same way every time, or back to you as a habit without the cognitive load.'
    },
    {
      key: 'everyone',
      title: 'Built for every head',
      body:
        'Accessibility and ADHD shape what I build from the first screen, not from a later pass. I design for everyone who will use it, not one imagined persona, so nobody carries the load the design left behind.'
    }
  ]
};

/* The umbrella for PROCESS and CONNECTIONS: architecture as music,
 * music as mathematics you perceive as emotion. Three movements. */
export const MUSIC = {
  heading: 'Architecture is music',
  movement: 'Rhythm',
  background: '/music-bg.webp',
  paragraphs: [
    'Good architecture works like music. Every part keeps time with the others, the loud parts and the quiet ones sit where they belong, and you feel a beat that is off before you can say why. A sense of rhythm is the key.',
    'Music is mathematics you perceive as emotion. The Pythagoreans found it on a single string: halve it and you hear an octave, 2 : 1. Take two thirds and you hear a fifth, 3 : 2. Ratios become harmony; intervals become tension and release.',
    'So I see one thing through three lenses: architecture, mathematics and music. Below, the same idea twice. Once as a process, once as maths.'
  ],
  ratios: [
    { name: 'octave', a: 2, b: 1, label: 'Octave. Rest, resolution.' },
    { name: 'fifth', a: 3, b: 2, label: 'Fifth. Strength, stability.' },
    { name: 'tritone', a: 45, b: 32, label: 'Tritone. Tension that wants to resolve.' }
  ]
};

/* Principle 15 of the Routine Run method ("The tune and the playing"),
 * extended with Denys's own view on competition and intuition. */
export const PROCESS = {
  heading: 'Checklist or flow',
  sub: 'A checklist and a flow are not the same thing.',
  contrast: [
    {
      key: 'checklist',
      label: 'Checklist',
      body: 'A list without a path. Boxes you tick in any order, and nothing moves you on to the next one.'
    },
    {
      key: 'flow',
      label: 'Flow',
      body: 'It runs, like water, through stages. Each stage hands you to the next, and you always know where you are.'
    }
  ],
  lead: 'A flow can be played two ways.',
  kinds: [
    {
      key: 'score',
      label: 'The score',
      title: 'Predefined',
      good: 'Played as written, the same every time. A pre-flight sequence, a surgical protocol, the legal deadlines of a deal. Nobody should improvise on those, and that is the virtue.',
      cost: 'It is predictable and slow to change. It cannot react to what nobody foresaw, and every change waits for someone to rewrite the score. When a competitor can adapt, a fixed plan is easy to read and easy to beat.'
    },
    {
      key: 'tune',
      label: 'The tune',
      title: 'Improvised',
      good: 'A shape everybody knows, played a little differently every time. What worked tonight can become part of the tune. Far more potential, and far more speed.',
      cost: 'It asks for understanding. You have to know the process well enough to change it in the moment and still keep it whole. This is where intuition and business sense start to matter more than the rules.'
    }
  ],
  close:
    'Most real work is both: a fixed spine where nothing may vary, and room to play around it. Routine Run is built for exactly that, which is why every run can change the routine.'
};

/* Mathematics as a hobby, and the habit of drawing connections.
 * The Structed interview model is described without figures: Structed
 * numbers are not published without Marina's approval. History parallels
 * come from the "Myths & Architecture" drafts in PV (January 2026). */
export const CONNECTIONS = {
  heading: 'Connections nobody drew',
  intro: [
    'Mathematics is my hobby. It is the same work seen through another lens: architecture, algorithms, how the parts of a thing relate.',
    'Every lens I use teaches one skill. See a connection where, at first glance, there is none.'
  ],
  lenses: [
    { key: 'math', name: 'Mathematics', body: 'Turns a fuzzy question into a quantity you can measure and a rule you can follow.' },
    { key: 'architecture', name: 'Architecture and algorithms', body: 'Shows what depends on what, and where one failure becomes many.' },
    { key: 'psychology', name: 'Psychology', body: 'Explains why a good process still gets skipped, and what makes the next step easy to start.' },
    { key: 'history', name: 'History', body: 'The production logs of humanity. The same failures, a few centuries earlier.' },
    { key: 'astrology', name: 'Astrology', body: 'A symbolic language that makes me ask questions I would not think of. Then I test the answers.' }
  ],
  math: {
    title: 'The mathematics of an interview',
    where: 'Structed AI',
    lead: 'Structed talks to your client for you and brings back a detailed brief for any marketing project, even when the client struggles to explain what they need. Under it sits the question of when to stop asking.',
    paragraphs: [
      'I treated a client interview as a finite set of things the brief still needs. Each question either lands on one of them or it does not.',
      'The chance of landing splits into three factors: did we aim at something still open, does the client know it, did the agent write it down. When results drop, they drop in exactly one of the three, and each one is fixed by different work.',
      'The real curve sits between two bounds, a planner with perfect memory and one with none. And when to stop asking falls out of a single rule instead of a guess.'
    ],
    formulas: ['h = α · β · γ', 'keep asking while h(t)\u00A0\u2265\u00A0c\u00A0/\u00A0u'],
    legend: 'α aimed at something open · β the client knows · γ it got recorded · c the cost of asking · u the value of an answer'
  },
  history: {
    title: 'History as production logs',
    image: '/history-bg.webp',
    items: [
      { then: 'Titanic', now: 'Cascading failure', body: 'Built to survive four flooded compartments. The iceberg opened five, and each one spilled into the next.' },
      { then: 'Chernobyl', now: 'Ignored alerts', body: 'The system warned first. The test went ahead anyway because it was planned for that day.' },
      { then: 'Library of Alexandria', now: 'One copy', body: 'Knowledge that lived in one place. Fires and centuries of neglect did the rest.' },
      { then: 'The Silk Road', now: 'A gateway', body: 'No trader walked all 6,500 km. Each knew one stretch and passed the goods on, like services behind an API.' },
      { then: 'Roman roads', now: 'Infrastructure first', body: 'Expensive and far from any single battle. They set the speed of everything the empire did after.' },
      { then: 'Tower of Babel', now: 'Shared language', body: 'The builders stopped understanding each other, and the building stopped. Growing teams know this one.' }
    ]
  }
};

export const NOW = {
  heading: 'What I am doing now',
  asOf: 'October 2026',
  cards: [
    {
      key: 'building',
      kind: 'Building',
      title: 'Routine Run',
      icon: '/routine-run-icon.webp',
      body:
        'The iPhone and Apple Watch app is in public beta on TestFlight. Next comes the App Store, then the browser.',
      link: { label: 'Join the beta', href: SITE.links.beta, external: true }
    },
    {
      key: 'ai-projects',
      kind: 'Looking for',
      title: 'AI process projects',
      body:
        'I have more ideas about AI processes than one product can hold. I am looking for a company where a process only works because one person remembers it, and I turn it into one that runs: clear steps, AI for the predictable parts, a person for the decisions. One project at a time.',
      link: { label: 'Tell me about yours', href: '#contact', external: false }
    },
    {
      key: 'app-clips',
      kind: 'Looking for',
      title: 'App Clip pilot partners',
      body:
        'A code or NFC tag at the door opens the steps on a visitor’s phone, with nothing to install. I am looking for places where people follow a procedure on their own: rentals, campgrounds, clinics, shelters, self-guided tours. Starting around Palm Coast.',
      link: { label: 'Be a pilot', href: '#contact', external: false }
    },
    {
      key: 'next-idea',
      kind: 'Next idea',
      title: 'Myths, stars and archetypes',
      body:
        'My next project puts astrology, history and myth in one place, together with archetypes and psychology. The same patterns repeat in a chart, in the history of an empire and in a team at work. I want to help people see the ones they live in. Still an idea, growing.',
      link: { label: 'Read the stars below', href: '#stars', external: false }
    }
  ]
};

/* The roadmap, drawn as a Routine Run run: done steps, the step in progress,
 * the steps ahead. Only milestones that are public (LinkedIn, 15 Oct 2026)
 * or announced here. No release month until it is confirmed. */
export const ROADMAP = {
  heading: 'Roadmap',
  title: 'Routine Run, run by run',
  sub: 'Drawn the way the app draws a routine: what is done, the step I am on, what comes next.',
  steps: [
    {
      state: 'done',
      when: 'August 2026',
      title: 'Routine Run founded',
      body: 'The method I carried in my head becomes an iPhone and Apple Watch app.'
    },
    {
      state: 'done',
      when: 'Beta',
      title: 'Public beta on TestFlight',
      body: 'Anyone with an iPhone can join. No account, private by default.'
    },
    {
      state: 'done',
      when: '22 September 2026',
      title: 'A page started a runbook on the Watch',
      body: 'A real PagerDuty page started an on-call runbook on the wrist, no phone or laptop in hand.'
    },
    {
      state: 'done',
      when: 'MCP',
      title: 'AI assistants work with it',
      body: 'An MCP connector in Claude’s directory and the MCP registry. Apple’s own models write a routine from one sentence.'
    },
    {
      state: 'now',
      when: 'In progress',
      title: 'On the App Store',
      body: 'Version 1.0, open to everyone on iPhone and Apple Watch.'
    },
    {
      state: 'next',
      when: 'With the release',
      title: 'App Clip pilots',
      body: 'Local businesses put a code at the door. Visitors run the steps without installing anything.'
    },
    {
      state: 'next',
      when: 'Next',
      title: 'Runs in any browser',
      body: 'The same routine opens on any device with a browser.'
    },
    {
      state: 'later',
      when: 'Later',
      title: 'iPad and Mac',
      body: 'One routine on every Apple screen you work from.'
    },
    {
      state: 'later',
      when: 'Later',
      title: 'Beyond Apple',
      body: 'The same engine on platforms Apple does not make.'
    }
  ]
};

/* A small, deliberate dose of the esoteric. Sidereal zodiac, Lahiri
 * ayanamsa, from the chart for 31 July 1980, 13:58, Kramatorsk.
 * Jupiter dates computed with Swiss Ephemeris. Kept light on purpose. */
export const STARS = {
  heading: 'Written in the stars',
  background: '/blackhole-bg.webp',
  sub: 'Sidereal chart, Lahiri. I read it the way I read logs: for patterns worth testing, not for answers.',
  cards: [
    {
      key: 'libra',
      glyph: '♎︎',
      title: 'Libra rising, in Vishakha',
      body: 'The star of purpose: one long road to one goal, with the results in the second half of life.'
    },
    {
      key: 'mercury',
      glyph: '☿︎',
      title: 'Mercury at home, 9th house',
      body: 'The soul planet sits in its own sign, in the house of knowledge. Understand something, then pass it on in words. That is what the notes are for.'
    },
    {
      key: 'saturn',
      glyph: '♄︎',
      title: 'At home in the hidden',
      body: 'Saturn, the best friend a Libra rising can have, sits with Mars in my 12th house, the house of what others cannot see. That is my element: putting structure into chaos, seeing what is not visible yet, deciding where nobody knows what the options are, and finding connections nobody suspected were there.'
    },
    {
      key: 'jupiter',
      glyph: '♃︎',
      title: 'Jupiter comes home',
      body: 'On 31 October 2026 Jupiter enters Leo, the sign it held when I was born, and reaches the exact degree in September 2027. Tradition starts a new twelve-year chapter there.'
    }
  ],
  /* Routine Run drawn as a solar system: routines are orbits, runs are
   * planets, steps sit at the classical aspect angles. */
  orrery: {
    title: 'Routines as orbits',
    paragraphs: [
      'Picture Routine Run as a solar system. Every routine is an orbit, and every run is a planet going round it.',
      'The steps sit where astrologers mark the angles: conjunction at 0°, sextile at 60°, square at 90°, trine at 120°, opposition at 180°. When a run reaches a step, the step lights up, the way a bead fills in the app. At the conjunction the lap closes and a new run begins.',
      'Some orbits are short and quick, like a morning routine. Some are long and slow, like an on-call runbook or a season at a shop. In the middle sits what is hidden, and everything turns around it.'
    ],
    legend: [
      { mark: 'orbit', text: 'a routine' },
      { mark: 'planet', text: 'a run' },
      { mark: 'step', text: 'a step at an aspect' }
    ]
  },
  eclipse: {
    glyph: '☉︎ ☊︎',
    title: 'An eclipse in the house of work',
    image: '/eclipse.webp',
    paragraphs: [
      'The Sun and Rahu meet in my 10th house, the house of work. Together they make an eclipse: Rahu is the shadow that swallows the light, and the Sun is what comes back out of it.',
      'In my work the shadow is everything still undefined: a process nobody has written down, a decision nobody has made, a link nobody has drawn. Quantum physics has a rule for this. A state stays open until it is observed, and the act of observing is what makes it definite.',
      'My job is to be that observer. Watch the process closely, write down what actually happens, and the undefined becomes defined: steps, timing, a record of every run. That is why Routine Run keeps one. What has been observed can be improved.'
    ]
  },
  clients: {
    title: 'The chart’s guess at who I work with best',
    items: [
      {
        who: 'Where nobody can see the shape yet',
        why: 'Mars, ruler of the house of clients, sits in the 12th, the house of the hidden. People come to me with what they cannot see: a process nobody wrote down, a choice with no clear options.'
      },
      {
        who: 'Work done by hand, by the book',
        why: 'Mars, ruler of the house of clients, sits in Virgo, the sign of order and procedure, in Hasta, the star of the hand. Trades, technicians, crews who follow a checklist on site.'
      },
      {
        who: 'Places that look after people',
        why: 'The 10th house of work falls in Cancer, the sign of care and shelter. Clinics, shelters, rentals and campgrounds that hand visitors a procedure.'
      },
      {
        who: 'One person at a time, not a room',
        why: 'Jupiter blesses the house of the one-to-one partner and stalls in the house of crowds. The chart agrees with my own record.'
      }
    ]
  }
};

export const PATH = {
  heading: 'How I got here',
  lead: 'Fifteen years of shipping production software before any of this.',
  tiles: [
    { key: 'groupon', name: 'Groupon', body: 'Launched the merchant booking platform from zero.' },
    { key: 'autodesk', name: 'Autodesk', body: 'Checkout and billing, a system under real load.' },
    { key: 'bigpanda', name: 'BigPanda', body: 'AI incident tooling for enterprise on-call teams.' },
    { key: 'structed', name: 'Structed', body: 'The AI interview product, built as CTO.' }
  ],
  close:
    'Combined with AI, that experience is what lets me take a product all the way to production on my own.'
};

export const CONTACT = {
  heading:
    'If something in your business still works only because one person remembers it, that is where I like to start.',
  sub: 'Tell me what it is and who carries it. I read everything myself.',
  reasons: [
    'An AI process project',
    'I lead a company (CEO, COO, CTO)',
    'An App Clip pilot for my business',
    'Routine Run: partnership',
    'Routine Run: beta, feedback, a bug',
    'Siri, App Intents, Apple Watch',
    'Podcast or interview',
    'Speaking, panel or event',
    'Press',
    'Just saying hi'
  ]
};

/* The three places the work lives. Structed is past: CTO until October 2026,
 * and it is never described in the present tense. */
export const WORKS = {
  heading: 'Where my work lives',
  items: [
    {
      key: 'routine-run',
      name: 'Routine Run',
      status: 'Founder · building it now',
      logo: '/routine-run-mark.webp',
      plain: true,
      body:
        'A process people carry in their heads becomes one that runs: described once in a sentence, walked through step by step, improved run by run. The iPhone and Apple Watch app is its first form; underneath is a platform for the systems and AI assistants a business already uses.',
      links: [
        { label: 'routinerun.com', href: SITE.links.routineRun },
        { label: 'TestFlight beta', href: SITE.links.beta }
      ]
    },
    {
      key: 'prema-vision',
      name: 'Prema Vision',
      status: 'My company for client work',
      logo: '/prema-vision-logo.webp',
      plain: true,
      body:
        'Where client work goes. Siri, the Apple Watch and on-device AI for iOS apps that already have users. Everything I sell there I have built in my own app first.',
      links: [{ label: 'premavision.net', href: 'https://premavision.net' }]
    },
    {
      key: 'structed',
      name: 'Structed AI',
      status: 'Built it as CTO · still involved',
      logo: '/structed-logo.svg',
      plain: true,
      body:
        'One AI-led interview turns what a client carries in their head into a structured set of requirements, even when they cannot quite explain what they need. I designed it with the founder and took over all engineering.',
      links: [{ label: 'structed.ai', href: 'https://structed.ai' }]
    }
  ]
};

/* Notes. Every fact here comes from the approved texts of 15 Oct 2026;
 * nothing is reconstructed from memory. Replace the bodies with the real
 * post-mortems when the details are confirmed. */
export const NOTES = [
  {
    /* Dates from the structed-app git history; numbers only the ones already
     * public in the approved LinkedIn Experience of 15 Oct 2026. */
    slug: 'structed-milestones',
    title: 'Structed, milestone by milestone',
    date: 'December 2025 to October 2026',
    body: [
      'Structed turns one AI-led client interview into a structured set of requirements. I came in as CTO at the very start and I am still involved. These are the steps it took, in the order they happened.'
    ],
    milestones: [
      { when: 'December 2025', what: 'Designed it with the founder from a blank page: the architecture and the agent concept. An outsourced team started on the base.' },
      { when: 'February 2026', what: 'Audited the base, ended the outsourcing and took over all engineering.' },
      { when: 'March 2026', what: 'Traces on every run, model routing, and prompts that domain experts can edit without a developer.' },
      { when: 'April 2026', what: 'Simulated clients: an AI persona can now run an interview end to end, so a change is tested before a real client sees it.' },
      { when: 'June 2026', what: 'The domain taxonomy moved out of code into a database with its own admin, and an MCP server opened interviews to AI assistants.' },
      { when: 'July 2026', what: 'Paid accounts through Stripe, a moderation step before a brief reaches the client, deploys without downtime, and a security pass.' },
      { when: 'August 2026', what: 'Self-serve sign-up with a trial, organizations with seats, and test personas run against the live stack and compared run against run. Selected for the Grishin Robotics accelerator, cohort 4.' },
      { when: '17 September 2026', what: 'Demo day in London. Marina pitched, and the product could show its own measurements.' },
      { when: 'October 2026', what: 'Still involved.' }
    ],
    close:
      'Along the way: 16 professions and 100+ specializations living as data rather than code, replies down from 20–60 seconds to 1–13, and 1,400+ automated tests.'
  },
  {
    /* From the structed-app git history (22 Aug to 17 Sep 2026), the
     * approved LinkedIn line about cohort 4, and the public posts by Grishin
     * Robotics and Marina Shmayger. Security fixes are described without
     * specifics on purpose. */
    slug: 'four-weeks-to-demo-day',
    title: 'Four weeks to a demo day',
    date: '17 September 2026',
    body: [
      'In late August 2026 Structed joined the Grishin Robotics accelerator, cohort 4, in London: 22 teams, 30 days, then a demo day on 17 September at 22 Bishopsgate, three minutes each on stage.',
      'Marina pitched. Her loop ran every week: pitch, get recorded, get feedback, watch it back, rebuild. Mine was the same loop for the product, as CTO: run an interview, measure it, fix what broke, run it again. Four weeks to turn Structed into something you could check rather than take on trust.',
      'Most of the work was measurement. A question in an interview either lands on something the brief still needs or it does not, so every interview got its hit-rate curve, the admin got a page to compare runs, and the question "did this change help" got answered as a probability instead of a p-value.',
      'Some of it was about not losing what the client said: a brief that quietly dropped facts the client had given, a finished answer lost to a single stray character, and an honest "I can’t answer that" that the agent never wrote down.',
      'Some of it was for the client on the other side of the screen. The interview now tells people how far through they are, and shows them what the agent already knows so they can add to it. The rest was the security review you want done before anyone else looks.',
      'Seventy changes merged between 22 August and demo day. None of them was a slide.'
    ]
  },
  {
    slug: 'pagerduty-page-to-watch',
    title: 'A PagerDuty page started a runbook on my Watch',
    date: '22 September 2026',
    body: [
      'An on-call engineer wakes up to a page and then goes looking for the runbook. The runbook is the part that lives in someone’s head, or in a wiki nobody opens at 3am.',
      'In Routine Run the page itself starts the process. Every connection gets its own webhook URL and an HTTPS API; PagerDuty is built in, so it needs no glue code. The incoming event starts the routine and the step arrives as a push through APNs.',
      'On 22 September 2026 a PagerDuty page started an on-call runbook on the Apple Watch. No phone in hand, no laptop open: the first step was on the wrist.'
    ]
  },
  {
    slug: 'app-intents-one-surface',
    title: 'Sixty App Intents, one definition',
    date: 'September 2026',
    body: [
      'Siri, Shortcuts, Spotlight, widgets, the Action button and Control Center all read the same App Intents. Build them once and six surfaces light up; skip them and none of your app’s actions exist outside the app.',
      'Routine Run has 60+ App Intents. Siri, the Action button and Control Center can start, advance or finish any process, and a step can call out to Shortcuts, Home and Health in the other direction.',
      'That is why this is one piece of work rather than six integrations.'
    ]
  },
  {
    slug: 'on-device-model-writes-a-routine',
    title: 'Apple’s on-device model writes a routine from one sentence',
    date: 'September 2026',
    body: [
      'Writing a routine by hand is the reason most people never write one. So the first screen takes a sentence instead.',
      'Apple’s models turn that sentence into steps, running on the device and on Private Cloud Compute. Nothing goes to a third-party API and there is no account to create.',
      'The same engine then runs it, whether that is an on-call runbook, a shop’s opening checklist or a morning routine.'
    ]
  }
];

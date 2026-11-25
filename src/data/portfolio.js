/**
 * Central portfolio content file.
 * Edit text, projects, skills, certifications, and links here without touching components.
 *
 * Clearly marked TODOs indicate optional assets or details you can add later
 * (screenshots, live demo URLs, certification dates/links, and resume PDF).
 */

export const siteData = {
  brand: {
    name: 'Matthew Martus',
    mark: 'Matthew Martus.',
    fullName: 'Matthew Rimar Martus',
    location: 'Cebu City, Philippines',
    university: 'Cebu Institute of Technology – University',
    program: 'Fourth-year BS Information Technology',
  },

  navLinks: [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'certifications', label: 'Certifications', href: '#certifications' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],

  hero: {
    availability: 'Open to internships & web collaborations',
    heading: 'Matthew Martus.',
    subtitle:
      'Fourth-year BS Information Technology student at Cebu Institute of Technology – University. I build web apps and Discord bots, and I am open to UI/UX Design, Project Management, or Software Developer internships.',
    tagline: 'I have no special talents. I am only passionately curious.',
    taglineSource: 'GitHub bio',
    primaryCta: {
      label: 'View projects',
      href: '#projects',
    },
    secondaryCta: {
      label: 'Get in touch',
      href: '#contact',
    },
    // TODO: Add your resume PDF in public/ (e.g. '/Matthew_Martus_Resume.pdf') to surface a resume link
    resumeUrl: null,
  },

  about: {
    eyebrow: 'About',
    heading: 'Building software, coordinating teams, and staying curious.',
    paragraphs: [
      'I am a fourth-year BS Information Technology student at Cebu Institute of Technology – University in Cebu City, Philippines. Across academic and personal builds, I work on web applications and Discord bots while strengthening my React fundamentals.',
      'My interests span web development, software development, project management, and game development. Outside coursework, I run Minecraft servers and enjoy tinkering with developer tooling.',
    ],
    focusItems: [
      {
        label: 'Open to internships',
        value: 'UI/UX Design, Project Management, Software Developer',
      },
      {
        label: 'Open to collaborating',
        value: 'Web projects and student or community builds',
      },
      {
        label: 'Currently strengthening',
        value: 'React',
      },
      {
        label: 'Based in',
        value: 'Cebu City, Philippines',
      },
    ],
  },

  projects: [
    {
      id: 'mentalease',
      title: 'MentalEase',
      role: 'Scrum Master',
      roleNote: 'Sprint planning, Agile, task coordination',
      description:
        'Student mental health web app with mood tracking, journaling, anonymous community posts, and wellness resources.',
      stack: ['Django', 'Supabase'],
      repos: [
        {
          label: 'GitHub',
          url: 'https://github.com/Arvs013/CSIT327-G2-MentalEase',
        },
      ],
      // TODO: Add screenshot in public/images/projects/mentalease.png and set path below
      screenshot: null,
      screenshotAlt: 'MentalEase web application screenshot',
      screenshotSlotHint: 'public/images/projects/mentalease.png',
      // TODO: Add live demo URL(s) if deployed
      liveLinks: [],
    },
    {
      id: 'japlearn-2',
      title: 'Japlearn 2.0',
      role: 'Project Manager',
      roleNote: 'SRS/SDD documentation, background study',
      description: 'Gamified Japanese language learning platform.',
      // TODO: Add technologies used in Japlearn 2.0 if you want chips shown here
      stack: ['SRS / SDD', 'Project Management'],
      // TODO: Add GitHub repository URL if public
      repos: [],
      screenshot: '/images/projects/japlearn.png',
      screenshotAlt: 'Japlearn 2.0 platform screenshot',
      liveLinks: [
        {
          label: 'Student Portal',
          url: 'https://www.japlearn.com/',
        },
        {
          label: 'Teacher Portal',
          url: 'https://portal.japlearn.com/',
        },
      ],
    },
    {
      id: 'klase',
      title: 'Klase',
      // TODO: Replace with your specific role title if desired (e.g. 'UI/UX Designer & Developer')
      role: 'Team Project',
      roleNote: 'Requirements, ERD, Gantt chart, Figma UI/UX design',
      description:
        'Learning management system with course management, enrollment, assignment submission, and discussion forums.',
      stack: ['Django', 'Python', 'Figma'],
      repos: [
        {
          label: 'GitHub',
          url: 'https://github.com/Mr-cmd-pip/information-management-2-project-management',
        },
      ],
      // TODO: Add screenshot in public/images/projects/klase.png and set path below
      screenshot: null,
      screenshotAlt: 'Klase learning management system screenshot',
      screenshotSlotHint: 'public/images/projects/klase.png',
      // TODO: Add Figma prototype or live URL if available
      liveLinks: [],
    },
    {
      id: 'mangadex-reader',
      title: 'mangadex-reader',
      // TODO: Confirm or adjust role label if needed
      role: 'Developer',
      roleNote: 'Home, series, and chapter-reader pages',
      description:
        'Responsive manga, manhua, and manhwa reader on the MangaDex API with home, series, and chapter-reader pages.',
      stack: ['Next.js 15', 'React 19', 'Tailwind CSS 4', 'Vitest'],
      repos: [
        {
          label: 'GitHub',
          url: 'https://github.com/Mr-cmd-pip/mangadex-reader',
        },
      ],
      screenshot: '/images/projects/mangadex-reader.png',
      screenshotAlt: 'mangadex-reader application screenshot',
      // TODO: Add live demo URL if deployed
      liveLinks: [],
    },
    {
      id: 'digihealth',
      title: 'DigiHealth',
      // TODO: Replace with your specific role title if desired
      role: 'Team Project',
      roleNote: 'Patient Android app & staff web dashboard',
      description:
        'Clinic appointment system where patients book through an Android app and staff manage records on a web dashboard.',
      stack: ['Spring Boot', 'React', 'Kotlin', 'MySQL'],
      repos: [
        {
          label: 'GitHub',
          url: 'https://github.com/Mr-cmd-pip/DigiHealth-IT342-GO2-Group3',
        },
      ],
      // TODO: Add screenshot in public/images/projects/digihealth.png and set path below
      screenshot: null,
      screenshotAlt: 'DigiHealth clinic appointment system screenshot',
      screenshotSlotHint: 'public/images/projects/digihealth.png',
      // TODO: Add live demo URL if deployed
      liveLinks: [],
    },
    {
      id: 'discord-bots',
      title: 'Discord Bots',
      // TODO: Confirm or adjust role label if needed
      role: 'Developer',
      roleNote: 'Modular utility bot & AFK voice bot',
      description:
        'A modular bot (music, moderation, welcome, general commands) and an AFK voice bot with independent connections per server.',
      stack: ['Python', 'discord.py', 'Docker', 'Railway', 'Node.js', 'discord.js'],
      repos: [
        {
          label: 'discord-bot',
          url: 'https://github.com/Mr-cmd-pip/discord-bot',
        },
        {
          label: 'afk-bot',
          url: 'https://github.com/Mr-cmd-pip/afk-bot',
        },
      ],
      // TODO: Add screenshot in public/images/projects/discord-bots.png and set path below
      screenshot: null,
      screenshotAlt: 'Discord Bots showcase screenshot',
      screenshotSlotHint: 'public/images/projects/discord-bots.png',
      liveLinks: [],
    },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['JavaScript', 'Python', 'Java', 'PHP', 'C', 'C++', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frameworks',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Django', 'Spring Boot'],
    },
    {
      category: 'Data & Tools',
      items: [
        'MySQL',
        'PostgreSQL',
        'Supabase',
        'Docker',
        'Git',
        'GitHub',
        'Figma',
        'REST APIs',
        'Postman',
        'VS Code',
      ],
    },
    {
      category: 'Practices',
      items: ['Agile', 'Scrum'],
    },
  ],

  certifications: [
    {
      title: 'C Language',
      issuer: 'CodeChum',
      // TODO: Add completion date (e.g. '2024') if you want it displayed
      issuedDate: null,
      credentialUrl:
        'https://drive.google.com/file/d/1XnJaxuBZxpDH4wBEPZwq_7Cz0-KolWR-/view?usp=sharing',
    },
    {
      title: 'AWS Academy: Cloud Foundations',
      issuer: 'AWS Academy',
      // TODO: Add completion date if desired
      issuedDate: null,
      credentialUrl:
        'https://www.credly.com/badges/d226a37d-824e-4da5-806d-374ac1359b23/public_url',
    },
    {
      title: 'AWS Academy: Cloud Architecting',
      issuer: 'AWS Academy',
      // TODO: Add completion date if desired
      issuedDate: null,
      credentialUrl:
        'https://www.credly.com/badges/bb62bfee-a774-4d82-8bb0-a34bfc7ba101/public_url',
    },
    {
      title: 'IBM SkillsBuild: Artificial Intelligence Fundamentals',
      issuer: 'IBM SkillsBuild',
      // TODO: Add completion date if desired
      issuedDate: null,
      credentialUrl:
        'https://www.credly.com/badges/ce69b835-dbe0-4724-852f-4b79fa6b0268/public_url',
    },
    {
      title: 'IBM SkillsBuild: Cybersecurity Fundamentals',
      issuer: 'IBM SkillsBuild',
      // TODO: Add completion date if desired
      issuedDate: null,
      credentialUrl:
        'https://www.credly.com/badges/ab38ba39-53f3-4472-b031-18eb32a74a91/public_url',
    },
  ],

  contact: {
    eyebrow: 'Contact',
    heading: "Let's build something thoughtful.",
    description:
      'Open to UI/UX Design, Project Management, or Software Developer internships, and happy to collaborate on web projects.',
    email: 'matthewrimar1102@gmail.com',
    socials: [
      {
        name: 'GitHub',
        handle: 'Mr-cmd-pip',
        url: 'https://github.com/Mr-cmd-pip',
      },
      {
        name: 'LinkedIn',
        handle: 'matthew-rimar-martus-m0203',
        url: 'https://www.linkedin.com/in/matthew-rimar-martus-m0203/',
      },
      {
        name: 'Instagram',
        handle: '_mateohere',
        url: 'https://www.instagram.com/_mateohere/',
      },
    ],
  },
};

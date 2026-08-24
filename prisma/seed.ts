import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skillGroups = [
  {
    category: 'Frontend',
    items: [
      'HTML5',
      'CSS3',
      'SCSS',
      'JavaScript',
      'TypeScript',
      'React.js',
      'AJAX',
      'Vite',
      'Responsive Design',
      'Cross-browser Compatibility',
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      'PHP',
      'Laravel',
      'Node.js',
      'NestJS',
      'REST API',
      'GraphQL',
      'Email Integrations',
    ],
  },
  {
    category: 'Databases & Data',
    items: [
      'MySQL',
      'PostgreSQL',
      'CockroachDB',
      'SQL',
      'Prisma ORM',
      'phpMyAdmin',
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    items: ['Git', 'GitHub', 'Docker', 'Nginx', 'CI/CD Fundamentals'],
  },
  {
    category: 'CMS & E-commerce',
    items: ['OpenCart', 'Journal 3', 'Strapi CMS'],
  },
  {
    category: 'Tools & Systems',
    items: [
      'Linux (Ubuntu)',
      'Windows',
      'VS Code',
      'PhpStorm',
      'WebStorm',
      'Claude Code',
      'ChatGPT',
    ],
  },
  {
    category: 'Other Development',
    items: [
      'C',
      'C++',
      'C#',
      'Java',
      'Python',
      'Flutter (basic)',
      'Phaser 3',
    ],
  },
];

async function main(): Promise<void> {
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: 'Danil Belov',
      role: 'Backend & Full-Stack Developer',
      location: 'Riga, Latvia · Remote',
      summary:
        'I build maintainable web applications and APIs with TypeScript, Node.js and modern backend tooling. I care about clear architecture, predictable delivery and code that a team can confidently change.',
      skills: {
        create: skillGroups.flatMap((group, groupPosition) =>
          group.items.map((name, position) => ({
            name,
            category: group.category,
            groupPosition,
            position,
          })),
        ),
      },
      contacts: {
        create: [
          {
            label: 'GitHub',
            value: 'github.com/dn118',
            url: 'https://github.com/dn118',
            position: 0,
          },
          {
            label: 'Email',
            value: 'belovdn118@gmail.com',
            url: 'mailto:belovdn118@gmail.com',
            position: 1,
          },
          {
            label: 'LinkedIn',
            value: 'linkedin.com/in/danilbelov',
            url: 'https://linkedin.com/in/danilbelov',
            position: 2,
          },
        ],
      },
      experience: {
        create: [
          {
            role: 'Web Developer',
            company: 'bm.lv',
            period: 'Oct 2024 — Jan 2025',
            description:
              'Improved the UI/UX and functionality of a large e-commerce website. Worked with backend logic and delivery-address data, improved the address selection interface, and resolved performance and usability issues.',
            technologies: ['PHP', 'MySQL', 'phpMyAdmin', 'JavaScript'],
            position: 0,
          },
          {
            role: 'Freelance Full-Stack Developer',
            company: 'Independent',
            period: '2023 — 2024',
            description:
              'Developed websites and custom solutions for small businesses, including QR-based restaurant menus, landing pages, contact forms and email integrations. Worked directly with clients from requirements gathering through deployment.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL'],
            position: 1,
          },
          {
            role: 'Freelance Front-End Developer',
            company: 'Independent',
            period: '2022 — 2023',
            description:
              'Built responsive landing pages and business websites from client requirements. Optimized interfaces for desktop and mobile devices and improved UI/UX and cross-browser compatibility.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
            position: 2,
          },
          {
            role: 'Administrator',
            company: 'Orizonte SIA',
            period: '2019 — 2020',
            location: 'Riga, Latvia',
            description:
              'Managed daily operations and coordinated staff, supported customers, resolved operational issues, and handled equipment and workplace organization. Developed leadership, communication and problem-solving skills.',
            technologies: ['Team coordination', 'Customer support', 'Operations'],
            position: 3,
          },
        ],
      },
      projects: {
        create: [
          {
            title: 'Orbital Slots',
            description:
              'A browser-based slot game with multiple bonus mechanics, simulation-backed game math and an AI helper.',
            technologies: ['React', 'TypeScript', 'Phaser 3', 'Node.js'],
            url: 'https://github.com/dn118',
            position: 0,
          },
          {
            title: 'Cross-posting Platform',
            description:
              'A full-stack application for preparing and publishing content across multiple channels.',
            technologies: ['React', 'Node.js', 'REST API'],
            url: 'https://github.com/dn118',
            position: 1,
          },
          {
            title: 'Digital Business Card',
            description:
              'This backend-first portfolio: a typed GraphQL API, CockroachDB persistence and a Dockerized local environment.',
            technologies: ['NestJS', 'GraphQL', 'Prisma', 'CockroachDB'],
            url: 'https://github.com/dn118',
            position: 2,
          },
        ],
      },
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

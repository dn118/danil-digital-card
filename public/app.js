const PROFILE_QUERY = `
  query DigitalCard {
    profile {
      name
      role
      location
      summary
      skills
      skillGroups { title items }
      contacts { label value url }
      experience { id role company period location description technologies }
      projects { id title description technologies url }
    }
  }
`;

const PREVIEW_PROFILE = {
  name: 'Danil Belov',
  role: 'Backend & Full-Stack Developer',
  location: 'Riga, Latvia · Remote',
  summary:
    'I build maintainable web applications and APIs with TypeScript, Node.js and modern backend tooling. I care about clear architecture, predictable delivery and code that a team can confidently change.',
  skills: [
    'TypeScript',
    'Node.js',
    'NestJS',
    'GraphQL',
    'Prisma',
    'React',
    'PostgreSQL',
    'Docker',
    'Git',
  ],
  skillGroups: [
    {
      title: 'Frontend',
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
      title: 'Backend & APIs',
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
      title: 'Databases & Data',
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
      title: 'DevOps & Infrastructure',
      items: ['Git', 'GitHub', 'Docker', 'Nginx', 'CI/CD Fundamentals'],
    },
    {
      title: 'CMS & E-commerce',
      items: ['OpenCart', 'Journal 3', 'Strapi CMS'],
    },
    {
      title: 'Tools & Systems',
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
      title: 'Other Development',
      items: ['C', 'C++', 'C#', 'Java', 'Python', 'Flutter (basic)', 'Phaser 3'],
    },
  ],
  contacts: [
    {
      label: 'GitHub',
      value: 'github.com/dn118',
      url: 'https://github.com/dn118',
    },
    {
      label: 'Email',
      value: 'belovdn118@gmail.com',
      url: 'mailto:belovdn118@gmail.com',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/danilbelov',
      url: 'https://linkedin.com/in/danilbelov',
    },
  ],
  experience: [
    {
      id: 1,
      role: 'Web Developer',
      company: 'bm.lv',
      period: 'Oct 2024 — Jan 2025',
      location: null,
      description:
        'Improved the UI/UX and functionality of a large e-commerce website. Worked with backend logic and delivery-address data, improved the address selection interface, and resolved performance and usability issues.',
      technologies: ['PHP', 'MySQL', 'phpMyAdmin', 'JavaScript'],
    },
    {
      id: 2,
      role: 'Freelance Full-Stack Developer',
      company: 'Independent',
      period: '2023 — 2024',
      location: null,
      description:
        'Developed websites and custom solutions for small businesses, including QR-based restaurant menus, landing pages, contact forms and email integrations. Worked directly with clients from requirements gathering through deployment.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL'],
    },
    {
      id: 3,
      role: 'Freelance Front-End Developer',
      company: 'Independent',
      period: '2022 — 2023',
      location: null,
      description:
        'Built responsive landing pages and business websites from client requirements. Optimized interfaces for desktop and mobile devices and improved UI/UX and cross-browser compatibility.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
      id: 4,
      role: 'Administrator',
      company: 'Orizonte SIA',
      period: '2019 — 2020',
      location: 'Riga, Latvia',
      description:
        'Managed daily operations and coordinated staff, supported customers, resolved operational issues, and handled equipment and workplace organization. Developed leadership, communication and problem-solving skills.',
      technologies: ['Team coordination', 'Customer support', 'Operations'],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Orbital Slots',
      description:
        'A browser-based slot game with bonus mechanics, simulation-backed game math and an AI helper.',
      technologies: ['React', 'TypeScript', 'Phaser 3', 'Node.js'],
      url: 'https://github.com/dn118/slots_game',
    },
    {
      id: 2,
      title: 'Virtual Menu System',
      description:
        'A QR-based restaurant menu platform designed for simple browsing and practical content management.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      url: 'https://github.com/dn118/Riverside_menu',
    },
    {
      id: 3,
      title: 'Digital Business Card',
      description:
        'This backend-first portfolio: a typed GraphQL API, CockroachDB persistence and a Dockerized local environment.',
      technologies: ['NestJS', 'GraphQL', 'Prisma', 'CockroachDB'],
      url: 'https://github.com/dn118/danil-digital-card',
    },
  ],
};

function escapeHtml(value) {
  const element = document.createElement('span');
  element.textContent = value;
  return element.innerHTML;
}

function renderProfile(profile) {
  document.querySelectorAll('[data-profile]').forEach((element) => {
    const field = element.dataset.profile;
    if (profile[field]) element.textContent = profile[field];
  });

  document.querySelector('#skills').innerHTML = profile.skillGroups
    .map(
      (group, index) => `
        <article class="skill-card">
          <div class="skill-card-header">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <h3>${escapeHtml(group.title)}</h3>
          </div>
          <div class="skill-items">
            ${group.items.map((skill) => `<span>${escapeHtml(skill)}</span>`).join('')}
          </div>
        </article>`,
    )
    .join('');

  document.querySelector('#experience').innerHTML = profile.experience
    .map(
      (item) => `
        <article class="experience-item">
          <div class="experience-period">${escapeHtml(item.period)}</div>
          <div class="experience-marker" aria-hidden="true"></div>
          <div class="experience-content">
            <div class="experience-title">
              <h3>${escapeHtml(item.role)}</h3>
              <span>${escapeHtml(item.company)}${item.location ? ` · ${escapeHtml(item.location)}` : ''}</span>
            </div>
            <p>${escapeHtml(item.description)}</p>
            <div class="project-tags">
              ${item.technologies.map((technology) => `<span>${escapeHtml(technology)}</span>`).join('')}
            </div>
          </div>
        </article>`,
    )
    .join('');

  document.querySelector('#projects').innerHTML = profile.projects
    .map(
      (project, index) => `
        <article class="project-card">
          <div class="project-number">${String(index + 1).padStart(2, '0')}</div>
          <div class="project-content">
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
            <div class="project-tags">
              ${project.technologies.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
            </div>
          </div>
          ${project.url ? `<a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(project.title)}">↗</a>` : ''}
        </article>`,
    )
    .join('');

  document.querySelector('#contacts').innerHTML = profile.contacts
    .map(
      (contact) =>
        `<a class="button light" href="${escapeHtml(contact.url)}">${escapeHtml(contact.label)} <span>↗</span></a>`,
    )
    .join('');
}

async function loadProfile() {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: PROFILE_QUERY }),
  });

  if (!response.ok) throw new Error(`GraphQL request failed: ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length || !payload.data?.profile) {
    throw new Error(payload.errors?.[0]?.message ?? 'Profile was not returned');
  }
  renderProfile(payload.data.profile);
}

document.querySelector('#year').textContent = new Date().getFullYear();
loadProfile().catch((error) => {
  console.error(error);
  renderProfile(PREVIEW_PROFILE);
});

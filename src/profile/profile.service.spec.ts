import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  const findFirst = jest.fn();
  const prisma = { profile: { findFirst } } as unknown as PrismaService;
  const service = new ProfileService(prisma);

  beforeEach(() => findFirst.mockReset());

  it('maps the database record to the public GraphQL shape', async () => {
    findFirst.mockResolvedValue({
      id: 1,
      name: 'Danil Belov',
      role: 'Backend Developer',
      location: 'Remote',
      summary: 'Typed APIs and maintainable systems.',
      skills: [
        {
          name: 'TypeScript',
          category: 'Frontend',
          groupPosition: 0,
          position: 0,
        },
        {
          name: 'React.js',
          category: 'Frontend',
          groupPosition: 0,
          position: 1,
        },
        {
          name: 'Node.js',
          category: 'Backend & APIs',
          groupPosition: 1,
          position: 0,
        },
      ],
      contacts: [
        {
          label: 'GitHub',
          value: 'github.com/dn118',
          url: 'https://github.com/dn118',
        },
      ],
      experience: [
        {
          id: 4,
          role: 'Web Developer',
          company: 'bm.lv',
          period: 'Oct 2024 — Jan 2025',
          location: null,
          description: 'Improved an e-commerce website.',
          technologies: ['PHP', 'MySQL'],
        },
      ],
      projects: [
        {
          id: 7,
          title: 'Digital Card',
          description: 'A portfolio API.',
          technologies: ['NestJS'],
          url: null,
        },
      ],
    });

    await expect(service.getPublicProfile()).resolves.toEqual({
      id: 1,
      name: 'Danil Belov',
      role: 'Backend Developer',
      location: 'Remote',
      summary: 'Typed APIs and maintainable systems.',
      skills: ['TypeScript', 'React.js', 'Node.js'],
      skillGroups: [
        { title: 'Frontend', items: ['TypeScript', 'React.js'] },
        { title: 'Backend & APIs', items: ['Node.js'] },
      ],
      contacts: [
        {
          label: 'GitHub',
          value: 'github.com/dn118',
          url: 'https://github.com/dn118',
        },
      ],
      experience: [
        {
          id: 4,
          role: 'Web Developer',
          company: 'bm.lv',
          period: 'Oct 2024 — Jan 2025',
          location: null,
          description: 'Improved an e-commerce website.',
          technologies: ['PHP', 'MySQL'],
        },
      ],
      projects: [
        {
          id: 7,
          title: 'Digital Card',
          description: 'A portfolio API.',
          technologies: ['NestJS'],
          url: null,
        },
      ],
    });
  });

  it('throws a clear error when the profile is missing', async () => {
    findFirst.mockResolvedValue(null);
    await expect(service.getPublicProfile()).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});

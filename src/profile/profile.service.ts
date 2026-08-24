import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicProfile(): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      include: {
        contacts: { orderBy: { position: 'asc' } },
        experience: { orderBy: { position: 'asc' } },
        projects: { orderBy: { position: 'asc' } },
        skills: {
          orderBy: [{ groupPosition: 'asc' }, { position: 'asc' }],
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Public profile has not been configured');
    }

    return {
      id: profile.id,
      name: profile.name,
      role: profile.role,
      location: profile.location,
      summary: profile.summary,
      skills: profile.skills.map((skill) => skill.name),
      skillGroups: Array.from(
        profile.skills.reduce((groups, skill) => {
          const items = groups.get(skill.category) ?? [];
          items.push(skill.name);
          groups.set(skill.category, items);
          return groups;
        }, new Map<string, string[]>()),
        ([title, items]) => ({ title, items }),
      ),
      contacts: profile.contacts.map(({ label, value, url }) => ({
        label,
        value,
        url,
      })),
      experience: profile.experience.map((item) => ({
        id: item.id,
        role: item.role,
        company: item.company,
        period: item.period,
        location: item.location,
        description: item.description,
        technologies: item.technologies,
      })),
      projects: profile.projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        url: project.url,
      })),
    };
  }
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Contact } from './contact.model';
import { Experience } from './experience.model';
import { Project } from './project.model';
import { SkillGroup } from './skill-group.model';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  role!: string;

  @Field()
  location!: string;

  @Field()
  summary!: string;

  @Field(() => [String])
  skills!: string[];

  @Field(() => [SkillGroup])
  skillGroups!: SkillGroup[];

  @Field(() => [Contact])
  contacts!: Contact[];

  @Field(() => [Experience])
  experience!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}

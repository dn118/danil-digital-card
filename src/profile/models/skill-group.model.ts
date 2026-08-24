import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillGroup {
  @Field()
  title!: string;

  @Field(() => [String])
  items!: string[];
}

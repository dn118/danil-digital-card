import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => [String])
  technologies!: string[];

  @Field({ nullable: true })
  url?: string | null;
}

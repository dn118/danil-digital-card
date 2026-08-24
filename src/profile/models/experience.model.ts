import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => Int)
  id!: number;

  @Field()
  role!: string;

  @Field()
  company!: string;

  @Field()
  period!: string;

  @Field({ nullable: true })
  location?: string | null;

  @Field()
  description!: string;

  @Field(() => [String])
  technologies!: string[];
}

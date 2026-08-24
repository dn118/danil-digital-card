import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field()
  label!: string;

  @Field()
  value!: string;

  @Field()
  url!: string;
}

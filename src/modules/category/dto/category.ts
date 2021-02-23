import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export default class Category {

  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string
}
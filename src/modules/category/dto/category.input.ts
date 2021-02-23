import { ObjectType, Field, InputType } from '@nestjs/graphql'

@InputType()
export default class CategoryInput {

  @Field({ nullable: false })
  name: string

  @Field({ nullable: false })
  slug: string
}
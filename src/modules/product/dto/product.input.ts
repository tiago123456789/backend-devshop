import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class ProductInput {
  @Field({ nullable: true })
  id: number

  @Field({ nullable: false })
  name: string

  @Field({ nullable: false })
  description: string

  @Field({ nullable: false })
  slug: string

  @Field({ nullable: false })
  price: number

  @Field({ nullable: false })
  categoryId: string

  @Field({ nullable: false })
  categoryName: string
}
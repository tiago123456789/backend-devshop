import { ObjectType, Field } from '@nestjs/graphql'
import Category from 'src/modules/category/dto/category'

@ObjectType()
export default class Product {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string


  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  category: Category

  @Field({ nullable: true })
  price: number
}
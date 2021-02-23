import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export default class ProductId {
  
  @Field({ nullable: false })
  id: string

}
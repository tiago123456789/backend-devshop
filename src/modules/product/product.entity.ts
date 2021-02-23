
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import Category from '../category/category.entity';

@Entity()
export class Product {
    
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: Number;

  @Column()
  slug: string;

  @Column(type => Category)
  category: Category;


}
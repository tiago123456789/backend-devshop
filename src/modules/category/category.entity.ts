
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class Category {
    
  @ObjectIdColumn()
  _id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;
}
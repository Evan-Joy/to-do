import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({nullable: false})
  name: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  //===== foreign key
  @OneToMany(type => Post, post => post.cate)
  posts: Post[];
}
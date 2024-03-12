import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo{

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  task: string;

  @Column({default:false})
  isDone: boolean;

   @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;


}
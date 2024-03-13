import { Injectable } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { Connection, Repository } from 'typeorm';
import { Todo } from 'src/entities/to-do.entity';
import { TaskRes } from 'src/common/Classess';
import { PublicModules } from 'src/common/PublicModules';
import { TodoFilter } from './dto/to-do-filter.dto';

@Injectable()
export class ToDoService {
  // Declare a private variable to hold the repository for Todo entities
  private todoRepo: Repository<Todo>=null;
  // Define the constructor for the class
  constructor(
    private readonly connnection:Connection,
  ){
    // Initialize the todoRepo variable with the Todo repository from the database connection
    this.todoRepo = this.connnection.getRepository(Todo);
  }
  
  async create(dto:CreateToDoDto) {
    //generate variable to hold response
    let task:TaskRes;

    //generate a record.
    const record = this.todoRepo.create();
    // set task of record equal task of dto from front end
    record.task= dto.task;
    // save 
    const result = await this.todoRepo.save(record);
    // make notification res
    task= PublicModules.fun_makeResCreateSucc(result);

    return task;
  }

  async findAll(query: TodoFilter) {
    //generate variable to hold res
    let task:TaskRes = null;

    //declare a boolean isDone variable 
    const isDone = String(query.isDone) === "true" ? true :false;

    //make list what found 
    const list = await this.todoRepo.find({
      where:{
        isDone: isDone,
      },
      order:{
        createAt:'DESC'
      }
    });

    //make res notification
    task = PublicModules.fun_makeResListSucc(list);

    //return res
    return task;
  }

  async findOne(id: number) {
    //generate variable to hold res 
    let task:TaskRes = null;

    //make res item which  find by id 
    const find = await this.todoRepo.findOne(id);
    // if not found 
    if(!find){
      task = PublicModules.fun_makeResError(null,"khong tim thay id");
      return task;
    }
    // if found 
    // make res notification
    task = PublicModules.fun_makeResFoundSucc(find);

    return task;
  }

  async update(id: number, query: TodoFilter) {
    //generate variable to hold res 
    let task:TaskRes = null;

    //declare a boolean isDone variable
    const isDone = String(query.isDone) === "true"? true : false;

    //make item by id 
    const find = this.todoRepo.findOne(id);

    //if not found 
    if(!find){
      task = PublicModules.fun_makeResNotFound("id not found");
      return task;
    }
    //if found 
    //make record which set value for
    const record = await this.todoRepo
    .createQueryBuilder()
    .update(Todo)
    .set({
      isDone: isDone,
      // task: query.todo,
      
    })
    .where("id = :id",{id: id})
    .execute()
    
    // creating successful update response and returning it.
    task= PublicModules.fun_makeResUpdateSucc(record);

    return task;
  }

  async remove(id: number) {
    // generate variable to hold res 
    let task:TaskRes = null;

    //make variable to hold item find by id 
    const find = await this.todoRepo.findOne({
      where:{id: id}
    });
    //if not found return notification
    if(!find){
      task = PublicModules.fun_makeResError(null,"Khong tim thay id can xoa");
      return task;
    }
    
    //if found  make variable to hold 
    const result = this.todoRepo.remove(find);
    //remove 
    task = PublicModules.fun_makeResDeleteSucc(result);
    //return nofification.
    return task;
  }
}


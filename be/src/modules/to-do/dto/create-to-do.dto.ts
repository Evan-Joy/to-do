import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateToDoDto {

  @ApiProperty()
  @IsNotEmpty()
  task: string;
}

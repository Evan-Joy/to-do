import { ApiPropertyOptional } from "@nestjs/swagger";


export class TodoFilter{
  @ApiPropertyOptional({default:false})
  isDone: boolean;

  @ApiPropertyOptional()
  todo: string;
}
import { PartialType } from "@nestjs/mapped-types";
import { IsIn, IsOptional } from "class-validator";
import { CLASS_STATUSES, type ClassStatus } from "../class-rules.js";
import { CreateClassDto } from "./create-class.dto.js";

// courseId is fixed once a class exists: moving a class to another course would rewrite history.
export class UpdateClassDto extends PartialType(CreateClassDto) {
  @IsOptional()
  @IsIn(CLASS_STATUSES)
  status?: ClassStatus;
}

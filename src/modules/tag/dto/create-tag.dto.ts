import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export default class CreateTagDTO {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(45)
    description:string;
}
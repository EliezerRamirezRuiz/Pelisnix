import { OmitType, PartialType } from "@nestjs/mapped-types";
import CreateUserDto from "./create-user.dto";


export default class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['hash', 'hashedRt'] as const)) { }
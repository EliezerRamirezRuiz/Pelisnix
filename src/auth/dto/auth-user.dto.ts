import { PickType } from "@nestjs/mapped-types";
import CreateUserDto from "./create-user.dto";

export default class AuthUserDto extends PickType(
    CreateUserDto, ['email', 'password'] as const
) { }
import { DeleteUserDto } from "../dto/delete-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export type MessageSucces = {
    message: string;
    code: number;
    data: UpdateUserDto | DeleteUserDto
}
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetRolUser = createParamDecorator(
    (data: undefined, context: ExecutionContext): boolean => {
        const request = context.switchToHttp().getRequest();
        return request.user['admin'];
    },
);
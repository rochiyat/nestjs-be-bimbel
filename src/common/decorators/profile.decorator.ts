// profile.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Profile = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.profile;
  },
);
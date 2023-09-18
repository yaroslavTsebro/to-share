import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../model';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

function getCurrentUserByContext(context: ExecutionContext): User {
  return context.switchToHttp().getRequest().user;
}

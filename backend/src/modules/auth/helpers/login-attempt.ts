import { ForbiddenException } from '@nestjs/common';
import { ServerErrors } from 'src/shared/serverErrors';
import { NOWRequest } from 'src/shared/controller-helpers';

export function loginAttemptsCheck<
  T extends Pick<NOWRequest['user'],
    | 'loginAttempts'
  >
>(user: T) {
  if (Number(user.loginAttempts) >= 5) {
    throw new ForbiddenException(ServerErrors.LOGIN_EXCEED);
  }
}

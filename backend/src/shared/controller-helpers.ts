import { Request } from 'express';
import { ValidatedUser } from 'src/modules/auth/jwt.strategy';

export type NOWRequest = Request & {
  user: ValidatedUser
};

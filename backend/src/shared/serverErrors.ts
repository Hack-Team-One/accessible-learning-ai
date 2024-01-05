export const ServerError = {
  Generic: 'Something went wrong',
  RefreshTokenNotFound: 'Refresh token not found',
  RefreshTokenExpired: 'Refresh token has expired',
  PasswordResetTokenExpired: 'Password reset token has expired',
  PasswordResetTokenNotExpired: 'Another password reset request is pending. Please check your email',
  PasswordResetTokenNotFound: 'Password reset token not found',
  NothingChanged: 'Nothing changed',
  NothingToChange: 'Nothing to change',
  UnexpectedMatchedEntitiesCount:
    'The number of matched entities was different than expected',
};

export const ServerErrors = {
  ACCESS_DENIED: 'Access denied',
  INACTIVE_ACCOUNT: 'User account not active',
  USER_NOT_FOUND: 'User not found',
  NOT_FOUND: 'Not found',
  JWT_EXPIRED_OR_NOT_FOUND:
    'Authorization header not found or jwt token has expired',
  FAILED_VALIDATION: 'Failed validation',
  EMAIL_EXISTS: 'The email already exists',
  EMAIL_NOT_VERIFIED:
    'This email has not been verified. Please check your email',
  INVALID_CREDENTIALS: 'Invalid credentials',
  LOGIN_EXCEED: 'Maximum login attempts reached. Please contact an admin to reset your password',
  INCORRECT_OLD_PASSWORD: 'Incorrect old password',
  NO_UPDATE_DELETED: 'Deleted entity cannot be updated',
  VERIFICATION_CODE_NOT_FOUND:
    'Email verification code not found. '
    + 'You may get this message if your email is already confirmed',
  ALREADY_MARKED_DELETED: 'Already marked as deleted',
  REFRESH_TOKEN_EXPIRED: ServerError.RefreshTokenExpired,
  REFRESH_TOKEN_NOT_FOUND: ServerError.RefreshTokenNotFound,
  PASSWORD_RESET_TOKEN_EXPIRED: ServerError.PasswordResetTokenExpired,
  PASSWORD_RESET_TOKEN_NOT_FOUND: ServerError.PasswordResetTokenNotFound,
  PASSWORD_RESET_TOKEN_NOT_EXPIRED: ServerError.PasswordResetTokenNotExpired,
  USER_EMAIL_NOT_FOUND: 'User email not found',
  STATUS_NOT_CHANGED: 'Status is already set to that value',
};

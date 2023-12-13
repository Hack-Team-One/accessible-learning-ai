import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  RateLimiterGuard,
  RateLimiterModuleAsyncOptions,
} from 'nestjs-rate-limiter';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private rateLimiterGuard: RateLimiterGuard;

  constructor() {
    super();
    const rateLimiterOptions: RateLimiterModuleAsyncOptions = {
      // Specify your rate limiting options here
      for: 'Express',
      type: 'Memory',
      points: 5, // Number of points
      duration: 60, // Per second(s)
      // Other options as required
    };
    this.rateLimiterGuard = new RateLimiterGuard(rateLimiterOptions);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.rateLimiterGuard.canActivate(context); // Apply rate limiting
    return super.canActivate(context); // Continue with the usual guard checks
  }

  // Additional methods or properties can be added as needed
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SimpleAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    // Example check: require header "x-api-key"
    if (req.headers['x-api-key'] !== 'secret123') {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from './user-role.decorator';
import { UserRole } from './user-role.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    if (!user) {
      return false;
    }

    const authorized = requiredRoles.some((role) => user.role === role);
    if (authorized) {
      return true;
    }
    throw new UnauthorizedException();
  }
}

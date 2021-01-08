/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user-role.enum';

export const ROLE_KEY = 'role';
export const Roles = (roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
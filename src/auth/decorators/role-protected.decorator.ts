import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../enums';
export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) =>
  SetMetadata(META_ROLES, args);

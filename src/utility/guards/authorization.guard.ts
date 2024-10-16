import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, mixin } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

/* @Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const currentUser = request.currentUser;

        // Log for debugging
        console.log('AuthorizeGuard - allowedRoles:', allowedRoles);
        console.log('AuthorizeGuard - currentUser:', currentUser);
        console.log('AuthorizeGuard - user role:', currentUser?.role);
        
        if (currentUser && allowedRoles.includes(currentUser.role)) {
            return true;
        }
        
        throw new UnauthorizedException('Sorry, you are not authorized.');
    }
} */
export const AuthorizeGuard = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest();
            const currentUser = request.currentUser;

            console.log('AuthorizeGuard - allowedRoles:', allowedRoles);
            console.log('AuthorizeGuard - currentUser:', currentUser);
            console.log('AuthorizeGuard - user role:', currentUser?.role);

            // Check if the current user's role is in the allowed roles
            if (currentUser && allowedRoles.includes(currentUser.role)) {
                return true;
            }

            throw new UnauthorizedException('Sorry, you are not authorized.');
        }
    }

    const guard = mixin(RolesGuardMixin);
    return guard;
}

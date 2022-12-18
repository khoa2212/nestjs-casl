import { ForbiddenError } from "@casl/ability";
import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException 
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";
import { CurrentUser } from "src/users/currentUser";
import { RequiredRule, CHECK_ABILITY } from "./ability.decorator";
import { AbilityFactory } from "./ability.factory";

@Injectable()
export class AbilityGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory
    ){}

   async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];

        const user = CurrentUser.getCurrentUser();
        const ability = this.caslAbilityFactory.defineAbility(user);

        try
        {
            rules.forEach((rule) =>
                ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
            )
            return true
        }
        catch(error)
        {
            if(error instanceof ForbiddenError){
                throw new ForbiddenException(error.message)
            }
        }
   }
}
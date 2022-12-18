import { 
    InferSubjects, 
    AbilityBuilder, 
    PureAbility, 
    AbilityClass, 
    ExtractSubjectType
} from "@casl/ability";

import { Injectable } from "@nestjs/common";
import { User } from "../users/users.model";

export enum Action {
    Manage = 'manage', // co quyen han cao nhat
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User){
        const {can, cannot, build} = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>)

        if(user.isAdmin)
        {
            can(Action.Manage, 'all');
        }
        else
        {
            can(Action.Read, User);
            cannot(Action.Create, User).because("Only admin can create user")
            cannot(Action.Delete, User).because("Only admin can delete user")
            cannot(Action.Update, User).because("Only admin can update user")
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
        });
    }
}
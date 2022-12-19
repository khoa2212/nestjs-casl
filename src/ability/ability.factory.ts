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

        switch(user.role)
        {
            case "Admin":
                {
                    can(Action.Manage, 'all');
                    break;
                }
            case "Customer":
                {
                    can(Action.Read, User);
                    cannot(Action.Create, User).because("Only Employee and admin can create user!!")
                    cannot(Action.Delete, User).because("Only admin can delete user!!")
                    cannot(Action.Update, User).because("Only admin can block user!!")
                    break;
                }
            case "Employee":
                {
                    can(Action.Read, User);
                    can(Action.Create, User);
                    cannot(Action.Delete, User).because("Only admin can delete user!!")
                    cannot(Action.Update, User).because("Only admin can block user!!")
                }
            default:
                break;
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
        });
    }
}
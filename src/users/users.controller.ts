import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    ForbiddenException, 
    Delete,
    Patch,
    Put,
    UseGuards
} from "@nestjs/common";
import { CheckAbility } from "src/ability/ability.decorator";

import { AbilityFactory, Action } from "src/ability/ability.factory";
import { User } from "./users.model";
import { UserService } from "./users.service";
import { AbilityGuard } from "src/ability/ability.guard";

@Controller('users')
export class UserController {
    constructor(private userService: UserService, 
        //private abilityFactory: AbilityFactory
    ) {}
    
    @Get()
    //@UseGuards(AbilityGuard)
    @CheckAbility({ action: Action.Read, subject: User })
    getAllUSers() : User[] {
        return this.userService.getAllUsers();
    }
    
    @Post()
    @CheckAbility({ action: Action.Create, subject: User })
    createUser(@Body() user: User){
        
        // const currentUser = this.userService.getUserById(1);// id = 1, sua id = 2 de doi tai khoan
        // const ability = this.abilityFactory.defineAbility(currentUser);
        // const isAllow = ability.can(Action.Create, User);
        // if(!isAllow) {
        //     throw new ForbiddenException("Only Admin!!")
        // }
         
        return this.userService.addUser(user);
    }

    @Delete()
    @CheckAbility({ action: Action.Delete, subject: User })
    deleteUser(@Body() user: User){
        return this.userService.deleteUser(user);
    }

    @Put()
    @CheckAbility({ action: Action.Update, subject: User })
    blockUser(@Body() user: User){
        return this.userService.blockUser(user);
    }

    @Get(':id')
    @CheckAbility({ action: Action.Read, subject: User })
    getUserById(@Param('id') id: number): User{
        return this.userService.getUserById(id);
    }
}
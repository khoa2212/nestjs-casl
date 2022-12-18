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
} from "@nestjs/common";

import { AbilityFactory, Action } from "src/ability/ability.factory";
import { User } from "./users.model";
import { UserService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService, 
        private abilityFactory: AbilityFactory
    ) {}
    
    @Get()
    getAllUSers() : User[] {
        return this.userService.getAllUsers();
    }
    
    @Post(':currentUserId')
    createUser(@Body() user: User, @Param('currentUserId') currentUserId: number){
        
        const currentUser = this.userService.getUserById(currentUserId);
        const ability = this.abilityFactory.defineAbility(currentUser);
        
        const isAllow = ability.can(Action.Create, User);
        
        if(!isAllow) {
            throw new ForbiddenException("Only Admin!!")
        }
         
        return this.userService.addUser(user);
    }

    @Delete(':currentUserId')
    deleteUser(@Body() user: User, @Param('currentUserId') currentUserId: number){

    }

    @Put()
    updateUser(){

    }
    
    @Patch(':currentUserId')
    blockUser(){
        
    }

    @Get(':id')
    getUserById(@Param('id') id: number): User{
        return this.userService.getUserById(id);
    }
}
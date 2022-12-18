import { User } from "./users.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    
    ListUser: User[] = [
        {id: 1, username: "khoa", password: "123", isAdmin: true, isBlocked: false}, 
        {id: 2, username: "Jimmy", password: "123", isAdmin: false, isBlocked: false},
        {id: 3, username: "Jimmy1", password: "123", isAdmin: false, isBlocked: false},
        {id: 4, username: "Jimmy2", password: "123", isAdmin: false, isBlocked: false},
        {id: 5, username: "Jimmy3", password: "123", isAdmin: false, isBlocked: false}
    ]

    getAllUsers() : User[] {
        return this.ListUser
    }

    getUserById(id: number) : User {
        const result = this.ListUser.find((user) => {
            return user.id == id
        })
        return result
    }

    addUser(user: User) : boolean {
        const len = this.ListUser.length;
        this.ListUser.push(user);

        if(this.ListUser.length === len + 1)
        {
            console.log("Them thanh cong")
            return true
        }
        else
        {
            console.log("Them that bai")
            return false
        }
    }

    deleteUser(user: User) : boolean{
        const len = this.ListUser.length;

        const index = this.ListUser.indexOf(user, 0);
        if (index > -1) {
            this.ListUser.splice(index, 1);   
        }
        console.log(index)
        console.log(this.ListUser);
        if(this.ListUser.length === len - 1)
        {
            console.log("Xoa thanh cong")
            return true
        }
        else
        {
            console.log("Xoa that bai")
            return false
        }
    }    
}
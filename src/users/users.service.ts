import { User } from "./users.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    ListUser: User[] = [
        {id: 1, username: "khoa", password: "123", isAdmin: true}, 
        {id: 2, username: "Jimmy", password: "123", isAdmin: false}
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
    
}
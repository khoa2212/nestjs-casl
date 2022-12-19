export class CurrentUser {

    static getCurrentUser() {
        const curUser = {id: 1, username: "khoa", password: "123", role:"Admin", isBlocked: false}
        //const curUser = {id: 1, username: "khoa", password: "123", role:"Employee", isBlocked: false}
        //const curUser = {id: 1, username: "khoa", password: "123", role:"Customer", isBlocked: false}
        return curUser
    }
}
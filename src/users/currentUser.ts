export class CurrentUser {

    static getCurrentUser() {
        const curUser = {id: 1, username: "khoa", password: "123", isAdmin: true, isBlocked: false}
        return curUser
    }
}
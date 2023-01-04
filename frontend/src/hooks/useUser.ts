import {UserAuth} from "../models/User";
import {addUser, getToken} from "../api-calls";

export default function useUser() {

    function registerUser(newUser: UserAuth) {
        getToken().then(() => {
            addUser(newUser)
        })
    }

    return {registerUser}
}
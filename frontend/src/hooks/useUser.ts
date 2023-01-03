import {UserAuth} from "../models/User";
import {addUser} from "../api-calls";

export default function useUser() {

    function registerUser(newUser: UserAuth) {
        addUser(newUser)
    }

    return {registerUser}
}
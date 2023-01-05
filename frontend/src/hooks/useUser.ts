import {NewUserRequest, UserLoginRequest, UserSpot} from "../models/User";
import {addUser, getToken, loginUser, whoAmI} from "../api-calls";
import {useEffect, useState} from "react";

export default function useUser() {

    const [loggedInUser, setLoggedInUser] = useState<UserSpot>({
        author: {
            createdSpots: [],
            firstName: "",
            lastName: "",
            nickname: "anonymousUser"
        },
        id: "null",
        username: "anonymousUser"

    })

    useEffect(() => {
        whoAmI().then(data => setLoggedInUser(data))
    })

    function registerUser(newUser: NewUserRequest) {
        getToken().then(() => {
            addUser(newUser)
        })
    }

    function login(userLoginRequest: UserLoginRequest) {
        loginUser(userLoginRequest)
            .then(data => setLoggedInUser(data))
    }

    return {registerUser, loggedInUser, login}
}
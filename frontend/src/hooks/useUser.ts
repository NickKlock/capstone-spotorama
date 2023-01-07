import {UserLoginRequest, UserRequest, UserSpot} from "../models/User";
import {addUser, getToken, loginUser, logoutUser, whoAmI} from "../api-calls";
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
    }, [])

    function registerUser(newUser: UserRequest): Promise<void> {
        return getToken().then(() => {
            return addUser(newUser).then(() => Promise.resolve())
        })
    }

    function login(userLoginRequest: UserLoginRequest): Promise<void> {
        return getToken().then(() => {
            return loginUser(userLoginRequest)
                .then(data => setLoggedInUser(data))
                .then(() => Promise.resolve())
        })
    }

    function logout(): Promise<void> {
        return getToken().then(() => {
            logoutUser()
                .catch(console.error)
        })
    }

    function updateUser(): Promise<void> {
        return getToken().then(() => {
            //update
        })
    }

    function deleteUser(): Promise<void> {
        return getToken().then(() => {

        })
    }

    return {registerUser, loggedInUser, login, logout, updateUser, deleteUser}
}
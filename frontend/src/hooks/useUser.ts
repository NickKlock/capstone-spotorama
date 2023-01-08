import {UserLoginRequest, UserRequest, UserSpot} from "../models/User";
import {addUser, deleteUser, getToken, loginUser, logoutUser, updateUser, whoAmI} from "../api-calls";
import {useEffect, useState} from "react";

export default function useUser() {
    const initialUser = {
        author: {
            createdSpots: [],
            firstName: "",
            lastName: "",
            nickname: "anonymousUser"
        },
        id: "null",
        username: "anonymousUser"
    }
    const [loggedInUser, setLoggedInUser] = useState<UserSpot>(initialUser)

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
                .then(() => setLoggedInUser(initialUser))
                .catch(console.error)
        })
    }

    function edit(userRequest: UserRequest): Promise<void> {
        return getToken().then(() => {
            updateUser(userRequest)
                .then(data => setLoggedInUser(data))
        })
    }

    function deletee(id: string): Promise<void> {
        return getToken().then(() => {
            deleteUser(id).then(response => setLoggedInUser(response))
        })
    }

    return {registerUser, loggedInUser, login, logout, edit, deletee}
}
import axios from "axios";
import {Spot} from "./models/Spot";
import {UserLoginRequest, UserRequest} from "./models/User";

export function getAccessToken() {
    return axios.get("/api/mapbox")
        .then(response => response.data)
        .catch(console.error)
}

export function postSpot(newSpot: Spot) {
    return axios.post("/api/spots", newSpot)
        .then(response => response.data)
        .catch(console.error)
}

export function getAllSpots() {
    return axios.get("/api/spots")
        .then(response => response.data)
        .catch(console.error)
}

export function getSpotById(id: string) {
    return axios.get("/api/spots/" + id)
        .then(response => response.data)
        .catch(console.error)
}

export function addUser(newUser: UserRequest) {
    return axios.post("/api/users/", newUser)
        .then(response => response.data)
        .catch(console.error)
}

export function whoAmI() {
    return axios.get("/api/users/me")
        .then(response => response.data)
        .catch(console.error)
}

export function getToken() {
    return axios.get("/csrf")
        .then(response => response.data)
        .catch(console.error)
}

export function loginUser(loginUserRequest: UserLoginRequest) {
    return axios.post("/api/users/login", undefined,
        {
            withCredentials: true,
            auth:
                {
                    password: loginUserRequest.password,
                    username: loginUserRequest.username
                }
        }
    ).then(response => response.data)
        .catch(console.error)
}

export function logoutUser() {
    return axios.post("/api/users/logout")
}

export function updateUser(updatedUserRequest: UserRequest) {
    return axios.put("/api/users/", updatedUserRequest)
        .then(response => response.data)
}
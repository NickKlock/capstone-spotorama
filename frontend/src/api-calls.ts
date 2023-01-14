import axios, {AxiosResponse} from "axios";
import {Spot} from "./models/Spot";
import {UserLoginRequest, UserRequest, UserSpot} from "./models/User";

export function getAccessToken(): Promise<string> {
    return axios.get("/api/mapbox")
        .then((response: AxiosResponse<string>) => response.data)
}

export function postSpot(newSpot: Spot): Promise<Spot> {
    let formData = new FormData()

    if (newSpot.spotImage) {
        formData.append("file", newSpot.spotImage[0])
    }
    formData.append("spot", JSON.stringify(newSpot))

    return axios.post("/api/spots", formData)
        .then((response: AxiosResponse<Spot>) => response.data)
}

export function getAllSpots(): Promise<Spot[]> {
    return axios.get("/api/spots")
        .then((response: AxiosResponse<Spot[]>) => response.data)
}

export function getSpotById(id: string): Promise<Spot> {
    return axios.get("/api/spots/" + id)
        .then((response: AxiosResponse<Spot>) => response.data)
}

export function addUser(newUser: UserRequest): Promise<UserSpot> {
    return axios.post("/api/users/", newUser)
        .then((response: AxiosResponse<UserSpot>) => response.data)
}

export function whoAmI(): Promise<UserSpot> {
    return axios.get("/api/users/me")
        .then((response: AxiosResponse<UserSpot>) => response.data)
}

export function loginUser(loginUserRequest: UserLoginRequest): Promise<UserSpot> {
    return axios.post("/api/users/login", undefined,
        {
            withCredentials: true,
            auth:
                {
                    password: loginUserRequest.password,
                    username: loginUserRequest.username
                }
        }
    ).then((response: AxiosResponse<UserSpot>) => response.data)
}

export function logoutUser(): Promise<AxiosResponse> {
    return axios.post("/api/users/logout")
}

export function updateUser(updatedUserRequest: UserRequest): Promise<UserSpot> {
    return axios.put("/api/users/", updatedUserRequest)
        .then((response: AxiosResponse<UserSpot>) => response.data)
}

export function deleteUser(id: string): Promise<UserSpot> {
    return axios.delete("/api/users/" + id)
        .then((response: AxiosResponse<UserSpot>) => response.data)
}
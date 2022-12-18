import axios from "axios";
import {Spot} from "./models/Spot";

export function getAccessToken(){
    return axios.get("/api/mapbox")
        .then(response => response.data)
        .catch(console.error)
}

export function postSpot(newSpot: Spot){
    return axios.post("api/spots",newSpot)
        .then(response => response.data)
        .catch(console.error)
}

export function getAllSpots(){
    return axios.get("api/spots")
        .then(response => response.data)
        .catch(console.error)
}

export function getSpotById(id:string){
    return axios.get("api/spots/"+id)
        .then(response => response.data)
        .catch(console.error)
}
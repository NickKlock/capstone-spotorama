import axios from "axios";
import {Spot} from "./models/Spot";

export function getAccessToken(){
    return axios.get("/api/mapbox")
        .then(response => response.data)
        .catch(console.error)
}

export function addSpot(newSpot: Spot){
    return axios.post("api/spots",newSpot)
        .then(response => response.data)
        .catch(console.error)
}
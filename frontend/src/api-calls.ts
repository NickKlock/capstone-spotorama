import axios from "axios";

export function getAccessToken(){
    return axios.get("/api/mapbox")
        .then(response => response.data)
        .catch(console.error)
}
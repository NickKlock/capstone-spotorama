import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AlertModel} from "../models/AlertModel";

export default function useNavigationWithAlert() {
    const navigate = useNavigate()
    const [navigateWithAlert, setNavigateWithAlert] = useState<boolean>(false)
    const [navigationAlert, setNavigationAlert] = useState<AlertModel>()

    useEffect(() => {
        if (navigateWithAlert && navigationAlert) {
            navigate("/", {state: navigationAlert})
        }
    }, [navigateWithAlert, navigate, navigationAlert])

    return {setNavigateWithAlert, setNavigationAlert}
}
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AlertModel} from "../models/AlertModel";

export default function useNavigationWithAlert() {
    const navigate = useNavigate()
    const [navigateWithAlert, setNavigateWithAlert] = useState<boolean>(false)
    const [navigationAlert, setNavigationAlert] = useState<AlertModel>()
    const [navigationUrl, setNavigationUrl] = useState<string>()

    useEffect(() => {
        if (navigateWithAlert && navigationAlert && navigationUrl) {
            navigate(navigationUrl, {state: navigationAlert})
        }
    }, [navigateWithAlert, navigate, navigationAlert, navigationUrl])


    return {setNavigateWithAlert, setNavigationAlert, setNavigationUrl}
}
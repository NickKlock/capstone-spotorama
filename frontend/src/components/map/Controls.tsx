import {Marker, useMap} from "react-map-gl";
import {useEffect, useState} from "react";
import {Position} from "../../models/Position";

type ControlsProps={
    showCenterMarker:boolean
    handleCenterCoordinatesChange(center:Position):void
    centerLng:number | undefined
    centerLat:number | undefined
}
export default function Controls(props:ControlsProps) {
    const {spotmap} = useMap()
    const [lng, setLng] = useState<number>(0)
    const [lat, setLat] = useState<number>(0)

    function onMove() {
        if (spotmap) {
            setLat(spotmap?.getCenter().lat)
            setLng(spotmap?.getCenter().lng)

            props.handleCenterCoordinatesChange({
                lat: parseFloat(spotmap?.getCenter().lat.toFixed(4)),
                lng: parseFloat(spotmap?.getCenter().lng.toFixed(4))
            })
        }
    }

    useEffect(() => {
        if (!spotmap) return;
        spotmap.on("move", onMove)
        onMove()
    })

    if (props.showCenterMarker) {
        return (
            <Marker longitude={lng} latitude={lat}/>
        )
    }else {
        return <></>
    }

}
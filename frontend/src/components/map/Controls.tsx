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


    useEffect(() => {
        if (!spotmap) return;

        function onMove() {
            if (spotmap) {
                setLat(spotmap?.getCenter().lat)
                setLng(spotmap?.getCenter().lng)

                props.handleCenterCoordinatesChange({
                    country: "",
                    geo: {
                        type: "Point",
                        coordinates: [spotmap?.getCenter().lng, spotmap?.getCenter().lat]
                    }
                })
            }
        }

        spotmap.on("move", onMove)
        onMove()

        //disabling es lint because the props are always changing and we don't want an endless loop here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spotmap])

    if (props.showCenterMarker) {
        return (
            <Marker longitude={lng} latitude={lat}/>
        )
    }else {
        return <></>
    }

}
import {Marker, useMap} from "react-map-gl";
import {useEffect} from "react";
import {Position} from "../../models/Position";

type ControlsProps={
    showCenterMarker:boolean
    handleCenterCoordinatesChange(center:Position):void
    centerLng:number | undefined
    centerLat:number | undefined
}
export default function Controls(props:ControlsProps){
    const {spotmap} = useMap()


    useEffect(()=>{
        if (!spotmap) return undefined;

        function onMove(){
            if (spotmap){

                props.handleCenterCoordinatesChange({
                    lat:parseFloat(spotmap?.getCenter().lat.toFixed(3)),
                    lng:parseFloat(spotmap?.getCenter().lng.toFixed(3))
                })
            }
        }
        spotmap.on("move",onMove)
        onMove()

    },[spotmap])

    if (props.showCenterMarker){
        return(
            <Marker longitude={props.centerLng} latitude={props.centerLat}/>
        )
    }else {
        return <></>
    }

}
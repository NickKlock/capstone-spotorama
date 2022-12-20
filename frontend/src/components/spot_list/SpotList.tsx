import {Spot} from "../../models/Spot";
import SpotItem from "./SpotItem";
import {Stack, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";

type SpotListProps = {
    spots: Spot[]
}
export default function SpotList(props: SpotListProps) {
    const [searchTerm, setSearchTerm] = useState<string>("")
    function handleSearchInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchTerm(event.target.value)
    }

    const filteredSpots = props.spots.filter((spot) => spot.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (<Stack
        direction={"column"}
        spacing={2}
        marginTop={2}>
        <TextField type={"search"} onChange={handleSearchInputChange} placeholder={"Search for a Spot"}/>
        {filteredSpots.map((spot) => <SpotItem spot={spot} key={spot.id}/>
        )}
    </Stack>)
}
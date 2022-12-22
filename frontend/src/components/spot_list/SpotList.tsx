import {Spot} from "../../models/Spot";
import SpotItem from "./SpotItem";
import {Accordion, AccordionDetails, AccordionSummary, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {ExpandMore} from "@mui/icons-material";

type SpotListProps = {
    spots: Spot[]
}
export default function SpotList(props: SpotListProps) {
    const [searchTerm, setSearchTerm] = useState<string>("")

    function handleSearchInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchTerm(event.target.value.toLowerCase())
    }


    const groupedSpots = new Map<string, Spot[]>()

    props.spots.forEach((spot) => {
        const countryName = spot.position.country
        if (countryName) {
            if (!groupedSpots.has(countryName)) {
                groupedSpots.set(countryName, [])
            }
            const spotsFromMap = groupedSpots.get(countryName)
            if (spotsFromMap) {
                spotsFromMap.push(spot)
            }
        }
    })


    const filteredSpots = Array.from(groupedSpots).filter(([countryName, spots]) => {
        return countryName.toLowerCase().includes(searchTerm) || spots.filter((spot) => spot.name.toLowerCase().includes(searchTerm) ||
            spot.disciplines.filter((discipline) => discipline.toLowerCase().includes(searchTerm)));
    })

    console.log(filteredSpots)


    return (
        <Stack
            direction={"column"}
            spacing={2}
            marginTop={10}>
            <TextField type={"search"} onChange={handleSearchInputChange} placeholder={"Search for a Spot"}/>

            {filteredSpots.map(([countryName, spots]) =>
                <Accordion key={countryName}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>{countryName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction={"column"} spacing={1}>
                            {spots.map((spot) => <SpotItem spot={spot} key={spot.id}/>)}
                        </Stack>
                    </AccordionDetails>
                </Accordion>)}
        </Stack>)
}
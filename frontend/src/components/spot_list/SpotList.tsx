import {Spot} from "../../models/Spot";
import SpotItem from "./SpotItem";
import {Accordion, AccordionDetails, AccordionSummary, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {ExpandMore} from "@mui/icons-material";

type SpotListProps = {
    spots: Spot[]
}
export default function SpotList(props: SpotListProps) {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [groupedSpots, setGroupedSpots] = useState<Map<string, Spot[]>>()

    function handleSearchInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchTerm(event.target.value.toLowerCase())
    }

    useEffect(() => {
        const mappedSpots = new Map<string, Spot[]>()
        props.spots.forEach((spot) => {
                if (!groupedSpots) {
                    setGroupedSpots(new Map<string, Spot[]>())
                }
                const countryName = spot.position.country
                if (countryName) {
                    if (!mappedSpots.has(countryName)) {
                        mappedSpots.set(countryName, [])
                    }
                    const spotsFromMap = mappedSpots.get(countryName)
                    if (spotsFromMap) {
                        spotsFromMap.push(spot)
                    }
                }
            }
        )
        setGroupedSpots(mappedSpots)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.spots])

    if (groupedSpots) {
        const filteredCountries = Array.from(groupedSpots).filter(([countryName]) => countryName.toLowerCase().includes(searchTerm))

        return (
            <Stack
                direction={"column"}
                spacing={2}
                marginTop={10}>
                <TextField type={"search"} onChange={handleSearchInputChange} placeholder={"Search for a country"}/>

                {filteredCountries.map(([countryName, spots]) =>
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
    } else {

        return (
            <p>loading...</p>
        )
    }


}
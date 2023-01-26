import {Spot, SpotMinimal} from "../../models/Spot";
import SpotItem from "./SpotItem";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Backdrop,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {ExpandMore} from "@mui/icons-material";
import useSpots from "../../hooks/useSpots";


export default function SpotList() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [groupedSpots, setGroupedSpots] = useState<Map<string, SpotMinimal[]>>()
    const [allSpots, setAllSpots] = useState<SpotMinimal[]>()
    const {getAllSpots} = useSpots()
    const [showLoading, setShowLoading] = useState<boolean>(true)

    useEffect(() => {
        getAllSpots()
            .then((response: SpotMinimal[]) => {
                setAllSpots(response)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleSearchInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchTerm(event.target.value.toLowerCase())
    }

    useEffect(() => {
        if (!allSpots) return

        const mappedSpots = new Map<string, SpotMinimal[]>()
        allSpots.forEach((spot) => {
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
        setShowLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSpots])

    if (groupedSpots) {
        const filteredCountries = Array.from(groupedSpots)
            .filter(([countryName]) => countryName.toLowerCase().includes(searchTerm))

        return (
            <Paper>
                <Stack
                    direction={"column"}
                    spacing={2}
                    marginTop={"56.5px"}>
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
                </Stack>
            </Paper>
        )
    } else {

        return (
            <Backdrop open={showLoading} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress sx={{marginRight: 1}}/>
                <Typography textAlign={"center"}>Loading spots...</Typography>
            </Backdrop>
        )
    }
}
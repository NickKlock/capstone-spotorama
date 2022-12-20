import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel, List, ListItem,
    Radio,
    RadioGroup,
    SelectChangeEvent,
    Slider,
    TextField,
    Typography
} from "@mui/material";

import {
    beachtypes,
    months,
    disciplines,
    experiencesLevel,
    hazards,
    wavetypes,
    windDirections, waterTemperatures
} from "../models/SelectOptions";

import {ChangeEvent, useState} from "react";
import CustomSelect from "./ui/CustomSelect";
import {Spot} from "../models/Spot";
import {Position} from "../models/Position";


const parkingSliderMarks = [
    {
        value: 0,
        label: "few"
    },
    {
        value: 1,
        label: "enough"
    },
    {
        value: 2,
        label: "alot"
    }
]

type AddSpotProps = {
    pickedLocation: Position
    handleCancel(): void
    handleSave(newSpot: Spot): void
}

export default function AddSpot(props: AddSpotProps) {
    const initialSpot: Spot = {
        id: "",
        name: "empty",
        disciplines: [],
        waveTypes: [],
        beachTypes: [],
        experiencesLevel: [],
        hazards: [],
        bestMonths: [],
        bestDirections: [],
        waterTemperature: [],
        parkingSpace: "FEW",
        position: props.pickedLocation,
        restrooms: "no"
    }

    const [newSpot, setNewSpot] = useState<Spot>(initialSpot);

    // The final Event type comes from the mui Slider , and it's not compatible with the other events
    function handleInputChange(event: SelectChangeEvent<string[]>
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | Event) {
        if (event.target) {
            // There is actually an event.target no matter what event gets fired, therefore we ignore es-lint in this case
                // @ts-ignore
                setNewSpot({...newSpot, [event.target.name]: event.target.value})
        }

    }

    function handleSave() {
        props.handleSave(newSpot)
    }


    function handleCancel() {
        props.handleCancel();
    }

    return (
        <Box flexWrap={"wrap"}
             display={"flex"}
             justifyContent={"space-between"}
             alignItems={"center"}
             flexDirection={"column"}>
            <Typography textAlign={"center"} variant={"h6"}>Create a new spot</Typography>
            <Box
                component={"form"}
                noValidate
                flexWrap={"wrap"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={"column"}
                width={"80%"}
            >
                <List>
                    <ListItem>
                        <FormControl fullWidth={true} margin={"dense"}>
                            <TextField name={"name"} type={"text"} label={"Spotname"} onChange={handleInputChange}/>
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <CustomSelect
                            fieldName={"disciplines"}
                            label={"Disciplines"}
                            selectedValue={newSpot.disciplines}
                            data={disciplines}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>

                    <ListItem>
                        <Box marginTop={1}>
                            <Typography gutterBottom={true}>Parking space: {newSpot.parkingSpace}</Typography>
                            <Slider name={"parkingSpace"} onChange={handleInputChange} min={0} max={2} defaultValue={0}
                                    step={1}
                                    valueLabelDisplay={"off"} marks={parkingSliderMarks}/>
                        </Box>
                    </ListItem>

                    <ListItem>
                        <FormControl>
                            <FormLabel>Restrooms</FormLabel>
                            <RadioGroup
                                defaultValue="No"
                                name="restrooms"
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <CustomSelect
                            fieldName={"waveTypes"}
                            selectedValue={newSpot.waveTypes}
                            data={wavetypes}
                            label={"Wavetype"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>

                    <ListItem>
                        <CustomSelect
                            fieldName={"beachTypes"}
                            selectedValue={newSpot.beachTypes}
                            data={beachtypes}
                            label={"Beach"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>

                    <ListItem>
                        <CustomSelect
                            fieldName={"experiencesLevel"}
                            selectedValue={newSpot.experiencesLevel}
                            data={experiencesLevel}
                            label={"For rider that are"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>

                    <ListItem>
                        <CustomSelect
                            fieldName={"hazards"}
                            selectedValue={newSpot.hazards}
                            data={hazards}
                            label={"Hazards"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>

                    <ListItem>
                        <CustomSelect
                            fieldName={"bestMonths"}
                            selectedValue={newSpot.bestMonths}
                            data={months}
                            label={"Best in those months"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>

                    <ListItem>
                        <CustomSelect
                            fieldName={"bestDirections"}
                            selectedValue={newSpot.bestDirections}
                            data={windDirections}
                            label={"Best wind directions"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>
                    <ListItem>
                        <CustomSelect
                            fieldName={"waterTemperature"}
                            selectedValue={newSpot.waterTemperature}
                            data={waterTemperatures}
                            label={"Main Water Temperature"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>
                </List>

                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Close</Button>
            </Box>
        </Box>)
}
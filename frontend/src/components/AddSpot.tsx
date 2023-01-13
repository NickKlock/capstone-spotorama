import {Box, Button, List, ListItem, Typography} from "@mui/material";

import {
    beachtypes,
    disciplines,
    experiencesLevel,
    hazards,
    months,
    waterTemperatures,
    wavetypes,
    windDirections
} from "../models/SelectOptions";

import {useMemo} from "react";
import {Spot} from "../models/Spot";
import {Position} from "../models/Position";
import {FormProvider, RegisterOptions, useForm} from "react-hook-form";
import FormTextInput from "./ui/form-inputs/FormTextInput";
import FormSelect from "./ui/form-inputs/FormSelect";
import FormSlider from "./ui/form-inputs/FormSlider";
import FormRadio from "./ui/form-inputs/FormRadio";


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

interface textFieldInput {
    name: "username" | "password" | "author" | "author.nickname" | "author.firstName" | "author.lastName" | "author.createdSpots" | "name",
    label: string,
    required: boolean,
    rules?: RegisterOptions
    inputType: string
}

export default function AddSpot(props: AddSpotProps) {
    const textFieldInputs: textFieldInput[] = useMemo(() => [
        {
            name: "name",
            label: "Spotname",
            required: true,
            inputType: "text",
            rules: {
                required: "This field is required"
            }
        }
    ], [])

    const selectInputs = useMemo(() => [
        {
            name: "disciplines",
            label: "Disciplines",
            data: disciplines,
            required: true,
            rules: {
                required: "This field is required"
            }
        },
        {
            name: "waveTypes",
            label: "WaveTypes",
            data: wavetypes,
            required: false
        },
        {
            name: "beachTypes",
            label: "Beach condition",
            data: beachtypes,
            required: false
        },
        {
            name: "experiencesLevel",
            label: "For rider that are",
            data: experiencesLevel,
            required: true,
            rules: {
                required: "This field is required"
            }
        },
        {
            name: "hazards",
            label: "Hazards",
            data: hazards,
            required: true,
            rules: {
                required: "This field is required"
            }
        },
        {
            name: "bestMonths",
            label: "Best in those months",
            data: months,
            required: false
        },
        {
            name: "bestDirections",
            label: "Best wind directions",
            data: windDirections,
            required: true,
            rules: {
                required: "This field is required"
            }
        },
        {
            name: "waterTemperature",
            label: "Predominant water temperature",
            data: waterTemperatures,
            required: false
        }
    ], [])

    const initialSpot: Spot = {
        id: "",
        name: "",
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
        restrooms: ""
    }
    const methods = useForm<Spot>({
        defaultValues: initialSpot
    });

    function handleSave(data: Spot) {
        props.handleSave(data)
    }


    function handleCancel() {
        props.handleCancel();
    }

    return (
        <FormProvider {...methods}>
            <Box flexWrap={"wrap"}
                 display={"flex"}
                 justifyContent={"space-between"}
                 alignItems={"center"}
                 marginTop={1}
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
                    <List sx={{width: "100%"}}>
                        {textFieldInputs.map((inputField) =>
                            <ListItem>
                                <FormTextInput required={inputField.required}
                                               name={inputField.name}
                                               label={inputField.label}
                                               editable={true}
                                               rules={inputField.rules}
                                               inputType={inputField.inputType}/>
                            </ListItem>)}

                        {selectInputs.map((selectInput) =>
                            <ListItem>
                                <FormSelect required={selectInput.required}
                                            name={selectInput.name}
                                            label={selectInput.label}
                                            data={selectInput.data}
                                            rules={selectInput.rules}/>
                            </ListItem>)}

                        <ListItem>
                            <FormSlider name={"parkingSpace"}
                                        minValue={0}
                                        maxValue={2}
                                        defaultValue={0}
                                        step={1}
                                        marks={parkingSliderMarks}/>
                        </ListItem>

                        <ListItem>
                            <FormRadio label={"Restrooms"}
                                       defaultValue={"no"}
                                       name={"restrooms"}
                                       options={["yes", "no"]}/>
                        </ListItem>
                    </List>

                    <Button onClick={methods.handleSubmit(handleSave)}>Save</Button>
                    <Button onClick={handleCancel}>Close</Button>
                </Box>
            </Box>
        </FormProvider>
    )
}
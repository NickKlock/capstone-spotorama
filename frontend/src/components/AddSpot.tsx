import {
    Box,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {beachtypes, disciplines, wavetypes} from "../statics/Statics";
import {useState} from "react";
import CustomSelect from "./ui/CustomSelect";

export default function AddSpot() {
    const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
    const [selectedWaveType, setSelectedWaveType] = useState<string[]>([]);
    const [selectedBeachType, setSelectedBeachType] = useState<string[]>([]);

    function handleDisciplineSelectChange(event: SelectChangeEvent<string[]>) {
        const value = event.target.value
        setSelectedDisciplines(typeof value === "string" ?
            value.split(",")
            : value)
    }

    function handleWaveTypeChange(event: SelectChangeEvent<string[]>) {
        const value = event.target.value
        setSelectedWaveType(typeof value === "string" ?
            value.split(",")
            : value)
    }

    function handleBeachTypeChange(event: SelectChangeEvent<string[]>) {
        const value = event.target.value
        setSelectedBeachType(typeof value === "string" ?
            value.split(",")
            : value)
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
                <TextField id={"name"} type={"text"} label={"Spotname"}></TextField>

                <CustomSelect
                    label={"Disciplines"}
                    selectedValue={selectedDisciplines}
                    data={disciplines}
                    handleSelectChange={handleDisciplineSelectChange}
                />

                <CustomSelect
                    selectedValue={selectedWaveType}
                    data={wavetypes}
                    label={"Wavetype"}
                    handleSelectChange={handleWaveTypeChange}
                />

                <CustomSelect
                    selectedValue={selectedBeachType}
                    data={beachtypes}
                    label={"Beach"}
                    handleSelectChange={handleBeachTypeChange}
                />



            </Box>
        </Box>)
}
import {
    BeachType,
    Discipline,
    ExperiencesLevel,
    Hazard,
    Month,
    ParkingSpace,
    WaterTemperature,
    WaveType,
    WindDirection
} from "./SpotSubTypes";
import {Position} from "./Position";

export type Spot= {
    id: string;
    name: string;
    disciplines: Discipline[];
    waveTypes: WaveType[];
    beachTypes: BeachType[];
    experiencesLevel: ExperiencesLevel[];
    hazards: Hazard[];
    bestMonths: Month[];
    bestDirections: WindDirection[];
    waterTemperature: WaterTemperature[];
    parkingSpace: ParkingSpace;
    position: Position;
    restrooms: string;
    spotImage?: FileList;
    imageBase64Encoded?: string
}
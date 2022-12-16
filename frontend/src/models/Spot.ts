import {
    BeachType,
    Discipline,
    ExperiencesLevel,
    Hazard,
    WaterTemperature,
    WaveType,
    Month,
    WindDirection,
    ParkingSpace
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
}
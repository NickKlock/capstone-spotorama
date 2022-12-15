import {
    BeachType,
    BestDirection,
    BestMonth,
    Disciplines,
    ExperiencesLevel,
    Hazard,
    WaterTemperature,
    WaveType
} from "./SpotSubTypes";
import {Position} from "./Position";

export type Spot= {
    id:string
    name:string
    disciplines:Disciplines[]
    wavetypes:WaveType[]
    beachtypes:BeachType[]
    experiencesLevel:ExperiencesLevel[]
    hazards:Hazard[]
    bestMonths:BestMonth[]
    bestDirections:BestDirection[]
    waterTemperature: WaterTemperature[]
    parkingSpace: 0|1|2
    location:Position
}
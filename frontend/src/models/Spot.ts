import {Beachtypes, BestDirections, BestMonths, Disciplines, Experienceslevel, Hazards, Wavetypes} from "./Enmus";

export type Spot= {
    id:string
    name:string
    disciplines:Disciplines[]
    wavetypes:Wavetypes[]
    beachtypes:Beachtypes[]
    experiencesLevel:Experienceslevel[]
    hazards:Hazards[]
    bestMonths:BestMonths[]
    bestDirections:BestDirections[]
}
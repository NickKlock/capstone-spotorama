export type Position = {
    country: string;
    geo: Geo;
}

export type Geo = {
    type: "Point";
    coordinates: number[];
}
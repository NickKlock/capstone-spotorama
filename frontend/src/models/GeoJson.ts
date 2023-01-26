import {Geo} from "./Position";

export type GeoFeature = {
    type: "Feature";
    properties: GeoProperties;
    geometry: Geo;
}

export type GeoJSON = {
    type: "FeatureCollection";
    features: GeoFeature[];
}

export type GeoProperties = {
    name: string;
    id: string;
}
package com.github.nickklock.backend.models.geopostion;

public record GeoFeature(
        String type,
        GeoProperties properties,
        Geo geometry
) {
}

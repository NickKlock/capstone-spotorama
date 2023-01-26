package com.github.nickklock.backend.models.geopostion;

import java.util.List;

public record GeoJSON(
        String type,
        List<GeoFeature> features
) {
}

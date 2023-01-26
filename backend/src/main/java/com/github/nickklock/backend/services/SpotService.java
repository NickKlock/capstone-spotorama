package com.github.nickklock.backend.services;

import com.github.nickklock.backend.client.MapboxClient;
import com.github.nickklock.backend.exceptions.NoSuchSpotException;
import com.github.nickklock.backend.models.geopostion.*;
import com.github.nickklock.backend.models.mapbox.geocoding.CountryByCord;
import com.github.nickklock.backend.models.spot.Spot;
import com.github.nickklock.backend.models.spot.SpotMinimal;
import com.github.nickklock.backend.models.spot.SpotRequest;
import com.github.nickklock.backend.repos.SpotRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@Service
public class SpotService {

    private final SpotRepo spotRepo;
    private final IdService idService;
    private final MapboxClient mapboxClient;
    private final MapboxService mapboxService;
    private final ImageService imageService;

    public Spot add(SpotRequest newSpotRequest, MultipartFile file) throws IOException {
        SpotRequest spotRequestWithSpotImage;

        String spotImageBase64encoded = null;
        if (file != null) {
            spotRequestWithSpotImage = newSpotRequest.withSpotImage(file);
            spotImageBase64encoded = imageService.
                    encodeImageToBase64(spotRequestWithSpotImage.spotImage().getBytes());
        } else {
            spotRequestWithSpotImage = newSpotRequest;
        }

        Position positionFromRawData = createPositionFromRawData
                (newSpotRequest.position().geo().coordinates()[0], newSpotRequest.position().geo().coordinates()[1]);

            Spot spotWithId = new Spot(idService.generateId(),
                    spotRequestWithSpotImage.name(),
                    spotRequestWithSpotImage.disciplines(),
                    spotRequestWithSpotImage.waveTypes(),
                    spotRequestWithSpotImage.beachTypes(),
                    spotRequestWithSpotImage.experiencesLevel(),
                    spotRequestWithSpotImage.hazards(),
                    spotRequestWithSpotImage.bestMonths(),
                    spotRequestWithSpotImage.bestDirections(),
                    spotRequestWithSpotImage.waterTemperature(),
                    spotRequestWithSpotImage.parkingSpace(),
                    positionFromRawData,
                    spotRequestWithSpotImage.restrooms(),
                    spotImageBase64encoded);

        return spotRepo.save(spotWithId);
    }

    public List<SpotMinimal> list() {
        return spotRepo.findAll()
                .stream()
                .map(SpotMinimal::new)
                .toList();
    }

    public Spot getById(String id) {
        return spotRepo.findById(id).orElseThrow(NoSuchSpotException::new);
    }

    public CountryByCord getCountryByCords(double lng, double lat) {
        return mapboxClient.countryByCords(String.valueOf(lng), String.valueOf(lat), mapboxService.getToken());
    }

    public Position createPositionFromRawData(double lng, double lat) {
        return new Position(getCountryByCords(lng, lat).features().get(0).text(), new Geo("Point", new double[]{
                lng, lat
        }));
    }

    public List<SpotMinimal> getSpotsAroundCurrentPosition(double userLng, double userLat, double radiusInKilometer) {
        return spotRepo.findByLocationWithin(userLng, userLat, radiusInKilometer / 6371);
    }


    public GeoJSON getGeoJson() {
        List<GeoFeature> geoFeatures = spotRepo.findAll().stream().map(spot ->
                new GeoFeature("Feature",
                        new GeoProperties(
                                spot.name(),
                                spot.id()),
                        spot.position().geo())).toList();

        return new GeoJSON("FeatureCollection", geoFeatures);
    }
}

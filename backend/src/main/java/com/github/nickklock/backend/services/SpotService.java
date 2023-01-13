package com.github.nickklock.backend.services;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.nickklock.backend.client.MapboxClient;
import com.github.nickklock.backend.exceptions.NoSuchSpotException;
import com.github.nickklock.backend.models.Photo;
import com.github.nickklock.backend.models.Position;
import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.models.SpotRequest;
import com.github.nickklock.backend.models.geocoding.CountryByCord;
import com.github.nickklock.backend.repos.SpotRepo;
import org.bson.types.Binary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class SpotService {

    private final SpotRepo spotRepo;
    private final IdService idService;
    private final MapboxClient mapboxClient;
    private final MapboxService mapboxService;

    public SpotService(SpotRepo spotRepo, IdService idService, MapboxClient mapboxClient, MapboxService mapboxService) {
        this.spotRepo = spotRepo;
        this.idService = idService;
        this.mapboxClient = mapboxClient;
        this.mapboxService = mapboxService;
    }

    public Spot add(SpotRequest newSpot) throws IOException {
        Position positionFromRawData = createPositionFromRawData(newSpot.position().lng(), newSpot.position().lat());

        Photo photo = new Photo(newSpot.spotImage().getOriginalFilename(), new Binary(newSpot.spotImage().getBytes()));
        Spot spotWithId = new Spot(idService.generateId(), newSpot.name(), newSpot.disciplines(), newSpot.waveTypes(),
                newSpot.beachTypes(), newSpot.experiencesLevel(), newSpot.hazards(), newSpot.bestMonths(),
                newSpot.bestDirections(), newSpot.waterTemperature(),
                newSpot.parkingSpace(), positionFromRawData, newSpot.restrooms(), photo);

        return spotRepo.save(spotWithId);
    }

    public List<Spot> list() {
        return spotRepo.findAll();
    }

    public Spot getById(String id) {
        return spotRepo.findById(id).orElseThrow(NoSuchSpotException::new);
    }

    public CountryByCord getCountryByCords(double lng, double lat) {
        return mapboxClient.countryByCords(String.valueOf(lng), String.valueOf(lat), mapboxService.getToken());
    }

    public Position createPositionFromRawData(double lng, double lat) {
        return new Position(lng, lat, getCountryByCords(lng, lat).features().get(0).text());
    }

    public Spot add(String newSpotAsString, MultipartFile file) {
        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().featuresToEnable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS).build();
        try {
            SpotRequest newSpot = objectMapper.readValue(newSpotAsString, SpotRequest.class);
            SpotRequest spotRequestWithSpotImage = newSpot.withSpotImage(file);

            Photo photo = new Photo(spotRequestWithSpotImage.spotImage().getOriginalFilename(),
                    new Binary(spotRequestWithSpotImage.spotImage().getBytes()));
            Position positionFromRawData = createPositionFromRawData(newSpot.position().lng(), newSpot.position().lat());

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
                    photo);

            return spotRepo.save(spotWithId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

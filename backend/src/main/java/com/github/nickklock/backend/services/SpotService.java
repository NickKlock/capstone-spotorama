package com.github.nickklock.backend.services;

import com.github.nickklock.backend.client.MapboxClient;
import com.github.nickklock.backend.exceptions.NoSuchSpotException;
import com.github.nickklock.backend.models.Position;
import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.models.SpotRequest;
import com.github.nickklock.backend.models.geocoding.CountryByCord;
import com.github.nickklock.backend.repos.SpotRepo;
import org.springframework.stereotype.Service;

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

    public Spot add(SpotRequest newSpot) {

        Position positionFromRawData = createPositionFromRawData(newSpot.position().lng(), newSpot.position().lat());

        Spot spotWithId = new Spot(idService.generateId(), newSpot.name(), newSpot.disciplines(), newSpot.waveTypes(),
                newSpot.beachTypes(), newSpot.experiencesLevel(), newSpot.hazards(), newSpot.bestMonths(),
                newSpot.bestDirections(), newSpot.waterTemperature(),
                newSpot.parkingSpace(), positionFromRawData, newSpot.restrooms());

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
}

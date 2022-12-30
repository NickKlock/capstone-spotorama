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

    public SpotService(SpotRepo spotRepo, IdService idService, MapboxClient mapboxClient) {
        this.spotRepo = spotRepo;
        this.idService = idService;
        this.mapboxClient = mapboxClient;
    }


    public Spot add(SpotRequest newSpot) {
         CountryByCord countryByCords = mapboxClient.countryByCords(
                 String.valueOf(newSpot.position().lng()),
                 String.valueOf(newSpot.position().lat()),
                 System.getenv("Mapbox_Token"));

        Position position = new Position(newSpot.position().lng(),
                newSpot.position().lat(),
                countryByCords.features().get(0).text());

        Spot spotWithId = new Spot(idService.generateId(), newSpot.name(), newSpot.disciplines(), newSpot.waveTypes(),
                newSpot.beachTypes(), newSpot.experiencesLevel(), newSpot.hazards(), newSpot.bestMonths(),
                newSpot.bestDirections(), newSpot.waterTemperature(),
                newSpot.parkingSpace(), position, newSpot.restrooms());

        return spotRepo.save(spotWithId);
    }

    public List<Spot> list() {
        return spotRepo.findAll();
    }

    public Spot getById(String id) {
        return spotRepo.findById(id).orElseThrow(NoSuchSpotException::new);
    }
}

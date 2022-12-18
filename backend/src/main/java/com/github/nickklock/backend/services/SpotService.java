package com.github.nickklock.backend.services;

import com.github.nickklock.backend.exceptions.NoSuchSpotException;
import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.models.SpotRequest;
import com.github.nickklock.backend.repos.SpotRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpotService {

    private final SpotRepo spotRepo;
    private final IdService idService;

    public SpotService(SpotRepo spotRepo, IdService idService) {
        this.spotRepo = spotRepo;
        this.idService = idService;
    }

    public Spot add(SpotRequest newSpot) {
        Spot spotWithId = new Spot(idService.generateId(), newSpot.name(), newSpot.disciplines(), newSpot.waveTypes(),
                newSpot.beachTypes(), newSpot.experiencesLevel(), newSpot.hazards(), newSpot.bestMonths(),
                newSpot.bestDirections(), newSpot.waterTemperature(),
                newSpot.parkingSpace(), newSpot.position(), newSpot.restrooms());

        return spotRepo.save(spotWithId);
    }

    public List<Spot> list() {
        return spotRepo.findAll();
    }

    public Spot getById(String id) {
        return spotRepo.findById(id).orElseThrow(NoSuchSpotException::new);
    }
}

package com.github.nickklock.backend.services;

import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.repos.SpotRepo;
import org.springframework.stereotype.Service;

@Service
public class SpotService {

    private final SpotRepo spotRepo;
    private final IdService idService;

    public SpotService(SpotRepo spotRepo, IdService idService) {
        this.spotRepo = spotRepo;
        this.idService = idService;
    }

    public Spot add(Spot newSpot) {
        Spot spotWithId = new Spot(idService.generateId(), newSpot.name(), newSpot.disciplines(), newSpot.wavetypes(),
                newSpot.beachtypes(), newSpot.experiencesLevel(), newSpot.hazards(), newSpot.bestMonths(),
                newSpot.bestDirections(), newSpot.waterTemperature(),
                newSpot.parkingSpace(), newSpot.position());

        return spotRepo.save(spotWithId);
    }
}

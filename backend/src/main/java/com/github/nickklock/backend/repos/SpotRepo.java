package com.github.nickklock.backend.repos;

import com.github.nickklock.backend.models.spot.Spot;
import com.github.nickklock.backend.models.spot.SpotMinimal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpotRepo extends MongoRepository<Spot, String> {
    @Query("{'position.geo': {$geoWithin: { $centerSphere: [ [ ?0, ?1 ], ?2 ] } }}")
    List<SpotMinimal> findByLocationWithin(double longitude, double latitude, double radiusInKilometer);
}

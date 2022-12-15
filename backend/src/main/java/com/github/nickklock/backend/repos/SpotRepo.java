package com.github.nickklock.backend.repos;

import com.github.nickklock.backend.models.Spot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpotRepo extends MongoRepository<Spot,String> {
}

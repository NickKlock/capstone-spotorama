package com.github.nickklock.backend.repos;

import com.github.nickklock.backend.models.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
}

package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.services.SpotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/spots")
public class SpotController {

    private final SpotService spotService;

    public SpotController(SpotService spotService) {
        this.spotService = spotService;
    }

    @PostMapping
    public ResponseEntity<Spot> addSpot(@RequestBody Spot newSpot){
        return new ResponseEntity<>( spotService.add(newSpot), HttpStatus.CREATED);
    }
}

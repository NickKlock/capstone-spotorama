package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.models.SpotRequest;
import com.github.nickklock.backend.services.SpotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/spots")
public class SpotController {

    private final SpotService spotService;

    public SpotController(SpotService spotService) {
        this.spotService = spotService;
    }

    @PostMapping
    public ResponseEntity<Spot> addSpot(@RequestBody SpotRequest newSpot) {
        return new ResponseEntity<>(spotService.add(newSpot), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Spot>> listSpots() {
        return new ResponseEntity<>(spotService.list(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Spot> byId(@PathVariable String id) {
        return new ResponseEntity<>(spotService.getById(id), HttpStatus.OK);
    }
}

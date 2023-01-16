package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.services.SpotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/spots")
public class SpotController {

    private final SpotService spotService;

    public SpotController(SpotService spotService) {
        this.spotService = spotService;
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Spot> addSpot(
            @RequestPart("spot") String newSpot, @RequestPart(value = "file", required = false) MultipartFile file)
            throws IOException {
        return new ResponseEntity<>(spotService.add(newSpot, file), HttpStatus.CREATED);
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

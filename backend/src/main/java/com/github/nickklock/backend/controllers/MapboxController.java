package com.github.nickklock.backend.controllers;


import com.github.nickklock.backend.services.MapboxService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/mapbox")
public class MapboxController {

    private final MapboxService mapboxService;

    public MapboxController(MapboxService mapboxService) {
        this.mapboxService = mapboxService;
    }

    @GetMapping
    public String getToken(){
        return mapboxService.getToken();
    }
}

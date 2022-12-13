package com.github.nickklock.backend.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/mapbox")
public class MapboxController {
    private static final String accessToken =
            "pk.eyJ1Ijoibmlja2tsb2NrIiwiYSI6ImNraXEzZDhqNDFzaWEyeXBrbm5sOTd4OTAifQ.1qnQdThQElj-xFUOc85aPQ";

    @GetMapping
    public String getToken(){
        return accessToken;
    }
}

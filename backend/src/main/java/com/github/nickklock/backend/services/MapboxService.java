package com.github.nickklock.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MapboxService {
    @Value("${Mapbox_Token}" )
    private String token;

    public String getToken(){
        return token;
    }
}

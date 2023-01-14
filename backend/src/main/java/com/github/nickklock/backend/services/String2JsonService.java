package com.github.nickklock.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Service;

@Service
public class String2JsonService {
    private final ObjectMapper objectMapper = Jackson2ObjectMapperBuilder
            .json()
            .featuresToEnable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS)
            .build();

    public <T> T parseJsonToClass(String jsonString, Class<T> parseToClass) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, parseToClass);
    }
}

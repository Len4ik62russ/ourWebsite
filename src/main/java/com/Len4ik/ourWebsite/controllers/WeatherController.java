package com.Len4ik.ourWebsite.controllers;

import com.Len4ik.ourWebsite.service.impl.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/api/weather")
    public ResponseEntity<String> getWeather(@RequestParam String city) {
        String cityLondon = "London";
        if(city == null || city.isEmpty()) {
            return weatherService.getWeather(cityLondon);
        }
        return weatherService.getWeather(city);
    }
}
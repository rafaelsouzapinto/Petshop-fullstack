package com.backend.petshop.controllers.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.petshop.entities.enums.AnimalSex;

@RestController
@RequestMapping("/animal-sex")
public class AnimalSexController {
    @GetMapping
    public ResponseEntity<List<String>> getAllSexes() {
        List<String> sexes = Arrays.stream(AnimalSex.values())
                                      .map(Enum::name)
                                      .collect(Collectors.toList());
        return ResponseEntity.ok(sexes);
    }
}

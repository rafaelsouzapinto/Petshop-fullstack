package com.backend.petshop.controllers.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.petshop.entities.enums.ServiceStatus;

@RestController
@RequestMapping("/status")
public class ServiceStatusController {
    @GetMapping
    public ResponseEntity<List<String>> getAllStatuses() {
        List<String> statuses = Arrays.stream(ServiceStatus.values())
                                      .map(Enum::name)
                                      .collect(Collectors.toList());
        return ResponseEntity.ok(statuses);
    }
}

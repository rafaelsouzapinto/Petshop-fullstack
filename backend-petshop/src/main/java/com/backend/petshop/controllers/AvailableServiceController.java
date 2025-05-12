package com.backend.petshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.petshop.entities.AvailableService;
import com.backend.petshop.services.AvailableServiceService;

@RestController
@RequestMapping("/available-service")
public class AvailableServiceController {

	@Autowired
	private AvailableServiceService service;
	
	@GetMapping
	public ResponseEntity<List<AvailableService>> findAll() {
		List<AvailableService> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("{/id}")
	public ResponseEntity<AvailableService> findById(@PathVariable Long id) {
		AvailableService obj = service.findById(id);
		return ResponseEntity.ok(obj);
	}
	
	@PostMapping
	public ResponseEntity<AvailableService> insert(@RequestBody AvailableService availableService) {
		AvailableService obj = service.insert(availableService);
		return ResponseEntity.status(HttpStatus.CREATED).body(obj);
	}
	
	@PutMapping
	public ResponseEntity<AvailableService> update(@RequestBody AvailableService availableService, @PathVariable Long id) {
		AvailableService obj = service.update(availableService, id);
		return ResponseEntity.ok(obj);
	}
	
	@DeleteMapping("{/id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}

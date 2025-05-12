package com.backend.petshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.petshop.entities.Registration;
import com.backend.petshop.services.RegistrationService;

@RestController
@RequestMapping("/registration")
public class RegistrationController {

	@Autowired
	private RegistrationService service;
	
	@GetMapping
	public ResponseEntity<List<Registration>> findAll() {
		List<Registration> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("{/id}")
	public ResponseEntity<Registration> findById(@PathVariable Long id) {
		Registration obj = service.findById(id);
		return ResponseEntity.ok(obj);
	}
	
	@PostMapping
	public ResponseEntity<Registration> insert(@RequestBody Registration registration) {
		Registration obj = service.insert(registration);
		return ResponseEntity.status(HttpStatus.CREATED).body(obj);
	}
	
	@PutMapping("{/id}")
	public ResponseEntity<Registration> update (@RequestBody Registration registration, @PathVariable Long id) {
		Registration obj = service.update(registration, id);
		return ResponseEntity.ok(obj);
	}
}

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

import com.backend.petshop.entities.Pet;
import com.backend.petshop.services.PetService;

@RestController
@RequestMapping("/pets")
public class PetController {
	
	@Autowired
	private PetService service;
	
	
	@GetMapping
	public ResponseEntity<List<Pet>> findAll() {
		List<Pet> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Pet> findById(@PathVariable Long id) {
		Pet pet = service.findById(id);
		return ResponseEntity.ok(pet);
	}
	
	@PostMapping
	public ResponseEntity<Pet> insert(@RequestBody Pet pet) {
		Pet obj = service.insert(pet);
		return ResponseEntity.status(HttpStatus.CREATED).body(obj);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Pet> update(@RequestBody Pet pet, @PathVariable Long id) {
		Pet obj = service.update(pet, id);
		return ResponseEntity.ok(obj);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}

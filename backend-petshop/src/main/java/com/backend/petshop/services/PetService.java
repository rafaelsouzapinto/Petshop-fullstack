package com.backend.petshop.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.backend.petshop.entities.Pet;
import com.backend.petshop.repositories.PetRepository;
import com.backend.petshop.services.exceptions.DataBaseException;
import com.backend.petshop.services.exceptions.ResourceNotFoundException;

@Service
public class PetService {

	@Autowired
	private PetRepository repository;
	
	public List<Pet> findAll() {
		List<Pet> list = repository.findAll();
		return list;	
	}
	public Pet findById(Long id) {
		Optional<Pet> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	public Pet insert(Pet pet) {
		return repository.save(pet);
	}
	public Pet update(Pet pet, Long id) {
		try {
			if(!repository.existsById(id)) throw new ResourceNotFoundException(id);
			
			Pet obj = findById(id);
			obj.setName(pet.getName());
			obj.setBreed(pet.getBreed());
			obj.setMonths(pet.getMonths());
			obj.setType(pet.getType());
			obj.setWeight(pet.getWeight());
			obj.setClient(pet.getClient());
			return repository.save(obj);
			
		} catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}

	}
	
	public void delete(Long id) {
		try {
			if (!repository.existsById(id)) throw new ResourceNotFoundException(id);
			repository.deleteById(id);
		} catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException(id);
	    } catch (DataIntegrityViolationException e) {
	    	throw new DataBaseException(e.getMessage());
	    }
	}
}

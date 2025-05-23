package com.backend.petshop.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.backend.petshop.entities.AvailableService;
import com.backend.petshop.repositories.AvailableServiceRepository;
import com.backend.petshop.services.exceptions.ResourceNotFoundException;

@Service
public class AvailableServiceService {

	@Autowired
	private AvailableServiceRepository repository;
	
	public List<AvailableService> findAll() {
		return repository.findAll();
	}
	
	public AvailableService findById(Long id) {
		Optional<AvailableService> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public AvailableService insert(AvailableService availableService) {
		return repository.save(availableService);
	}
	
	public AvailableService update(AvailableService availableService, Long id) {
		try {
			if (!repository.existsById(id)) throw new ResourceNotFoundException(id);
			
			AvailableService obj = findById(id);
			
			obj.setCategory(availableService.getCategory());
			obj.setIsAvailable(availableService.getIsAvailable());
			obj.setBasePrice(availableService.getBasePrice());
			obj.setServiceImage(availableService.getServiceImage());
			
			return repository.save(obj);
			
		} catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}
	
	public void delete(Long id) {
		try {
			if(!repository.existsById(id)) throw new ResourceNotFoundException(id);
			repository.deleteById(id);
		} catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException(e.getMessage());
		}
	}
}

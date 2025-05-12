package com.backend.petshop.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.petshop.entities.Registration;
import com.backend.petshop.repositories.RegistrationRepository;
import com.backend.petshop.services.exceptions.ResourceNotFoundException;

@Service
public class RegistrationService {

	private RegistrationRepository repository;
	
	public List<Registration> findAll() {
		return repository.findAll();
	}
	
	public Registration findById(Long id) {
		Optional<Registration> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public Registration insert (Registration registration) {
		return repository.save(registration);
	}
	
	public Registration update (Registration registration, Long id) {
		try {
			if(!repository.existsById(id)) throw new ResourceNotFoundException(id);
			Registration obj = findById(id);
			obj.setFinalPrice(registration.getFinalPrice());
			obj.setMoment(registration.getMoment());
			obj.setServiceStatus(registration.getServiceStatus());
			obj.setPet(registration.getPet());
			obj.setService(registration.getService());
			
			return repository.save(obj);
		} catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}
}

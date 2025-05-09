package com.backend.petshop.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.backend.petshop.entities.Client;
import com.backend.petshop.repositories.ClientRepository;
import com.backend.petshop.services.exceptions.DataBaseException;
import com.backend.petshop.services.exceptions.ResourceNotFoundException;

@Service
public class ClientService {

	@Autowired
	private ClientRepository repository;
	
	public List<Client> findAll() {
		return repository.findAll();
	}
	
	public Client findById(Long id) {
		Optional<Client> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public Client insert(Client client) {
		return repository.save(client);
	}
	
	public Client update(Client client, Long id) {
		try {
			if(!repository.existsById(id)) throw new ResourceNotFoundException(id);
			
			Client obj = findById(id);
			obj.setName(client.getName());
			obj.setCpf(client.getCpf());
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

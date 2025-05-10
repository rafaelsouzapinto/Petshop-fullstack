package com.backend.petshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.petshop.entities.Pet;

public interface PetRepository extends JpaRepository<Pet, Long>{

}

package com.backend.petshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.petshop.entities.Registration;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long>{
}

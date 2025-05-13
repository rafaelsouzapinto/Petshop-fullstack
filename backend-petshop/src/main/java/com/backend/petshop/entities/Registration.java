package com.backend.petshop.entities;

import java.time.Instant;
import java.util.Objects;

import com.backend.petshop.entities.enums.ServiceStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_registration")
public class Registration {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Double finalPrice;
	private Instant moment;
    @Enumerated(EnumType.STRING)
    private ServiceStatus serviceStatus;
	
    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private AvailableService service;
    
	public Registration() {}
	
	public Registration(Long id, Double finalPrice, Instant moment, ServiceStatus serviceStatus, Pet pet,
			AvailableService service) {
		this.id = id;
		this.finalPrice = finalPrice;
		this.moment = moment;
		this.serviceStatus = serviceStatus;
		this.pet = pet;
		this.service = service;
	}
	
	@PrePersist
    public void prePersist() {
        this.moment = Instant.now();
    }

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Double getFinalPrice() {
		return finalPrice;
	}
	public void setFinalPrice(Double finalPrice) {
		this.finalPrice = finalPrice;
	}
	public Instant getMoment() {
		return moment;
	}
	public void setMoment(Instant moment) {
		this.moment = moment;
	}
	public ServiceStatus getServiceStatus() {
		return serviceStatus;
	}
	public void setServiceStatus(ServiceStatus serviceStatus) {
		this.serviceStatus = serviceStatus;
	}
	public Pet getPet() {
		return pet;
	}
	public void setPet(Pet pet) {
		this.pet = pet;
	}
	public AvailableService getService() {
		return service;
	}
	public void setService(AvailableService service) {
		this.service = service;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Registration other = (Registration) obj;
		return Objects.equals(id, other.id);
	}
	
	@Override
	public String toString() {
		return "Registration [id=" + id + ", finalPrice=" + finalPrice + ", moment=" + moment + "]";
	}
}

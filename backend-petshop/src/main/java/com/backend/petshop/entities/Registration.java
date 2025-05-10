package com.backend.petshop.entities;

import java.time.Instant;
import java.util.Objects;

import com.backend.petshop.entities.enums.ServiceStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_registration")
public class Registration {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Double finalPrice;
	private Instant moment;
	private ServiceStatus serviceStatus;
	
	public Registration() {
	}
	public Registration(Long id, Double finalPrice, Instant moment, ServiceStatus serviceStatus) {
		this.id = id;
		this.finalPrice = finalPrice;
		this.moment = moment;
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

package com.backend.petshop.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_available_service")
public class AvailableService {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String category;
	private Boolean isAvailable;
	private Double basePrice;
	
	@OneToMany(mappedBy = "service")
	private List<Registration> registrations = new ArrayList<>();
	
	public AvailableService() {
	}
	public AvailableService(Long id, String category, Boolean isAvailable, Double basePrice) {
		this.id = id;
		this.category = category;
		this.isAvailable = isAvailable;
		this.basePrice = basePrice;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Boolean getIsAvailable() {
		return isAvailable;
	}
	public void setIsAvailable(Boolean isAvailable) {
		this.isAvailable = isAvailable;
	}
	public Double getBasePrice() {
		return basePrice;
	}
	public void setBasePrice(Double basePrice) {
		this.basePrice = basePrice;
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
		AvailableService other = (AvailableService) obj;
		return Objects.equals(id, other.id);
	}
	
	@Override
	public String toString() {
		return "AvailableService [id=" + id + ", category=" + category + ", isAvailable=" + isAvailable + ", basePrice="
				+ basePrice + "]";
	}
}

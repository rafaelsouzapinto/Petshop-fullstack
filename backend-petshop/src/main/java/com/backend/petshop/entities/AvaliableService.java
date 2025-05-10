package com.backend.petshop.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_avaliable_service")
public class AvaliableService {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String category;
	private Boolean isAvaliable;
	private Double basePrice;
	
	public AvaliableService() {
	}
	public AvaliableService(Long id, String category, Boolean isAvaliable, Double basePrice) {
		this.id = id;
		this.category = category;
		this.isAvaliable = isAvaliable;
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
	public Boolean getIsAvaliable() {
		return isAvaliable;
	}
	public void setIsAvaliable(Boolean isAvaliable) {
		this.isAvaliable = isAvaliable;
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
		AvaliableService other = (AvaliableService) obj;
		return Objects.equals(id, other.id);
	}
	
	@Override
	public String toString() {
		return "AvaliableService [id=" + id + ", category=" + category + ", isAvaliable=" + isAvaliable + ", basePrice="
				+ basePrice + "]";
	}
}

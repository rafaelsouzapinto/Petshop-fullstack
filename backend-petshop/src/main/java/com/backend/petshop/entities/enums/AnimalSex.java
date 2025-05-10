package com.backend.petshop.entities.enums;

public enum AnimalSex {
	MALE(1), 
	FEMALE(2);
		
	private int code;
	
	private AnimalSex(int code) {
		this.code = code;
	} 
	
	public int getCode() {
		return code;
	}
	
	public static AnimalSex valueOf(int code) {
		for (AnimalSex value : AnimalSex.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Invalid OrderStatus code");
	}
}

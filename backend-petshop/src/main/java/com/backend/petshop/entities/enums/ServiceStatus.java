package com.backend.petshop.entities.enums;

public enum ServiceStatus {
	PENDING(1), 
	IN_PROGRESS(2),
	COMPLETED(3),
	CANCELLED(4);
		
	private int code;
	
	private ServiceStatus(int code) {
		this.code = code;
	} 
	
	public int getCode() {
		return code;
	}
	
	public static ServiceStatus valueOf(int code) {
		for (ServiceStatus value : ServiceStatus.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Invalid OrderStatus code");
	}
}

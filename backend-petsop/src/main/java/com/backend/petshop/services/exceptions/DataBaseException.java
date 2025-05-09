package com.backend.petshop.services.exceptions;

public class DataBaseException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public DataBaseException(Object id) {
		super("This object has connection with other data. ID " + id);
	}

}

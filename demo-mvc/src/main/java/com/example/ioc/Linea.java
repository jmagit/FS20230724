package com.example.ioc;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Linea {
	//@Autowired
	private Punto punto1;
	//@Autowired
	private Punto punto2;

	public Linea(Punto punto1, Punto punto2) {
		this.punto1 = punto1;
		this.punto2 = punto2;
		punto1.setX(4);
	}
	
//	@PostConstruct
//	private void inicializa() {
//		punto1.setX(4);
//		
//	}
}

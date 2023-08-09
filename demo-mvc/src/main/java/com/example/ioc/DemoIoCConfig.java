package com.example.ioc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class DemoIoCConfig {
	@Bean
	@Scope("prototype") 
	public Punto punto() {
		return new Punto3D();
	}
	
//	@Autowired
//	public Linea linea(Punto punto1, Punto punto2) {
//		return new Linea(punto1, punto2);
//		
//	}
}

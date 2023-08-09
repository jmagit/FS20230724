package com.example.ioc;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import lombok.Data;

//@Component
//@Qualifier("2D")
//@Scope("prototype") 
@Data
public class PuntoImpl implements Punto {
	private int x = 1, y = 2;

}

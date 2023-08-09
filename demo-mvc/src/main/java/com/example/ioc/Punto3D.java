package com.example.ioc;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import lombok.Data;

//@Component
//@Qualifier("3D")
@Data
public class Punto3D implements Punto {
	private int x = 1, y = 2, z = 3;

}

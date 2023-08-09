package com.example;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.example.dtos.CityDTO;
import com.example.ioc.Linea;
import com.example.ioc.Punto;
import com.example.model.Address;
import com.example.model.City;
import com.example.repositories.CityRepository;

@SpringBootApplication
public class DemoMvcApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(DemoMvcApplication.class, args);
	}

//	@Autowired
////	@Qualifier("2D")
//	private Punto punto;
//	@Autowired
////	@Qualifier("3D")
//	private Punto punto2;
//	
//	@Autowired
//	Linea linea;
//	
//	@Value("${spring.datasource.username}") 
//	private String name;
//
//	@Autowired
//	private CityRepository dao;
	
	@Override
	@Transactional
	public void run(String... args) throws Exception {
//		System.out.println("HOLA MUNDOooooo");
//		System.out.println(punto.toString());
//		punto.setX(11);
//		System.out.println(punto2.toString());
//		System.out.println(name);
//		for (City item : dao.findAll()) {
//			//System.out.println(item.getCity() + " (" + item.getCountry().getCountry() + ")");
//			CityDTO dto = CityDTO.form(item);
//			System.out.println(dto.getCity() + " (" + dto.getCountryId() + ")");
//			
////			for(Address dir: item.getAddresses())
////				System.out.println("\t" + dir.getAddress());
//		}
//		for (CityDTO dto : dao.findByCityIdLessThanOrderByCityDesc(44)
//				.stream().map(ele -> CityDTO.form(ele)).collect(Collectors.toList())) {
//			System.out.println(dto.getCityId() + "-" + dto.getCity() + " (" + dto.getCountryId() + ")");
//		}
	}

}

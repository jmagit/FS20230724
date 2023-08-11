package com.example.domains.contracts.repositories;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Timestamp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;

import com.example.domains.entities.Actor;

@DataJpaTest
class ActorRepositoryMemoryTest {
	@MockBean
	SecurityFilterChain filterChain;
	@MockBean
	RestTemplate restTemplate;
	@MockBean
	RestTemplateBuilder builder;
	@MockBean
	LoadBalancedExchangeFilterFunction filterFunction;

	@Autowired
	private TestEntityManager em;

	@Autowired
	ActorRepository dao;

	@BeforeEach
	void setUp() throws Exception {
		var item = new Actor(0, "Pepito", "GRILLO");
		item.setLastUpdate(Timestamp.valueOf("2019-01-01 00:00:00"));
		em.persist(item);
		item = new Actor(0, "Carmelo", "COTON");
		item.setLastUpdate(Timestamp.valueOf("2019-01-01 00:00:00"));
		em.persist(item);
		item = new Actor(0, "Capitan", "TAN");
		item.setLastUpdate(Timestamp.valueOf("2019-01-01 00:00:00"));
		em.persist(item);
	}

	@Test
	void testAll() {
		assertEquals(3, dao.findAll().size());
		assertEquals(1, dao.findAll().get(0).getActorId());
	}
	@Test
	void testOne() {
		var item = dao.findById(4);
		
		assertTrue(item.isPresent());
		assertEquals("Pepito", item.get().getFirstName());
	}
	@Test
	void testSave() {
		var item = dao.save(new Actor(0, "Demo", "GUARDAR"));
		
		assertNotNull(item);
		assertEquals(10, item.getActorId());
	}

}

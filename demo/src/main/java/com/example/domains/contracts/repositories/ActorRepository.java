package com.example.domains.contracts.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.domains.core.contracts.repositories.RepositoryWithProjections;
import com.example.domains.entities.Actor;
import com.example.domains.entities.dtos.ActorDTO;
import com.example.domains.entities.dtos.ActorShort;


@RepositoryRestResource(exported = false)
public interface ActorRepository extends JpaRepository<Actor, Integer>, JpaSpecificationExecutor<Actor>, RepositoryWithProjections {
	List<Actor> findTop5ByFirstNameIgnoreCaseStartingWithOrderByLastNameDesc(String prefijo);
	List<Actor> findByActorIdBetween(int inicio, int fin, Sort orderBy);
	
	@Query(value = "FROM Actor a WHERE a.actorId < ?1")
	List<Actor> findByJPQL(int id);
	@Query(value = "SELECT * FROM actor WHERE actor_id < :id", nativeQuery = true)
	List<Actor> findBySQL(@Param("id") int id);
	
	List<ActorDTO> readByActorIdBetween(int inicio, int fin, Sort orderBy);
	List<ActorShort> queryByActorIdBetween(int inicio, int fin, Sort orderBy);
	
//	<T> List<T> findAllBy(Class<T> tipo);
}

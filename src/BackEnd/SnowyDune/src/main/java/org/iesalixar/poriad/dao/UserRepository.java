package org.iesalixar.poriad.dao;

import org.iesalixar.poriad.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
@CrossOrigin("http:/localhost:8081")
public interface UserRepository extends JpaRepository<User, Long>{

}
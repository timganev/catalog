package com.product.catalog.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findFirstByUsername(String username);
    Optional<User> findByUsername(String userId);
//    Page<User> findAllByUsername(String username, Pageable page);

}


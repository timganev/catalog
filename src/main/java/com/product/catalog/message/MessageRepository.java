package com.product.catalog.message;

import com.product.catalog.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface MessageRepository extends JpaRepository<Message, Long> {

  List<Message> findAllByReceiver(Optional<User> receiver);
  List<Message> findAllBySender(Optional<User> sender);
}

package com.product.catalog.message;

import com.product.catalog.config.ApplicationNotFoundException;
import com.product.catalog.product.Product;
import com.product.catalog.user.User;
import com.product.catalog.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/messages")
public class MassageController {

  @Autowired
  private MessageRepository repository;

  @Autowired
  private UserRepository userRepository;


    @Secured("ROLE_ADMIN")
    @GetMapping
  public List<Message> findAll() {
    List<Message> list = new ArrayList<>();
    repository.findAll().iterator().forEachRemaining(list::add);
    return list;
  }

  @PreAuthorize("#username == authentication.principal.username")
  @GetMapping("/receiver/{username}")
  public List<Message> findAllByReceiver(@PathVariable("username") String username) {
    Optional<User> user = userRepository.findByUsername(username);
    List<Message> list = new ArrayList<>();

    repository.findAllByReceiver(user).iterator().forEachRemaining(list::add);

    return list;
  }

  @PreAuthorize("#username == authentication.principal.username")
  @GetMapping("/sender/{username}")
  public List<Message> findAllBySender(@PathVariable("username") String username) {
    Optional<User> user = userRepository.findByUsername(username);
    List<Message> list = new ArrayList<>();

    repository.findAllBySender(user).iterator().forEachRemaining(list::add);

    return list;
  }


  @GetMapping("/{id}")
  public ResponseEntity<Message> findById(@PathVariable("id") long id) {
    Optional<Message> findById = repository.findById(id);
    try {
      return new ResponseEntity<Message>(findById.get(), HttpStatus.OK);
    } catch (ApplicationNotFoundException exception) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "You are at the edge of the Great Void");
    }
  }

}

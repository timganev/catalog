package com.product.catalog.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  public UserController() {

  }

  @RequestMapping("/")
  public String home() {
    return "Reporting for duty!";
  }

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping(value = "/users")
  public ResponseEntity<List<User>> listUser() {
    if (userService.findAll().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          "Users not found");
    }
    return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
  }

  @PostMapping(value = "/signup")
  public ResponseEntity<User> saveUser(@RequestBody UserDto user) {

    Optional<User> optionalEntity = userRepository
        .findByUsername(user.getUsername());

    if (optionalEntity.isPresent()) {
      return ResponseEntity.badRequest().build();


    } else {

      return ResponseEntity.ok(userService.save(user));
    }
  }


}
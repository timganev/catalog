package com.product.catalog.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    private UserService userService;

    @RequestMapping("/")
    public String home() {
        return "Reporting for duty!";
    }

    @Autowired
    public UserController() {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value="/users")
    public ResponseEntity<List<User>> listUser(){
        if (userService.findAll().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Users not found");
        }
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @PostMapping(value="/signup")
    public User saveUser(@RequestBody UserDto user){
        return userService.save(user);
    }

}
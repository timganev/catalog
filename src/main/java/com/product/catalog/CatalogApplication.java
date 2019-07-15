package com.product.catalog;

import com.product.catalog.user.User;
import com.product.catalog.user.UserDto;
import com.product.catalog.user.UserRepository;
import com.product.catalog.user.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CatalogApplication {
    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {


        SpringApplication.run(CatalogApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {



//            userRepository.save(new User("user", "$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi", "USER"));
//            userRepository.save(new User("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN"));
        };
    }

}

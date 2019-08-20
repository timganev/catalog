package com.product.catalog;

import com.product.catalog.product.Product;
import com.product.catalog.product.ProductRepository;
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
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private ProductRepository productRepository;

    public static void main(String[] args) {
        SpringApplication.run(CatalogApplication.class, args);
        System.out.println("Hello from Tim");
    }

    @Bean
    CommandLineRunner runner(UserRepository userRepository, ProductRepository productRepository) {
        return args -> {

//            productRepository.save(new Product("xWing", "description 1", "no image", "", 11));
//            productRepository.save(new Product("Interceptor", "description 2", "no image", "", 33));
//            userRepository.save(new User("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN"));
//            userRepository.save(new User("user", "$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi", "USER"));

        };
    }

}

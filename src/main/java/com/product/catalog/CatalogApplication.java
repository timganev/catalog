package com.product.catalog;

import com.product.catalog.product.Product;
import com.product.catalog.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CatalogApplication {

    public static void main(String[] args) {
        SpringApplication.run(CatalogApplication.class, args);
        System.out.println("Hello from catalog");
    }

    @Bean
    CommandLineRunner runner(ProductRepository productRepository) {
        return args -> {
            productRepository.save(new Product(1,"Interceptor", "description 2", "no image", "", 33));
            productRepository.save(new Product(2,"Xwing", "description 1", "no image", "", 40));
        };
    }

}

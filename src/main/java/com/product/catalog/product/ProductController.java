package com.product.catalog.product;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductRepository repository;


    @GetMapping
    public Iterable<Product> getProducts() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody Product product) {
        repository.save(product);
    }

    @GetMapping("/{id}")
    public Product findOne(@PathVariable("id") long id) {
        return repository.getOne(id);
    }


}

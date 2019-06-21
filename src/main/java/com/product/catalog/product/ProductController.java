package com.product.catalog.product;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
	@Autowired
	private ProductRepository repository;
	
	@RequestMapping("/products")
	public Iterable<Product> getProducts() {
		return repository.findAll();
	}
}

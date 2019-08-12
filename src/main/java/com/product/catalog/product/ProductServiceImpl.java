package com.product.catalog.product;

import com.product.catalog.config.ApplicationNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;


    @Override
    public Product findById(long id) {
        Optional<Product> findById = productRepository.findById(id);

        if (findById.isPresent())
            return findById.get();
        else
            throw new ApplicationNotFoundException("Product Not Found");
    }

}

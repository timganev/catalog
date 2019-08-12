package com.product.catalog.userTests;

import com.product.catalog.product.Product;
import com.product.catalog.product.ProductController;
import com.product.catalog.product.ProductRepository;
import com.product.catalog.product.ProductService;
import com.product.catalog.user.UserController;
import com.product.catalog.user.UserService;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

import static org.junit.Assert.assertEquals;

public class ControllerUnitTest {

    @Test
    public void testUserControllerHome() {
        UserController userController = new UserController();
        String result = userController.home();
        assertEquals(result, "Reporting for duty!");
    }

    @InjectMocks
    private ProductController productController;

    @Mock
    private ProductRepository repository;

    @Mock
    private ProductService productService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }



    @Test
    public void testProductController() {
        Product mockProduct = new Product("xWing", "description 1", "no image", "", 11);
        Product mockProduct2 = new Product("Interceptor", "description 2", "no image", "", 33);

        mockProduct.setId(1L);
        mockProduct2.setId(2L);
        when(productService.findById(1L)).thenReturn(mockProduct);

        ResponseEntity<Product> product = productController.findById(1L);
        verify(productService).findById(1L);

        // response code
        assertEquals(true, product.getStatusCode().is2xxSuccessful());
        assertEquals(200, product.getStatusCode().value());

        // validate the returned fields
        assertEquals(1L, product.getBody().getId());
        assertEquals("xWing", product.getBody().getName());
        assertEquals("description 1", product.getBody().getDescription());
        assertEquals("no image", product.getBody().getImage());

    }


}

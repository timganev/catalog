package com.product.catalog.product;

        import org.springframework.data.repository.CrudRepository;
        import org.springframework.data.repository.query.Param;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;

        import java.util.List;

@RepositoryRestResource
public interface ProductRepository extends CrudRepository<Product, Long> {

}

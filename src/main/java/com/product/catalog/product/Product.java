package com.product.catalog.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private long id;
	private String name, description, image, username;
	private double price;



	public Product() {}

	public Product( String name, String description, String image, String username, double price) {
		super();
		this.name = name;
		this.description = description;
		this.image = image;
		this.username = username;
		this.price = price;
	}

}

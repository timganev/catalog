package com.product.catalog;

import com.product.catalog.message.Message;
import com.product.catalog.message.MessageRepository;
import com.product.catalog.product.Product;
import com.product.catalog.product.ProductRepository;
import com.product.catalog.user.User;
import com.product.catalog.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@EnableGlobalMethodSecurity(
    prePostEnabled = true,
    securedEnabled = true,
    jsr250Enabled = true)

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
  CommandLineRunner runner(UserRepository userRepository, ProductRepository productRepository, MessageRepository messageRepository) {
    return args -> {

      String xwingDescription = "Designed and manufactured by the Incom Corporation, they were "
          + "designed to fit in between the Z-95 and the larger ARC-170, and are primarily "
          + "depicted as the primary space superiority, light escort and reconnaissance craft of "
          + "the Rebel Alliance";
      String interceptorDescription = "An interceptor was a starfighter classification typically "
          + "applied to starships that sacrificed heavy ordnance payloads, armor, deflector "
          + "shields, and/or a hyperdrive in favor of pure speed and agility in combat.";
      String interceptorImg = "https://vignette.wikia.nocookie"
          + ".net/starwars/images/f/f5/TIE_Interceptor_BF"
          + ".png/revision/latest/scale-to-width-down/2000?cb=20170501054325";
      String xWingImg = "https://vignette.wikia.nocookie.net/starwars/images/6/60/Xwing-SWB"
          + ".jpg/revision/latest/scale-to-width-down/2000?cb=20160704070524";

      productRepository.save(new Product("xWing", xwingDescription, xWingImg, "admin", 11));
      productRepository.save(new Product("Interceptor", interceptorDescription, interceptorImg, "user", 33));
      userRepository.save(new User("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN", true));
      userRepository.save(new User("user", "$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi", "USER", true));
      messageRepository.save(new Message("First send", "Body of the Message", userRepository.getOne(1), userRepository.getOne(2), false));
      messageRepository.save(new Message("First recive", "Body of the Message", userRepository.getOne(2), userRepository.getOne(1), false));
    };
  }

}

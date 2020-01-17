package com.product.catalog.message;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.product.catalog.user.User;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Message {

  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private long id;
  private String name, body;

  @ManyToOne
  @JoinColumn(name = "sender_id")
  @JsonIgnoreProperties({ "password", "role", "id", "active" })
  private User sender;

  @ManyToOne
  @JoinColumn(name = "receiver_id")
  @JsonIgnoreProperties({ "password", "role", "id", "active" })
  private User receiver;

  private Boolean open;

  public Message() {
  }

  public Message(String name, String body, User sender, User receiver, Boolean open) {
    super();
    this.name = name;
    this.body = body;
    this.sender = sender;
    this.receiver = receiver;
    this.open=open;
  }

}

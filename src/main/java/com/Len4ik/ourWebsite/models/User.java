package com.Len4ik.ourWebsite.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue//(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

}

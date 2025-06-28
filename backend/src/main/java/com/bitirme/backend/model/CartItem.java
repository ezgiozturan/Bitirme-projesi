package com.bitirme.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private double price;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public CartItem() {}

    public CartItem(String productName, double price, User user) {
        this.productName = productName;
        this.price = price;
        this.user = user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Getters & Setters
}

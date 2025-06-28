package com.bitirme.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;

    private String name;
    private String image;
    private double price;
    @Column(length = 1000)
    private String description;

    public Product() {}

    public Product(String name, String image, double price, String category) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.category = category;
    }


    // Getter-Setter
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getImage() { return image; }
    public double getPrice() { return price; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setImage(String image) { this.image = image; }


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPrice(double price) { this.price = price; }


}

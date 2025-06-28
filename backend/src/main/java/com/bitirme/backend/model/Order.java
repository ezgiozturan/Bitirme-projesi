package com.bitirme.backend.model;


import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String address;
    private String phone;

    @Column(length = 2000)
    private String itemsJson; // Ürünler JSON formatında string olarak saklanır

    public Order() {}

    public Order( String address, String phone, String itemsJson) {

        this.address = address;
        this.phone = phone;
        this.itemsJson = itemsJson;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getItemsJson() {
        return itemsJson;
    }

    public void setItemsJson(String itemsJson) {
        this.itemsJson = itemsJson;
    }
}

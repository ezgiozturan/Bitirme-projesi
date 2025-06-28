package com.bitirme.backend.controller;

import com.bitirme.backend.model.Product;
import com.bitirme.backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/id/{id}") // <--- BURAYA DİKKAT
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/import")
    public ResponseEntity<String> importProducts(@RequestBody List<Product> products) {
        try {
            productRepository.saveAll(products);
            return ResponseEntity.ok("Ürünler başarıyla yüklendi.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Hata oluştu: " + e.getMessage());
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearProducts() {
        productRepository.deleteAll();
        return ResponseEntity.ok("Tüm ürünler silindi.");
    }


    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Kategori boş olamaz.");
        }
        return productRepository.findByCategoryIgnoreCase(category);
    }


    @GetMapping("/test")
    public String testCategory() {
        List<Product> list = productRepository.findByCategoryIgnoreCase("Kadın");
        return "Bulunan ürün sayısı: " + list.size();
    }


}

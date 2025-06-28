
package com.bitirme.backend.controller;

import com.bitirme.backend.model.Order;
import com.bitirme.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        try {
            orderRepository.save(order);
            return ResponseEntity.ok("Sipariş başarıyla kaydedildi.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Sipariş kaydedilirken hata oluştu.");
        }
    }
}

package com.bitirme.backend.controller;

import com.bitirme.backend.model.CartItem;
import com.bitirme.backend.model.User;
import com.bitirme.backend.repository.CartItemRepository;
import com.bitirme.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/{email}")
    public String saveCart(@PathVariable String email, @RequestBody List<CartItem> items) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        cartRepo.deleteByUser(user); // Önceki sepeti temizle
        for (CartItem item : items) {
            item.setUser(user);
            cartRepo.save(item);
        }
        return "Cart saved for user: " + email;
    }

    @GetMapping("/{email}")
    public List<CartItem> getCart(@PathVariable String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepo.findByUser(user);
    }
}

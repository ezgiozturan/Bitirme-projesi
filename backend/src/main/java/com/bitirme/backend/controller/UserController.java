package com.bitirme.backend.controller;

import com.bitirme.backend.dto.LoginRequest;
import com.bitirme.backend.exception.UserNotFoundException;
import com.bitirme.backend.model.User;
import com.bitirme.backend.repository.UserRepository;
import com.bitirme.backend.service.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Zaten üyesiniz. Giriş yapınız.");
        }

        User savedUser = userService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> optionalUser = userService.findByEmail(loginRequest.getEmail());

        // DEBUG: Backend'e gelen bilgileri konsola yaz
        System.out.println("GELEN EMAIL: " + loginRequest.getEmail());
        System.out.println("GELEN ŞİFRE: " + loginRequest.getPassword());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Mail adresiniz/şifreniz yanlıştır.");
        }

        User user = optionalUser.get();

        // DEBUG: Veritabanındaki şifreyi yaz
        System.out.println("Veritabanındaki şifre: " + user.getPassword());
        System.out.println("Kullanıcının girdiği şifre: " + loginRequest.getPassword());
        if (!user.getPassword().trim().equals(loginRequest.getPassword().trim())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Mail adresiniz/şifreniz yanlıştır.");
        }

        return ResponseEntity.ok(user);
    }



    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDuplicateEmail(DataIntegrityViolationException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", "Zaten üyesiniz. Giriş yapınız."));
    }


}

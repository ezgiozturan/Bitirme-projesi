package com.bitirme.backend.service;

import com.bitirme.backend.model.User;
import com.bitirme.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.bitirme.backend.exception.UserNotFoundException;

import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User register(User user) {
        return userRepository.save(user);
    }


    /*
        public User register (User user){
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Zaten üyesiniz. Giriş yapınız.");
        }
        return userRepository.save(user);
    }
    }
    */


}


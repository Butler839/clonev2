package com.clonev2.clonev2.service;

import com.clonev2.clonev2.model.User;
import com.clonev2.clonev2.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public Optional<User> getByUsername(String username) {
        return repo.findByUsername(username);
    }

    public User createUser(User user) {
        return repo.save(user);
    }
}

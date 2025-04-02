package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.User;
import com.clonev2.clonev2.service.UserService;

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

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/{username}")
    public Optional<User> getByUsername(@PathVariable String username) {
        return service.getByUsername(username);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return service.createUser(user);
    }

    // ✅ Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<User> userOpt = service.getByUsername(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PatchMapping("/{username}")
    public ResponseEntity<?> updateDisplayName(@PathVariable String username, @RequestBody Map<String, String> body) {
        Optional<User> userOpt = service.getByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setDisplayName(body.get("displayName"));
            return ResponseEntity.ok(service.createUser(user)); // using createUser also saves updates
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

}


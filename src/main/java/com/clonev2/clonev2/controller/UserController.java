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

    // ✅ Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("👥 GET /api/users");
        return ResponseEntity.ok(service.getAllUsers());
    }

    // ✅ Get user by username
    @GetMapping("/{username}")
    public ResponseEntity<?> getByUsername(@PathVariable String username) {
        Optional<User> userOpt = service.getByUsername(username);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            System.err.println("❌ User not found: " + username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // ✅ Create new user
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User saved = service.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            System.err.println("⚠️ Failed to create user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }


    // ✅ Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<User> userOpt = service.getByUsername(username);

        if (userOpt.isEmpty()) {
            System.err.println("❌ Login failed: user not found – " + username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            System.err.println("❌ Login failed: incorrect password for " + username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }

        System.out.println("✅ Login success for: " + username);
        return ResponseEntity.ok(user);
    }

    // ✅ Update display name
    @PatchMapping("/{username}")
    public ResponseEntity<?> updateDisplayName(@PathVariable String username, @RequestBody Map<String, String> body) {
        Optional<User> userOpt = service.getByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setDisplayName(body.get("displayName"));
            User updated = service.createUser(user); // saving
            return ResponseEntity.ok(updated);
        }

        System.err.println("❌ Update failed: user not found – " + username);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}



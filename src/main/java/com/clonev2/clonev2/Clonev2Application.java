package com.clonev2.clonev2;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Clonev2Application {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    public static void main(String[] args) {
        SpringApplication.run(Clonev2Application.class, args);
    }

    @PostConstruct
    public void logActiveDatabase() {
        System.out.println("🛢️ Connected to DB: " + dbUrl);
    }
}

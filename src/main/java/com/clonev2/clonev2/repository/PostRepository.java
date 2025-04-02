package com.clonev2.clonev2.repository;

import com.clonev2.clonev2.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}

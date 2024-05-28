package com.Len4ik.ourWebsite.repo;

import com.Len4ik.ourWebsite.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

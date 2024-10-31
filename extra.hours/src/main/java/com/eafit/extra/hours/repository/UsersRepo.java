package com.eafit.extra.hours.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.eafit.extra.hours.entity.OurUsers;
import java.util.Optional;

import java.time.LocalDateTime;

@Repository
public interface UsersRepo extends JpaRepository<OurUsers, Integer> {

    Optional<OurUsers> findByEmail(String email);
    /*boolean existsByEmail(String email);

    //Optional<OurUsers> findByUsername(String username);
    //boolean existsByUsername(String username);

    @Modifying
    @Query("UPDATE users u SET u.lastLogin = ?2 WHERE u.id = ?1")
    void updateLastLogin(Integer userId, LocalDateTime lastLogin);

    @Modifying
    @Query("UPDATE users u SET u.enabled = ?2 WHERE u.id = ?1")
    void updateEnabled(Integer userId, boolean enabled);*/
}

package com.eafit.extra.hours.service;

import com.eafit.extra.hours.entity.OurUsers;
import com.eafit.extra.hours.repository.UsersRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OurUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepo usersRepo;

    /*@Autowired
    private OurUsers user;*/

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepo.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("Usuario no encontrado: "+username));
    }

    /*public OurUsers createUser(OurUsers user) {
        if (usersRepo.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (usersRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepo.save(user);
    }*/

    /*public void updateLastLogin(Integer userId) {
        usersRepo.updateLastLogin(userId, LocalDateTime.now());
    }

    public void toggleUserEnabled(Integer userId) {
        OurUsers user = usersRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        usersRepo.updateEnabled(userId, !user.isEnabled());
    }*/
}
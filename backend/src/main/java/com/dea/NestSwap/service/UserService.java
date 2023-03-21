package com.dea.NestSwap.service;

import com.dea.NestSwap.entity.user.User;
import com.dea.NestSwap.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("This user doesn't exist!"));
    }

    public User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new UsernameNotFoundException("No user is logged in."));
        return user;
    }

    public void updateUserDetails(String firstname, String lastname, String email, String phone, String languages, String description, String destinations, byte[] decodedImage) throws IllegalAccessException {
        User user = getAuthenticatedUser();

        if (!firstname.isEmpty()) user.setFirstname(firstname);
        if (!lastname.isEmpty()) user.setLastname(lastname);
        if (!email.isEmpty()) user.setEmail(email);
        if (!phone.isEmpty()) user.setPhone(phone);
        if (!languages.isEmpty()) user.setLanguages(languages);
        if (!description.isEmpty()) user.setDescription(description);
        if (!destinations.isEmpty()) user.setDestinations(destinations);

        if (decodedImage != null) {
            user.setImage(decodedImage);
        } else {
            user.setImage(user.getImage());
        }
        userRepository.save(user);
    }
}
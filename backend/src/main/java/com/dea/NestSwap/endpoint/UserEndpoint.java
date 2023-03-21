package com.dea.NestSwap.endpoint;

import com.dea.NestSwap.entity.user.User;
import com.dea.NestSwap.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserEndpoint {
    private final UserService userService;

    @GetMapping(value = "/{username}")
    public User getUser(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PutMapping(value = "/details")
    public String updateUserDetails(@RequestParam("firstname") String firstname,
                                    @RequestParam("lastname") String lastname,
                                    @RequestParam("email") String email,
                                    @RequestParam("phone") String phone,
                                    @RequestParam("languages") String languages,
                                    @RequestParam("description") String description,
                                    @RequestParam("destinations") String destinations,
                                    @RequestParam(value = "photoData", required = false) MultipartFile photoData) throws IOException, IllegalAccessException {
        byte[] decodedImage = null;
        if (photoData != null) {
            decodedImage = photoData.getBytes();
        }
        userService.updateUserDetails(firstname, lastname, email, phone, languages, description, destinations, decodedImage);
        return "{\"success\":1}";
    }
}

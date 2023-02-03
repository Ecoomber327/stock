package com.example.stock.stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository userRepository;

    @Autowired
    public UsersService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addNewUser(Users newUser) {
        Optional<Users> UserOptional = userRepository.findUserByUsername(newUser.getUsername());
        if(UserOptional.isPresent()){
            throw new IllegalStateException("email taken");
        }
        userRepository.save(newUser);
    }

    public List<Users> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void addTicker(Long userId, String newTicker) {
        Users currUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id " + userId + "does not exist"
                ));

        currUser.addTicker(newTicker);
    }
}

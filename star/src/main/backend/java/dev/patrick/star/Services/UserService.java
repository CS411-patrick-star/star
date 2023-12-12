package dev.patrick.star.Services;

import dev.patrick.star.Entities.User;
import dev.patrick.star.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<User> allUsers(){
        return userRepository.findAll();
    }
}

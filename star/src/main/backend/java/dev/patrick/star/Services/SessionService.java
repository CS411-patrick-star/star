package dev.patrick.star.Services;

import dev.patrick.star.Entities.Session;
import dev.patrick.star.Repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Session> allSessions(){
        return sessionRepository.findAll();
    }
}
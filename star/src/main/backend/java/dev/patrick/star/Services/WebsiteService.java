package dev.patrick.star.Services;

import dev.patrick.star.Entities.Website;
import dev.patrick.star.Repositories.WebsiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebsiteService {

    @Autowired
    private WebsiteRepository websiteRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Website> allWebsites(){
        return websiteRepository.findAll();
    }
}

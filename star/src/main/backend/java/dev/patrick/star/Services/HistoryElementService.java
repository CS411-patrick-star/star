package dev.patrick.star.Services;

import dev.patrick.star.Entities.HistoryElement;
import dev.patrick.star.Repositories.HistoryElementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryElementService {

    @Autowired
    private HistoryElementRepository historyElementRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<HistoryElement> allHistoryElements(){
        return historyElementRepository.findAll();
    }
}

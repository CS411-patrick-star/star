package dev.patrick.star.Services;

import dev.patrick.star.Entities.History;
import dev.patrick.star.Repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    public List<History> allHistories(){
        return historyRepository.findAll();
    }
}

package dev.patrick.star.Services;

import dev.patrick.star.Entities.BookmarkElement;
import dev.patrick.star.Repositories.BookmarkElementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkElementService {

    @Autowired
    private BookmarkElementRepository bookmarkElementRepository;

    public List<BookmarkElement> allBookmarkElements(){
        return bookmarkElementRepository.findAll();
    }
}

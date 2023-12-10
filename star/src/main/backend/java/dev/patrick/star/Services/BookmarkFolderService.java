package dev.patrick.star.Services;

import dev.patrick.star.Entities.BookmarkFolder;
import dev.patrick.star.Repositories.BookmarkFolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkFolderService {

    @Autowired
    private BookmarkFolderRepository bookmarkFolderRepository;

    public List<BookmarkFolder> allBookmarkFolders(){
        return bookmarkFolderRepository.findAll();
    }
}

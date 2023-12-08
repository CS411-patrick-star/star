package dev.patrick.star;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;
    public List<Bookmark> allBookmarks(){
        System.out.println(bookmarkRepository.findAll().toString());
        return bookmarkRepository.findAll();
    }

    public Optional<Bookmark> singleBookmark(String websiteId){
        return bookmarkRepository.findBookmarkByWebsiteId(websiteId);
    }
}

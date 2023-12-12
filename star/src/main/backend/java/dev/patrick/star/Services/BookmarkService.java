package dev.patrick.star.Services;

import dev.patrick.star.Entities.Bookmark;
import dev.patrick.star.Entities.BookmarkFolder;
import dev.patrick.star.Entities.Website;
import dev.patrick.star.Repositories.BookmarkRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Bookmark> allBookmarks(){
        return bookmarkRepository.findAll();
    }

    public Optional<Bookmark> singleBookmark(String websiteId){
        return bookmarkRepository.findBookmarkByWebsiteId(websiteId);
    }

    public void deleteAllBookmarks(){
        bookmarkRepository.deleteAll();
    }

    public Bookmark createBookmark(Website website, String date){
        Bookmark bookmark = bookmarkRepository.insert(new Bookmark(website, date));
        return bookmark;
    }

    public int addBookmarkToBookmarkFolder(ObjectId bookmarkId, ObjectId bookmarkFolderId){

        try{

            Bookmark bookmark = bookmarkRepository.findById(bookmarkId).get();
            mongoTemplate.update(BookmarkFolder.class)
                    .matching(Criteria.where("id").is(bookmarkFolderId))
                    .apply(new Update().push("bookmarks").value(bookmark))
                    .first();
            return 1;
        }
        catch (Exception e){
            System.out.println(e.toString());
            return 0;
        }
    }
}
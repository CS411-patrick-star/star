package dev.patrick.star.Services;

import dev.patrick.star.Entities.Bookmark;
import dev.patrick.star.Entities.BookmarkElement;
import dev.patrick.star.Entities.BookmarkFolder;
import dev.patrick.star.Entities.Website;
import dev.patrick.star.Repositories.BookmarkRepository;
import dev.patrick.star.Repositories.WebsiteRepository;
import dev.patrick.star.Requests.AddNewBookmarkRequest;
import dev.patrick.star.Responses.AddNewBookmarkResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private WebsiteRepository websiteRepository;

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

    public AddNewBookmarkResponse createBookmark(AddNewBookmarkRequest addNewBookmarkRequest){

        System.out.println("Im in the service");
        BookmarkElement bookmarkElement = new BookmarkElement(addNewBookmarkRequest.getBookmarkName(), addNewBookmarkRequest.getBookmarkDescription(), addNewBookmarkRequest.getDateAdded(), addNewBookmarkRequest.getAddition());
        mongoTemplate.update(BookmarkElement.class)
                .matching(Criteria.where("id").is(bookmarkElement.getId()))
                .apply(new Update().push("bookmarkElements").value(bookmarkElement))
                .first();
        System.out.println("Im in the service1");
        Bookmark bookmark;
        if(bookmarkRepository.findBookmarkByWebsiteId(addNewBookmarkRequest.getWebsiteId()).isPresent()){

            bookmark = bookmarkRepository.findBookmarkByWebsiteId(addNewBookmarkRequest.getWebsiteId()).get();
        } else {
            bookmark = null;
        }
        System.out.println("Im in the service2");

        if(bookmark == null){

            System.out.println("Im in the service3");
            Website website;
            if(!websiteRepository.findWebsiteByWebsiteLink(addNewBookmarkRequest.getBaseUrl()).isPresent()){
                website = new Website(addNewBookmarkRequest.getBaseUrl());
                mongoTemplate.update(Website.class)
                        .matching(Criteria.where("id").is(website.getId()))
                        .apply(new Update().push("websites").value(website))
                        .first();
            } else {
                website = websiteRepository.findWebsiteByWebsiteLink(addNewBookmarkRequest.getBaseUrl()).get();
            }
            Bookmark newBookmark = new Bookmark(website, addNewBookmarkRequest.getDateAdded());
            System.out.println("Im in the service4");
            newBookmark.getBookmarkElements().add(bookmarkElement);
            mongoTemplate.update(Bookmark.class)
                    .matching(Criteria.where("id").is(newBookmark.getId()))
                    .apply(new Update().push("bookmarks").value(newBookmark))
                    .first();
        } else {
            bookmark.getBookmarkElements().add(bookmarkElement);
            mongoTemplate.update(Bookmark.class)
                    .matching(Criteria.where("id").is(bookmark.getId()))
                    .apply(new Update().push("bookmarks").value(bookmark))
                    .first();
        }
        return null;
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

    public List<Bookmark> getBookmarksFromBookmarkFolder(ObjectId bookmarkFolderId){
        BookmarkFolder bookmarkFolder = mongoTemplate.findById(bookmarkFolderId, BookmarkFolder.class);
        return bookmarkFolder.getBookmarks();
    }
}
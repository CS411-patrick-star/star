package dev.patrick.star.Services;

import dev.patrick.star.Entities.*;
import dev.patrick.star.Repositories.BookmarkRepository;
import dev.patrick.star.Repositories.UserRepository;
import dev.patrick.star.Repositories.WebsiteRepository;
import dev.patrick.star.Requests.AddNewBookmarkRequest;
import dev.patrick.star.Responses.AddNewBookmarkResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private UserRepository userRepository;

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

        AddNewBookmarkResponse addNewBookmarkResponse = new AddNewBookmarkResponse();
        addNewBookmarkResponse.setStatus(0);

        try{
            BookmarkElement bookmarkElement = new BookmarkElement(addNewBookmarkRequest.getBookmarkName(), addNewBookmarkRequest.getBookmarkDescription(), addNewBookmarkRequest.getDateAdded(), addNewBookmarkRequest.getAddition());
            mongoTemplate.update(BookmarkElement.class)
                    .matching(Criteria.where("id").is(bookmarkElement.getId()))
                    .apply(new Update().push("bookmarkElements").value(bookmarkElement))
                    .first();
            Bookmark bookmark;
            if(bookmarkRepository.findBookmarkByWebsiteId(addNewBookmarkRequest.getWebsiteId()).isPresent()){

                bookmark = bookmarkRepository.findBookmarkByWebsiteId(addNewBookmarkRequest.getWebsiteId()).get();
            } else {
                bookmark = null;
            }

            if(bookmark == null){

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
                newBookmark.getBookmarkElements().add(bookmarkElement);
                mongoTemplate.update(Bookmark.class)
                        .matching(Criteria.where("id").is(newBookmark.getId()))
                        .apply(new Update().push("bookmarks").value(newBookmark))
                        .first();
                addNewBookmarkResponse.setStatus(1);
            } else {
                bookmark.getBookmarkElements().add(bookmarkElement);
                mongoTemplate.update(Bookmark.class)
                        .matching(Criteria.where("id").is(bookmark.getId()))
                        .apply(new Update().push("bookmarks").value(bookmark))
                        .first();
                addNewBookmarkResponse.setStatus(1);
            }
            return addNewBookmarkResponse;
        }
        catch (Exception e){

            System.out.println("Exception in createBookmark in BookmarkService");
            addNewBookmarkResponse.setStatus(-1);
            return addNewBookmarkResponse;
        }
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
            System.out.println(e.getMessage());
            return 0;
        }
    }

    public List<Bookmark> getBookmarkByUserId(String userId){

        ObjectId userObjectId = new ObjectId(userId);
        User user;
        List<Bookmark> returnList = new ArrayList<>();
        if(userRepository.findById(userObjectId).isPresent()){

            user = userRepository.findById(userObjectId).get();
            for(int i = 0; i < user.getBookmarkFolders().size(); i++){

                returnList.addAll(user.getBookmarkFolders().get(i).getBookmarks());
            }
            return returnList;
        } else {
            return null;
        }
    }

    public List<Bookmark> getBookmarksFromBookmarkFolder(ObjectId bookmarkFolderId){
        BookmarkFolder bookmarkFolder = mongoTemplate.findById(bookmarkFolderId, BookmarkFolder.class);
        return bookmarkFolder.getBookmarks();
    }
}
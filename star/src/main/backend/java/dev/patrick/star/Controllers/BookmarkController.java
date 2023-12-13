package dev.patrick.star.Controllers;

import dev.patrick.star.Requests.AddNewBookmarkRequest;
import dev.patrick.star.Responses.AddNewBookmarkResponse;
import dev.patrick.star.Services.BookmarkService;
import dev.patrick.star.Entities.Bookmark;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bookmarks")
@CrossOrigin(origins = "http://localhost:3000")
public class BookmarkController {
    @Autowired
    private BookmarkService bookmarkService;

    @GetMapping
    public ResponseEntity<List<Bookmark>> getAllBookmarks(){
        return new ResponseEntity<List<Bookmark>>(bookmarkService.allBookmarks(), HttpStatus.OK);
    }

    @GetMapping("/{websiteId}")
    public ResponseEntity<Optional<Bookmark>> getSingleBookmark(@PathVariable String websiteId){
        return new ResponseEntity<Optional<Bookmark>>(bookmarkService.singleBookmark(websiteId), HttpStatus.OK);
    }

    @GetMapping("/bookmark_folder/{bookmarkFolderId}")
    public ResponseEntity<List<Bookmark>> getBookmarksFromBookmarkFolder(@PathVariable ObjectId bookmarkFolderId){
        return new ResponseEntity<List<Bookmark>>(bookmarkService.getBookmarksFromBookmarkFolder(bookmarkFolderId), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Bookmark>> getBookmarkByUserId(@PathVariable String userId){
        return new ResponseEntity<List<Bookmark>>(bookmarkService.getBookmarkByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/newBookmark")
    public ResponseEntity<AddNewBookmarkResponse> createBookmark(@RequestPart String websiteId
            ,@RequestPart String bookmarkName ,@RequestPart String bookmarkDescription, @RequestPart String dateAdded, @RequestPart String addition, @RequestPart String baseUrl){
        return new ResponseEntity<AddNewBookmarkResponse>(bookmarkService.createBookmark(new AddNewBookmarkRequest(websiteId, bookmarkName, bookmarkDescription, dateAdded, addition, baseUrl)), HttpStatus.OK);
    }
}
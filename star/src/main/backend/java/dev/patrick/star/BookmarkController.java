package dev.patrick.star;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bookmarks")
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
}

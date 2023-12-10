package dev.patrick.star.Controllers;

import dev.patrick.star.Services.BookmarkService;
import dev.patrick.star.Entities.Bookmark;
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
}
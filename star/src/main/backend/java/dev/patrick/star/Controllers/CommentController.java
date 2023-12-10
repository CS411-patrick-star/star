package dev.patrick.star.Controllers;

import dev.patrick.star.Services.CommentService;
import dev.patrick.star.Entities.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Comment>(commentService.createComment(payload.get("commentBody"), payload.get("websiteId")), HttpStatus.CREATED);
    }
}
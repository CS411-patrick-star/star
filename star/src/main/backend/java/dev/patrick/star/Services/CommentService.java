package dev.patrick.star.Services;

import dev.patrick.star.Entities.Bookmark;
import dev.patrick.star.Entities.Comment;
import dev.patrick.star.Repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Comment createComment(String commentBody, String websiteId) {
        Comment comment = commentRepository.insert(new Comment(commentBody));

        mongoTemplate.update(Bookmark.class)
                .matching(Criteria.where("websiteId").is(websiteId))
                .apply(new Update().push("commentIds").value(comment))
                .first();

        return comment;
    }
}
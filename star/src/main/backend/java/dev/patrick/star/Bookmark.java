package dev.patrick.star;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "bookmarks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark {

    @Id
    private ObjectId id;
    private String websiteId;
    private String link;
    private String title;
    private String dateAdded;
    @DocumentReference
    private List<Comment> commentIds;




}

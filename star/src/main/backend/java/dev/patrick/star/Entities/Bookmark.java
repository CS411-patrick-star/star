package dev.patrick.star.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "bookmarks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark {

    @Id
    private ObjectId id;
    @DocumentReference
    private Website websiteId;
    private String date;
    @DocumentReference
    private List<BookmarkElement> bookmarkElements;

    public Bookmark(Website website, String date){
        this.websiteId = website;
        this.date = date;
    }
}

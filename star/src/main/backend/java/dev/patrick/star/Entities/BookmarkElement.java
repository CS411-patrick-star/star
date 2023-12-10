package dev.patrick.star.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookmark_elements")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkElement {

    @Id
    private ObjectId id;
    private String bookmarkName;
    private String bookmarkDescription;
    private String dateAdded;
    private String addition;
}

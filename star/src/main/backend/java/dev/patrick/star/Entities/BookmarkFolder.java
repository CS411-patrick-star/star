package dev.patrick.star.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "bookmark_folders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkFolder {

    @Id
    private ObjectId id;
    @DocumentReference
    private List<Bookmark> bookmarks;
}

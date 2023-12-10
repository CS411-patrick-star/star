package dev.patrick.star.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;
    private String email;
    private String password;
    @DocumentReference
    private History history;
    @DocumentReference
    private List<Session> sessions;
    @DocumentReference
    private List<BookmarkFolder> bookmarkFolders;
}

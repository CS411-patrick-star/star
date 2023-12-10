package dev.patrick.star.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "sessions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Session {

    @Id
    private ObjectId id;
    @DocumentReference
    private List<HistoryElement> historyElements;
}

package dev.patrick.star.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document(collection = "history_elements")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryElement {

    @Id
    private ObjectId id;
    private String date;
    @DocumentReference
    private Website websiteId;
}

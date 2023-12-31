package dev.patrick.star.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "websites")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Website {

    @Id
    private ObjectId id;
    private String websiteLink;

    public Website(String websiteLink){
        this.websiteLink = websiteLink;
    }
}

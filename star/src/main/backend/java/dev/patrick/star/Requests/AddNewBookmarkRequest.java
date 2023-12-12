package dev.patrick.star.Requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddNewBookmarkRequest {

    private String websiteId;
    private String bookmarkName;
    private String bookmarkDescription;
    private String dateAdded;
    private String addition;
    private String baseUrl;
}

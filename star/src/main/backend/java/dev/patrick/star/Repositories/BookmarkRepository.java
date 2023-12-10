package dev.patrick.star.Repositories;
import dev.patrick.star.Entities.Bookmark;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends MongoRepository<Bookmark, ObjectId> {
    Optional<Bookmark> findBookmarkByWebsiteId(String websiteId);
}
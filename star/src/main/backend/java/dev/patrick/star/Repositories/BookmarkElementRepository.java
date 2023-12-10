package dev.patrick.star.Repositories;

import dev.patrick.star.Entities.BookmarkElement;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkElementRepository extends MongoRepository<BookmarkElement, ObjectId> {
}

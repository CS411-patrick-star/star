package dev.patrick.star.Repositories;

import dev.patrick.star.Entities.BookmarkFolder;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkFolderRepository extends MongoRepository<BookmarkFolder, ObjectId> {
}

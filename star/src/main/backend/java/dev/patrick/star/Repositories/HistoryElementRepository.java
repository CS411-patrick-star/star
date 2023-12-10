package dev.patrick.star.Repositories;

import dev.patrick.star.Entities.HistoryElement;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryElementRepository extends MongoRepository<HistoryElement, ObjectId> {
}

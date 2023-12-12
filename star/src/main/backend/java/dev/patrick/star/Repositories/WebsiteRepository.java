package dev.patrick.star.Repositories;

import dev.patrick.star.Entities.Website;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WebsiteRepository extends MongoRepository<Website, ObjectId> {
    Optional<Website> findWebsiteByWebsiteLink(String websiteLink);
}

package org.example.shortenurl.Repository;

import org.example.shortenurl.entity.entity.ShortenUrlEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortenUrlRepository extends JpaRepository<ShortenUrlEntity,Long> {

    ShortenUrlEntity findByShortUrl(String shortUrl);

}

package org.example.shortenurl.entity.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class BaseEntity {

    @Column(updatable = false)
    private LocalDateTime createdTime;

    @PrePersist
    public void prePersist(){
        createdTime = LocalDateTime.now();
    }
}

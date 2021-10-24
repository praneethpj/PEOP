package com.peop.backend.repository;

import com.peop.backend.model.TimeFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Praneethpj
 */
@Repository
public interface TimeFieldRepository extends JpaRepository<TimeFields,Long> {
//    @Query("SELECT 1 FROM timefields where id =:id")
     // findById(@Param("id") Long id);
}

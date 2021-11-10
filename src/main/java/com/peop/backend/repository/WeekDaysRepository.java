package com.peop.backend.repository;

import com.peop.backend.model.TimeFields;
import com.peop.backend.model.WeekDays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Praneethpj
 */
@Repository
public interface WeekDaysRepository extends JpaRepository<WeekDays,Long> {
//    @Query("SELECT 1 FROM timefields where id =:id")
     // findById(@Param("id") Long id);


}

package com.peop.backend.repository;

import com.peop.backend.model.ProfessionalProfile;
import com.peop.backend.model.TimeFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Praneethpj
 */
@Repository
public interface ProfessionRepository extends JpaRepository<ProfessionalProfile,Long> {

    ProfessionalProfile findByUserid(Long aLong);
    Boolean existsByUserid(Long userId);
    Boolean existsByName(String name);


    ProfessionalProfile findByName(String name);


}

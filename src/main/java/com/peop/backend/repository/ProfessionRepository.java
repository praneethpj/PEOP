package com.peop.backend.repository;

import com.peop.backend.model.ProfessionalProfile;
import com.peop.backend.model.TimeFields;
import com.peop.backend.model.UserProfessional;
import org.springframework.data.domain.Pageable;
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

    List<String> getAllByProfession_name();



    ProfessionalProfile findByName(String name);

    @Query(value = "SELECT u.id,u.name,p.chargesperHour,p.profession_name,u.profileImage FROM User u , ProfessionalProfile p where u.id=p.userid")
    List<?> getAllProfessionalUser(Pageable pageable);


}

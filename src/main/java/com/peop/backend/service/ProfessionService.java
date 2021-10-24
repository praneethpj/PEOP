package com.peop.backend.service;

import com.peop.backend.model.ProfessionalProfile;
import com.peop.backend.model.TimeFields;
import com.peop.backend.model.TimeSlot;
import com.peop.backend.repository.ProfessionRepository;
import com.peop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Praneethpj
 */
@Service
public class ProfessionService {
    @Autowired
    ProfessionRepository professionRepository;

    @Autowired
    UserRepository userRepository;




    public ProfessionalProfile registerNewProfession(ProfessionalProfile professionalProfile){

        if(professionRepository.existsById(professionalProfile.getUserid())){
            ProfessionalProfile professionalProfile1=professionRepository.findByUserid(professionalProfile.getUserid());
            professionalProfile1.setProfession_name(professionalProfile.getProfession_name());
            professionalProfile1.setName(professionalProfile.getName());
            professionalProfile1.setChargesperHour(professionalProfile.getChargesperHour());
            professionalProfile1.setDescription(professionalProfile.getDescription());
            professionalProfile1.setActivate(professionalProfile.getActivate());
            TimeSlot timeSlot=professionalProfile.getTimeSlot();
            timeSlot.setUserId(professionalProfile.getUserid().intValue());
            timeSlot.setUpdatedAt(professionalProfile.getUpdatedAt());



            professionalProfile1.setTimeSlot(timeSlot);
            professionalProfile1.setCreatedAt(professionalProfile.getCreatedAt());
            professionalProfile1.setUpdatedAt(professionalProfile.getUpdatedAt());

            return professionRepository.save(professionalProfile1);
        }else {
            return professionRepository.save(professionalProfile);
        }
    }
}

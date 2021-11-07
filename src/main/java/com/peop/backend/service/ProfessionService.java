package com.peop.backend.service;

import com.peop.backend.model.ProfessionalProfile;
import com.peop.backend.model.TimeFields;
import com.peop.backend.model.TimeSlot;
import com.peop.backend.model.WeekDays;
import com.peop.backend.repository.ProfessionRepository;
import com.peop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
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
            //professionalProfile1.setId(professionalProfile.getId());

            professionalProfile1.setProfession_name(professionalProfile.getProfession_name());
            professionalProfile1.setName(professionalProfile.getName());
            professionalProfile1.setChargesperHour(professionalProfile.getChargesperHour());
            professionalProfile1.setDescription(professionalProfile.getDescription());
            professionalProfile1.setActivate(professionalProfile.getActivate());
            TimeSlot timeSlot=professionalProfile.getTimeSlot();
            timeSlot.setUserId(professionalProfile.getUserid().intValue());
            timeSlot.setUpdatedAt(professionalProfile.getUpdatedAt());
           // List<WeekDays> weekDays=professionalProfile1.getTimeSlot().getTimeSlot();
            WeekDays weekDays1=null;
            TimeFields timeFields1=null;
//            for(int i=0;i< weekDays.size();i++)
//            {
//                weekDays1=new WeekDays();
//                weekDays1.setUid(professionalProfile1.getUserid());
//                weekDays.set(i,weekDays1);
//
////                for(int j=0;j<weekDays.get(j).getTimes().size();j++){
////                    timeFields1.setUid(professionalProfile1.getUserid());
////                    weekDays.get(i).getTimes().get(j).setUid(professionalProfile1.getUserid());
////                }
//
//          }




//            timeSlot.setTimeSlot(weekDays);

            professionalProfile1.setTimeSlot(timeSlot);
            professionalProfile1.setCreatedAt(professionalProfile.getCreatedAt());
            professionalProfile1.setUpdatedAt(professionalProfile.getUpdatedAt());

            return professionRepository.save(professionalProfile1);
        }else {
            TimeSlot timeSlot=professionalProfile.getTimeSlot();
            timeSlot.setUserId(professionalProfile.getUserid().intValue());
            timeSlot.setUpdatedAt(professionalProfile.getUpdatedAt());
            //List<WeekDays> weekDays=professionalProfile.getTimeSlot().getTimeSlot();
            WeekDays weekDays1=null;

//            for(int i=0;i< weekDays.size();i++)
//            {
//                weekDays1=new WeekDays();
//                weekDays1.setUid(professionalProfile.getUserid());
//                weekDays1.setTimes(weekDays.get(i).getTimes());
//                weekDays1.setDayname(weekDays.get(i).getDayname());
//                weekDays1.setAvailable(weekDays.get(i).isAvailable());
//
//
//                weekDays.set(i,weekDays1);
//               // List <TimeFields> timeFields=weekDays.get(i).getTimes();
////               if(timeFields!=null)
////               {
////                   for(int j=0;j<timeFields.size();j++)
////                   {
////
////                       timeFields.get(j).setUid(professionalProfile.getUserid());
////                   }
////
////                   weekDays.get(i).setTimes(timeFields);
////               }
//
//            }
            professionalProfile.setTimeSlot(timeSlot);
            return professionRepository.save(professionalProfile);
        }
    }
}

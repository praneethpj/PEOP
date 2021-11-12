package com.peop.backend.service;

import com.peop.backend.model.*;
import com.peop.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

/**
 * @author Praneethpj
 */
@Service
public class ProfessionService {
    @Autowired
    ProfessionRepository professionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    TimeFieldRepository timeFieldRepository;


    public ProfessionalProfile getProfessionProfile(String userid){
        if(professionRepository.existsByName(userid)){
            return professionRepository.findByName(userid);
        }
        return null;
    }
    public List<PaymentSheduled> getPaymentSheduled(String userid){
        if(professionRepository.existsByName(userid)){
            ProfessionalProfile professionalProfile=professionRepository.findByName(userid);
            return paymentRepository.findByProfessionId(professionalProfile.getUserid());
        }
        return null;
    }
    public List<PaymentSheduled> getPaymentSheduled(Long userid){


            return paymentRepository.findByUserId(userid);

    }

    public PaymentSheduled updatePaymentSheduledStatus(Long userid,Long id, int status,Long timeid){

        System.out.println(paymentRepository.existsByIdAndProfessionId(id,userid));
        if(paymentRepository.existsByIdAndProfessionId(id,userid)){
            Optional<PaymentSheduled>  tmppayment= paymentRepository.findById(id);
            PaymentSheduled paymentSheduled=tmppayment.get();
            paymentSheduled.setStatus(status);

            if(status==99) {
                Optional<TimeFields> tf = timeFieldRepository.findById(timeid);
                TimeFields timeFields = tf.get();
                timeFields.setAvailability(true);
            }

            return paymentRepository.save(paymentSheduled);
        }

        return null;

    }

    public ProfessionalProfile registerNewProfession(ProfessionalProfile professionalProfile){

        if(professionRepository.existsByUserid(professionalProfile.getUserid())){
            ProfessionalProfile professionalProfile1=professionRepository.findByUserid(professionalProfile.getUserid());
           // professionalProfile1.setId(professionalProfile.getId());

            TimeFieldRepository timeFieldsRepo=null;
            WeekDaysRepository weekDaysRepository=null;
            professionalProfile1.setProfession_name(professionalProfile.getProfession_name());
            professionalProfile1.setName(professionalProfile.getName());
            professionalProfile1.setChargesperHour(professionalProfile.getChargesperHour());
            professionalProfile1.setDescription(professionalProfile.getDescription());
            professionalProfile1.setActivate(professionalProfile.getActivate());
            professionalProfile1.setTimeSlot(professionalProfile.getTimeSlot());


            TimeSlot timeSlot=professionalProfile.getTimeSlot();
            timeSlot.setUserId(professionalProfile.getUserid().intValue());
            timeSlot.setUpdatedAt(professionalProfile.getUpdatedAt());
            List<WeekDays> weekDays=professionalProfile1.getTimeSlot().getTimeSlot();
            //WeekDays weekDays1=null;


            for(int i=0;i< weekDays.size();i++)
            {
               // weekDays1=weekDays.get(i);


                weekDays.get(i).setUid(professionalProfile.getUserid());
                weekDays.get(i).setTimes(weekDays.get(i).getTimes());
                weekDays.get(i).setDayname(weekDays.get(i).getDayname());
                weekDays.get(i).setAvailable(weekDays.get(i).isAvailable());


                weekDays.set(i,weekDays.get(i));
                List <TimeFields> timeFields=weekDays.get(i).getTimes();


                if(timeFields!=null)
                {
                    for(int j=0;j<timeFields.size();j++)
                    {
                       //Optional<TimeFields> t1= timeFieldsRepo.findById(timeFields.get(j).getId());

                      // TimeFields tmp=t1.get();

                      // if(tmp!=null)
                       //tmp.setUid(professionalProfile1.getUserid());

                         timeFields.get(j).setUid(Long.valueOf(professionalProfile1.getUserid().toString()));
                    }




                }

            }

            professionalProfile1.setTimeSlot(timeSlot);
            //professionalProfile1.setCreatedAt(professionalProfile.getCreatedAt());
            professionalProfile1.setUpdatedAt(professionalProfile.getUpdatedAt());

            return professionRepository.save(professionalProfile1);
        }else {
            TimeSlot timeSlot=professionalProfile.getTimeSlot();
            timeSlot.setUserId(professionalProfile.getUserid().intValue());
            timeSlot.setUpdatedAt(professionalProfile.getUpdatedAt());
            List<WeekDays> weekDays=professionalProfile.getTimeSlot().getTimeSlot();
            WeekDays weekDays1=null;


            for(int i=0;i< weekDays.size();i++)
            {
                weekDays1=new WeekDays();
                weekDays1.setUid(professionalProfile.getUserid());
                weekDays1.setTimes(weekDays.get(i).getTimes());
                weekDays1.setDayname(weekDays.get(i).getDayname());
                weekDays1.setAvailable(weekDays.get(i).isAvailable());


                weekDays.set(i,weekDays1);
                List <TimeFields> timeFields=weekDays.get(i).getTimes();

               if(timeFields!=null)
               {
                   for(int j=0;j<timeFields.size();j++)
                   {

                       timeFields.get(j).setUid(Long.valueOf(professionalProfile.getUserid().toString()));
                   }

                   weekDays.get(i).setTimes(timeFields);
               }

            }
            professionalProfile.setTimeSlot(timeSlot);
            return professionRepository.save(professionalProfile);
        }
    }
}

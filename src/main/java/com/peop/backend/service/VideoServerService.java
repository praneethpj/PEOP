package com.peop.backend.service;

import com.peop.backend.model.PaymentSheduled;
import com.peop.backend.model.User;
import com.peop.backend.payload.SheduledConfirm;
import com.peop.backend.repository.PaymentRepository;
import com.peop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Praneethpj
 */
@Service
public class VideoServerService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentRepository paymentRepository;


    public boolean isSheduledAvailable(SheduledConfirm sheduledConfirm){
        Optional<User> userprofession=userRepository.findByUsername(sheduledConfirm.getProfessionid());
        Optional<User> usernormal=userRepository.findByUsername(sheduledConfirm.getUserid());
        boolean value= paymentRepository.existsByIdAndProfessionIdAndUserIdAndStatus(sheduledConfirm.getRoomid(), userprofession.get().getId(),usernormal.get().getId(),1);

        if(value){
            Optional<PaymentSheduled> paymentSheduled=paymentRepository.findById(sheduledConfirm.getRoomid());
            paymentSheduled.get().setCallStatus(1);
             paymentRepository.save(paymentSheduled.get());
        }

        return value;
    }
}

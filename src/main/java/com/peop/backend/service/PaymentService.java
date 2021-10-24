package com.peop.backend.service;

import com.peop.backend.model.PaymentSheduled;
import com.peop.backend.model.TimeFields;
import com.peop.backend.repository.PaymentRepository;
import com.peop.backend.repository.ProfessionRepository;
import com.peop.backend.repository.TimeFieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Praneethpj
 */
@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;


    @Autowired
    ProfessionRepository professionRepository;

    @Autowired
    TimeFieldRepository timeFieldRepository;

    public PaymentSheduled makePayment(PaymentSheduled paymentSheduled){



        Optional<TimeFields> timeFields=timeFieldRepository.findById(paymentSheduled.getTimeid());
        TimeFields tt=timeFields.get();
        tt.setAvailability(false);
        timeFieldRepository.save(tt);

        return paymentRepository.save(paymentSheduled);
    }
}

package com.peop.backend.controller;

import com.peop.backend.model.PaymentSheduled;
import com.peop.backend.payload.JwtAuthenticationResponse;
import com.peop.backend.payload.PaymentPayLoad;
import com.peop.backend.payload.RegisterProfession;
import com.peop.backend.repository.PaymentRepository;
import com.peop.backend.security.CurrentUser;
import com.peop.backend.security.UserPrincipal;
import com.peop.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;

/**
 * @author Praneethpj
 */
@RestController
@RequestMapping("/api/payment")
public class PaymentController {


    @Autowired
    PaymentService paymentService;

    @PostMapping("/payment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addPayment(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody PaymentPayLoad paymentPayLoad){

        PaymentSheduled paymentSheduled=new PaymentSheduled();
        paymentSheduled.setUserId(currentUser.getId());
        paymentSheduled.setSheduledDate(new Date(paymentPayLoad.getDate()));
        paymentSheduled.setTime(paymentPayLoad.getTime());
        paymentSheduled.setProfessionId(paymentPayLoad.getProfession());
        paymentSheduled.setTimeid(paymentPayLoad.getTimeid());
        paymentService.makePayment(paymentSheduled);

        return ResponseEntity.ok(paymentSheduled);
    }
}

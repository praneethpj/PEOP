package com.peop.backend.controller;

import com.peop.backend.model.*;
import com.peop.backend.payload.ApiResponse;
import com.peop.backend.payload.RegisterProfession;
import com.peop.backend.payload.UserDetails;
import com.peop.backend.repository.PaymentRepository;
import com.peop.backend.repository.ProfessionRepository;
import com.peop.backend.security.CurrentUser;
import com.peop.backend.security.UserPrincipal;
import com.peop.backend.service.ProfessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Praneethpj
 */
@RestController
@RequestMapping("/api/professional")
public class ProfessionalController {


    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    ProfessionRepository professionRepository;

    @Autowired
    ProfessionService professionService;


    @GetMapping("/")
    public ResponseEntity<?> getAllProfessions(){

        return ResponseEntity.ok().body(professionRepository.getAllProfessionalUser());
    }
    @GetMapping("/get/{uid}")
    public ResponseEntity<?> getOneProfessions(@Valid @PathVariable  Long uid){
        return ResponseEntity.ok().body(professionRepository.findByUserid(uid));
    }

    @PostMapping("/addProfession")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addProfession(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody RegisterProfession registerProfession){
        System.out.println("USER "+currentUser.getUsername());
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String username="";

        registerProfession.getTimeSlot().getTimeSlot().get(0).getTimes();

        ProfessionalProfile professionalProfile=new ProfessionalProfile();


        professionalProfile.setUserid(currentUser.getId());
        professionalProfile.setName(currentUser.getName());
        professionalProfile.setProfession_name(registerProfession.getProfessionName());
        professionalProfile.setActivate(1);
        professionalProfile.setDescription(registerProfession.getDescription());

        professionalProfile.setTimeSlot(registerProfession.getTimeSlot());
        professionalProfile.setChargesperHour(registerProfession.getChargeperhour());
        professionService.registerNewProfession(professionalProfile);


        return new ResponseEntity(new ApiResponse(false, "Register Succesed"),
                HttpStatus.BAD_REQUEST);



    }

    @PostMapping("/getProfession")
    @PreAuthorize("hasRole('USER')")

    public ProfessionalProfile getProfession(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody UserDetails userid) {

        return professionService.getProfessionProfile(userid.getUserid());
    }

    @PostMapping("/getAllAppoinmentsByProfessionId")
    @PreAuthorize("hasRole('USER')")
    public List<PaymentSheduled> getAllAppoinmentsByProfessionId(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody UserDetails userid) {

        return professionService.getPaymentSheduled(userid.getUserid());
    }
    @PostMapping("/getAllAppoinmentsByUserId")
    @PreAuthorize("hasRole('USER')")
    public List<PaymentSheduled> getAllAppoinmentsByUserId(@CurrentUser UserPrincipal currentUser) {

        return professionService.getPaymentSheduled(currentUser.getId());
    }

    @PutMapping("/updatePaymentSheduled")
    @PreAuthorize("hasRole('USER')")
    public PaymentSheduled UpdatePaymentSheduled(@CurrentUser UserPrincipal currentUser,@Valid @RequestBody PaymentSheduleStatusUpdate userid) {

        return professionService.updatePaymentSheduledStatus(currentUser.getId(),userid.getId(),userid.getStatus(), userid.getTimeid());
    }

    @GetMapping("/getAllUpdatedAppoinmentsByUser")
    @PreAuthorize("hasRole('USER')")
    public List<PaymentSheduled> getAllUpdatedAppoinmentsByUser(@CurrentUser UserPrincipal currentUser) {
        System.out.println("user "+currentUser.getId());
        List<PaymentSheduled> paymentSheduled=paymentRepository.findByUserId(currentUser.getId());
        return paymentSheduled;
    }
    @GetMapping("/getAllUpdatedAppoinmentsByProfession")
    @PreAuthorize("hasRole('USER')")
    public List<PaymentSheduled> getAllUpdatedAppoinmentsByProfession(@CurrentUser UserPrincipal currentUser) {
        System.out.println(currentUser.getId());
        List<PaymentSheduled> paymentSheduled=paymentRepository.findByProfessionIdAll(currentUser.getId());
        return paymentSheduled;
    }


    @PostMapping("/getAllAvailableAppoinmentsByProfessionId")
    @PreAuthorize("hasRole('USER')")
    public List<PaymentSheduledDetails> getAllAvailableAppoinmentsByProfessionId(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody UserDetails userid) {
        User user=professionService.getUserIdByName(userid.getUserid());
        return professionService.getAllAvailableSheduledProfession(user.getId());
    }
    @GetMapping("/getAllAvailableAppoinmentsByUserId")
    @PreAuthorize("hasRole('USER')")
    public List<PaymentSheduledDetails> getAllAvailableAppoinmentsByUserId(@CurrentUser UserPrincipal currentUser) {

        return professionService.getAllAvailableSheduledUser(currentUser.getId());
    }

    @PostMapping("/getUserIdByName")
    @PreAuthorize("hasRole('USER')")
    public String getUserIdByName(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody UserDetails userid) {
        User user=professionService.getUserIdByName(userid.getUserid());
        return user.getName();
    }
    }

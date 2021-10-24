package com.peop.backend.controller;

import com.peop.backend.model.ProfessionalProfile;
import com.peop.backend.model.TimeSlot;
import com.peop.backend.model.User;
import com.peop.backend.payload.ApiResponse;
import com.peop.backend.payload.RegisterProfession;
import com.peop.backend.repository.ProfessionRepository;
import com.peop.backend.security.CurrentUser;
import com.peop.backend.security.UserPrincipal;
import com.peop.backend.service.ProfessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author Praneethpj
 */
@RestController
@RequestMapping("/api/professional")
public class ProfessionalController {




    @Autowired
    ProfessionRepository professionRepository;

    @Autowired
    ProfessionService professionService;


    @GetMapping("/")
    public ResponseEntity<?> getAllProfessions(){
        return ResponseEntity.ok().body(professionRepository.findAll());
    }
    @GetMapping("/get/{uid}")
    public ResponseEntity<?> getOneProfessions(@Valid @PathVariable  Long uid){
        return ResponseEntity.ok().body(professionRepository.findByUserid(uid));
    }

    @PostMapping("/addProfession")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addProfession(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody RegisterProfession registerProfession){
        System.out.println("USER "+currentUser.getUsername());
        //Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String username="";

        ProfessionalProfile professionalProfile=new ProfessionalProfile();

        professionalProfile.setUserid(currentUser.getId());
        professionalProfile.setName(currentUser.getName());
        professionalProfile.setProfession_name(registerProfession.getProfessionName());
        professionalProfile.setActivate(1);
        professionalProfile.setDescription(registerProfession.getDescription());

        professionalProfile.setTimeSlot(registerProfession.getTimeSlot());
        professionalProfile.setChargesperHour(registerProfession.getChargeperhour());
        professionService.registerNewProfession(professionalProfile);


        return ResponseEntity.ok().body(professionalProfile);



    }
}

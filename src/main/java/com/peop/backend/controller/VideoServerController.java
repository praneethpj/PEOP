package com.peop.backend.controller;

import com.peop.backend.model.ProfessionalProfile;
import com.peop.backend.payload.SheduledConfirm;
import com.peop.backend.payload.UserDetails;
import com.peop.backend.security.CurrentUser;
import com.peop.backend.security.UserPrincipal;
import com.peop.backend.service.ProfessionService;
import com.peop.backend.service.VideoServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author Praneethpj
 */
@RestController
@RequestMapping("/api/videoserver")
public class VideoServerController {

    @Autowired
    VideoServerService videoServerService;

    @PostMapping("/isSheduledAvailable")
    @PreAuthorize("hasRole('USER')")
    public Boolean isSheduledAvailable(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody SheduledConfirm sheduledConfirm) {

        return videoServerService.isSheduledAvailable(sheduledConfirm);
    }
}

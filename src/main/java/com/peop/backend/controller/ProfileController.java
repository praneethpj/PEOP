package com.peop.backend.controller;

import com.peop.backend.fileupload.FileResponse;
import com.peop.backend.fileupload.FileStorageService;
import com.peop.backend.model.User;
import com.peop.backend.repository.UserRepository;
import com.peop.backend.security.CurrentUser;
import com.peop.backend.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.springframework.core.io.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

/**
 * @author Praneethpj
 */
@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);



    @Autowired
    UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;


    @PutMapping(value = "/profileupload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<FileResponse> uploadFile(@CurrentUser UserPrincipal currentUser, @RequestParam("file") MultipartFile file){
        String fileName = fileStorageService.storeFile(file,""+currentUser.getId()+".png");
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/profile/pics/")
                .path(fileName)
                .toUriString();



        FileResponse fileResponse = new FileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
        Optional<User> user=userRepository.findById(currentUser.getId());
        user.get().setProfileImage(fileResponse.getFileDownloadUri());
        userRepository.save(user.get());
        return new ResponseEntity<FileResponse>(fileResponse,HttpStatus.OK);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileName") String fileName, HttpServletRequest request){

        Optional<User> user=userRepository.findByUsername(fileName);


        Resource resource = fileStorageService.loadFileAsResource(""+user.get().getId()+".png");

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch(IOException ex) {
            System.out.println("Could not determine fileType");
        }

        if(contentType==null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

}

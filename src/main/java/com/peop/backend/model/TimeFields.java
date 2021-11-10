package com.peop.backend.model;

import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

/**
 * @author Praneethpj
 */
@Entity
@Table(name = "timefields")
public class TimeFields {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    //@Column(unique=true)
    private String time;


    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    private Boolean availability=true;

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {

        this.uid = uid;
    }

    private Long uid;
}

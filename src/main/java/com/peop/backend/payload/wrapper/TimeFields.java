package com.peop.backend.payload.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * @author Praneethpj
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class TimeFields {

    public TimeFields(){}

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }


    public TimeFields(String time, Boolean availability, Long uid) {
        this.time = time;
        this.availability = availability;
        this.uid = uid;
    }

    @NotBlank
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

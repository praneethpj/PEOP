package com.peop.backend.payload;

import com.peop.backend.model.TimeSlot;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

/**
 * @author Praneethpj
 */
public class RegisterProfession {
    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getProfessionName() {
        return professionName;
    }

    public void setProfessionName(String professionName) {
        this.professionName = professionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    private Long userid;

    @NotBlank
    @Size(min = 3, max = 15)
    private String professionName;

    @NotBlank
    @Size(max = 40)
    private String description;

    public double getChargeperhour() {
        return chargeperhour;
    }

    public void setChargeperhour(double chargeperhour) {
        this.chargeperhour = chargeperhour;
    }



    private double chargeperhour;

    public TimeSlot getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(TimeSlot timeSlot) {
        this.timeSlot = timeSlot;
    }

    private TimeSlot timeSlot;

}

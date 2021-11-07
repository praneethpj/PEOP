package com.peop.backend.payload.wrapper;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peop.backend.model.DateAudit;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Praneethpj
 */


public class TimeSlot extends DateAudit {

    public TimeSlot(){

    }






    private int userId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    public List<WeekDays> getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(List<WeekDays> timeSlot) {
        this.timeSlot = timeSlot;
    }

    private List<WeekDays> timeSlot;


}

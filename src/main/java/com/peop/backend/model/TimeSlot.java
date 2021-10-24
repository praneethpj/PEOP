package com.peop.backend.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * @author Praneethpj
 */

@Entity
@Table(name = "timeslots")
public class TimeSlot extends  DateAudit{

    public TimeSlot(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


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

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "wd_id")
    private List<WeekDays> timeSlot;

}

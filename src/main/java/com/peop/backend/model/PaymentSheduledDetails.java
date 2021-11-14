package com.peop.backend.model;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Praneethpj
 */

public class PaymentSheduledDetails extends DateAudit{


    private Long id;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private Long professionId;

    public Long getProfessionId() {
        return professionId;
    }

    public void setProfessionId(Long professionId) {
        this.professionId = professionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getSheduledDate() {
        return sheduledDate;
    }

    public void setSheduledDate(Date sheduledDate) {
        this.sheduledDate = sheduledDate;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    private Long userId;

    private Date sheduledDate;

    private String time;

    public Long getTimeid() {
        return timeid;
    }

    public void setTimeid(Long timeid) {
        this.timeid = timeid;
    }

    private Long timeid;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    private int status;

    public int getCallStatus() {
        return callStatus;
    }

    public void setCallStatus(int callStatus) {
        this.callStatus = callStatus;
    }

    private int callStatus;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

}

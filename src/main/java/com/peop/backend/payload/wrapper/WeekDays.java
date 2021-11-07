package com.peop.backend.payload.wrapper;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Praneethpj
 */

public class WeekDays {

   public WeekDays(){

   }


   private String dayname;

   public List<TimeFields> getTimes() {
      return times;
   }

   public void setTimes(List<TimeFields> times) {
      this.times = times;
   }


   private List<TimeFields> times;


   public String getDayname() {
      return dayname;
   }

   public void setDayname(String dayname) {
      this.dayname = dayname;
   }



   public boolean isAvailable() {
      return available;
   }

   public void setAvailable(boolean available) {
      this.available = available;
   }

   private boolean available=true;

   public Long getUid() {
      return uid;
   }

   public void setUid(Long uid) {
      this.uid = uid;
   }

   private Long uid;

}

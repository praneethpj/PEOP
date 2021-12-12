package com.peop.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

/**
 * @author Praneethpj
 */
@Entity
public class WeekDays {

   public WeekDays(){

   }

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;


   private String dayname;

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public List<TimeFields> getTimes() {
      return times;
   }

   public void setTimes(List<TimeFields> times) {
      this.times = times;
   }

   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
   @JoinColumn(name = "tf_id")
   @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
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
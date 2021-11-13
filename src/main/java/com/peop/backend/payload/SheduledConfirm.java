package com.peop.backend.payload;

/**
 * @author Praneethpj
 */
public class SheduledConfirm {
    private Long roomid;

    public Long getRoomid() {
        return roomid;
    }

    public void setRoomid(Long roomid) {
        this.roomid = roomid;
    }

    public String getProfessionid() {
        return professionid;
    }

    public void setProfessionid(String professionid) {
        this.professionid = professionid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

 

    private String professionid;
    private String userid;

}

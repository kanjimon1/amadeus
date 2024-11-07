package com.eafit.extra.hours.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class UserExtraHoursDTO {
    private String employeeId;
    private String email;
    private String employeeName;
    private BigDecimal salary;
    private String areaName;
    private String jobName;
    private BigDecimal amountExtraHours;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    private BigDecimal totalExtraHour;
    private BigDecimal totalPayment;
    private String extraHourTypeDescription;

    // Constructors
    public UserExtraHoursDTO() {}

    public UserExtraHoursDTO(String employeeId, String email, String employeeName, BigDecimal salary,
                             String areaName, String jobName, BigDecimal amountExtraHours,
                             LocalDateTime startDatetime, LocalDateTime endDatetime,
                             BigDecimal totalExtraHour, BigDecimal totalPayment, String extraHourTypeDescription) {
        this.employeeId = employeeId;
        this.email = email;
        this.employeeName = employeeName;
        this.salary = salary;
        this.areaName = areaName;
        this.jobName = jobName;
        this.amountExtraHours = amountExtraHours;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
        this.totalExtraHour = totalExtraHour;
        this.totalPayment = totalPayment;
        this.extraHourTypeDescription = extraHourTypeDescription;
    }

    // Getters and setters for each field

    /*public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public BigDecimal getAmountExtraHours() {
        return amountExtraHours;
    }

    public void setAmountExtraHours(BigDecimal amountExtraHours) {
        this.amountExtraHours = amountExtraHours;
    }

    public LocalDateTime getStartDatetime() {
        return startDatetime;
    }

    public void setStartDatetime(LocalDateTime startDatetime) {
        this.startDatetime = startDatetime;
    }

    public LocalDateTime getEndDatetime() {
        return endDatetime;
    }

    public void setEndDatetime(LocalDateTime endDatetime) {
        this.endDatetime = endDatetime;
    }

    public BigDecimal getTotalExtraHour() {
        return totalExtraHour;
    }

    public void setTotalExtraHour(BigDecimal totalExtraHour) {
        this.totalExtraHour = totalExtraHour;
    }

    public BigDecimal getTotalPayment() {
        return totalPayment;
    }

    public void setTotalPayment(BigDecimal totalPayment) {
        this.totalPayment = totalPayment;
    }

    public String getExtraHourTypeDescription() {
        return extraHourTypeDescription;
    }

    public void setExtraHourTypeDescription(String extraHourTypeDescription) {
        this.extraHourTypeDescription = extraHourTypeDescription;
    }*/
}

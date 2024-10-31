package com.eafit.extra.hours.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "work_schedule", schema = "extra_hours")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scheduleId;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @ManyToOne // Many schedules can be assigned to one employee
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id", nullable = false)
    private Employees employee;

    @ManyToOne // Many schedules can have one job
    @JoinColumn(name = "job_id", referencedColumnName = "job_id", nullable = false)
    private Jobs job;
}

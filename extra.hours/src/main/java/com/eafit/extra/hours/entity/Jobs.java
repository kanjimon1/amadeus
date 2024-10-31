package com.eafit.extra.hours.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jobs", schema = "extra_hours")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id") // Specify column name to match employees' foreign key
    private Integer jobId;

    @Column(name = "job_name", nullable = false, length = 50)
    private String jobName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}

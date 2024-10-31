package com.eafit.extra.hours.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "HourTypes", schema = "extra_hours")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HourTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "description", nullable = false, length = 50)
    private String description;

    @Column(name = "percentage", nullable = false, precision = 10, scale = 2)
    private BigDecimal percentage;

}

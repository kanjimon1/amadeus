package com.eafit.extra.hours.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "areas", schema = "extra_hours")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Areas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "area_id") // Make sure to explicitly specify this column name for clarity
    private Integer id;

    @Column(name = "area_name", nullable = false, length = 50)
    private String areaName;
}

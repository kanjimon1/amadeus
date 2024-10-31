package com.eafit.extra.hours.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "employees")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Employees {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /*@Column(name = "employee_id")
    @NotBlank(message = "El employee id no puede estar vacía")
    private String employeeId;*/

    /*@OneToOne
    @JoinColumn(name = "employee_id")
    private OurUsers user;*/

    @Column(name = "employee_id", unique = true, nullable = false) // specify that employee_id is the primary key
    @NotBlank(message = "El employee id no puede estar vacío")
    private String employeeId;

    @Column(name = "employee_name")
    @NotBlank(message = "El employee name no puede estar vacía")
    private String employeeName;

    @ManyToOne // Relationship to Jobs entity
    @JoinColumn(name = "job_id", referencedColumnName = "job_id", nullable = false)
    private Jobs job;

    @Column(name = "salary")
    @NotBlank(message = "El salario no puede estar vacía")
    private BigDecimal salary;

    @Column(name = "manager")
    @NotBlank(message = "El manager no puede estar vacía")
    private String manager;

    @ManyToOne // Relationship to Areas entity
    @JoinColumn(name = "area_id", referencedColumnName = "area_id", nullable = false)
    private Areas area;
}

package com.eafit.extra.hours.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "extra_hours", schema = "extra_hours")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@NamedStoredProcedureQuery(
        name = "UpdateITEmployeeExtraHours",
        procedureName = "UpdateITEmployeeExtraHours",
        parameters = {
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "employee_id", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "hourPrice", type = Integer.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "StartDatetime", type = LocalDateTime.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "endDatetime", type = LocalDateTime.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "ExtraHourType", type = Integer.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "AmountExtraHours", type = Integer.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "Comments", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "TotalExtraHour", type = Integer.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "TotalPayment", type = Integer.class),
                //@StoredProcedureParameter(mode = ParameterMode.IN, name = "employee_id", type = String.class),

        }
)
public class HorasExtras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "hour_price", precision = 10, scale = 2)
    private BigDecimal hourPrice;

    @Column(name = "start_datetime")
    private LocalDateTime startDatetime;

    @Column(name = "end_datetime")
    private LocalDateTime endDatetime;

    @Column(name = "amount_extra_hours", precision = 5, scale = 2)
    private BigDecimal amountExtraHours;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

    @Column(name = "total_extra_hour", precision = 10, scale = 2)
    private BigDecimal totalExtraHour;

    @Column(name = "total_payment", precision = 10, scale = 2)
    private BigDecimal totalPayment;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id", nullable = false)
    private Employees employee;  // Reference Employees entity

    @ManyToOne
    @JoinColumn(name = "extra_hour_type", referencedColumnName = "id", nullable = false)
    private HourTypes extraHourType;  // Reference HourTypes entity


}

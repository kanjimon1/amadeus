package com.eafit.extra.hours.repository;

import com.eafit.extra.hours.dto.ExtraHoursDTO;
import com.eafit.extra.hours.entity.HorasExtras;
import com.eafit.extra.hours.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExtraHoursRepository extends JpaRepository<HorasExtras, String> {

    //List<HorasExtras> findByEmployeeId(Long employeeId);
    List<HorasExtras> findByEmployeeId(HorasExtras employeeId);

    @Procedure(name = "UpdateITEmployeeExtraHours")
    void updateExtraHours(
            @Param("employeeId") String employeeId,
            @Param("startDatetime") LocalDateTime startDatetime,
            @Param("hourPrice") BigDecimal hourPrice,
            @Param("endDatetime") LocalDateTime endDatetime,
            @Param("amountExtraHours") BigDecimal amountExtraHours,
            @Param("comments") String comments,
            @Param("totalExtraHour") BigDecimal totalExtraHour,
            @Param("totalPayment") BigDecimal totalPayment,
            @Param("employee") Integer employee,
            @Param("extraHourType") Integer extraHourType
    );

    /*@Procedure(name = "UpdateITEmployeeExtraHours")
    void updateExtraHours(@Param("ExtraHoursDTO") ExtraHoursDTO updateExtraHoursDTO);*/

}

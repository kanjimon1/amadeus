package com.eafit.extra.hours.controller;

import com.eafit.extra.hours.dto.ExtraHoursDTO;
import com.eafit.extra.hours.dto.UserExtraHoursDTO;
import com.eafit.extra.hours.entity.HorasExtras;
import com.eafit.extra.hours.service.ExtraHoursService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class AdminExtraHours {

    @Autowired
    private ExtraHoursService extraHoursService;

    /*@PostMapping("/update")
    public void updateExtrahours(
            @RequestParam Long employeeId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startDatetime,
            @RequestParam BigDecimal hourPrice,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endDatetime,
            @RequestParam BigDecimal amountExtraHours,
            @RequestParam String comments,
            @RequestParam BigDecimal totalExtraHour,
            @RequestParam BigDecimal totalPayment,
            @RequestParam Integer employee,
            @RequestParam Integer extraHourType
    ) {
        extraHoursService.updateExtraHours(
                employeeId,
                startDatetime,
                hourPrice,
                endDatetime,
                amountExtraHours,
                comments,
                totalExtraHour,
                totalPayment,
                employee,
                extraHourType
        );
    }*/

    @GetMapping("/list-eh")
    public List<HorasExtras> getAllExtraHours() {
        return extraHoursService.getAllExtraHours();
    }

    /*@GetMapping("/list-eh-user")
    public List<HorasExtras> getAllExtraHoursByUser() {
        return extraHoursService.getAllExtraHours();
    }*/

    @GetMapping("/list-eh-user")
    public List<UserExtraHoursDTO> getAllExtraHoursByUser(@RequestParam("email") String email) {
        return extraHoursService.getExtraHoursByEmail(email);
    }

    @PostMapping("/update")
    public ResponseEntity<Void> updateExtrahours(@RequestBody @Valid ExtraHoursDTO extraHoursDTO) {
        extraHoursService.updateExtraHours(extraHoursDTO);
        return ResponseEntity.ok().build();
    }

}

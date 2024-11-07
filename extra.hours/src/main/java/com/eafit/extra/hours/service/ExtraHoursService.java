package com.eafit.extra.hours.service;

import com.eafit.extra.hours.dto.ExtraHoursDTO;
import com.eafit.extra.hours.dto.UserExtraHoursDTO;
import com.eafit.extra.hours.entity.HorasExtras;
import com.eafit.extra.hours.repository.ExtraHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ExtraHoursService {

    private static final Logger logger = LoggerFactory.getLogger(ExtraHoursService.class);

    @Autowired
    private ExtraHoursRepository extraHoursRepository;

    public List<HorasExtras> getAllExtraHours() {
        //return extraHoursRepository.findAll();
        List<HorasExtras> extraHours = extraHoursRepository.findAll();
        logger.info("Extra hours retrieved: {}", extraHours);
        return extraHours;
    }

    /*public List<HorasExtras> getAllExtraHoursByUser() {
        //return extraHoursRepository.findAll();
        List<HorasExtras> extraHours = extraHoursRepository.findUserExtraHoursByEmail();
        logger.info("User extra hours retrieved: {}", extraHours);
        return extraHours;
    }*/

    public List<UserExtraHoursDTO> getExtraHoursByEmail(String email) {
        return extraHoursRepository.findUserExtraHoursByEmail(email);
    }

    /*public HorasExtras saveExtraHours(ExtraHoursDTO extraHoursDTO){
        HorasExtras horasExtras = new HorasExtras();

        //horasExtras.setEmployee(extraHoursDTO.getEmployeeId());
        //horasExtras.setHourPrice(extraHoursDTO.getHourPrice());
        horasExtras.setStartDatetime(extraHoursDTO.getStartTime());
        horasExtras.setEndDatetime(extraHoursDTO.getEndTime());
        //horasExtras.setTotalExtraHour(extraHoursDTO.getTotalHours());
        //horasExtras.set
    }*/

    /*public void updateExtraHours(long employeeId, int extraHours){
        extraHoursRepository.updateExtraHours(employeeId,extraHours);
    }*/

    public void updateExtraHours(ExtraHoursDTO extraHoursDTO) {
                extraHoursRepository.updateExtraHours(
                        extraHoursDTO.getEmployeeId(),
                        extraHoursDTO.getStartDatetime(),
                        extraHoursDTO.getHourPrice(),
                        extraHoursDTO.getEndDatetime(),
                        extraHoursDTO.getAmountExtraHours(),
                        extraHoursDTO.getComments(),
                        extraHoursDTO.getTotalExtraHour(),
                        extraHoursDTO.getTotalPayment(),
                        extraHoursDTO.getEmployee(),
                        extraHoursDTO.getExtraHourType()
                );

    }
}

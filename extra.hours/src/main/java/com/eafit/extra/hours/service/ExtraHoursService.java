package com.eafit.extra.hours.service;

import com.eafit.extra.hours.dto.ExtraHoursDTO;
import com.eafit.extra.hours.entity.HorasExtras;
import com.eafit.extra.hours.repository.ExtraHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExtraHoursService {

    @Autowired
    private ExtraHoursRepository extraHoursRepository;

    public List<HorasExtras> getAllExtraHours() {
        return extraHoursRepository.findAll();
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

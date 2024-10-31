package com.eafit.extra.hours.repository;

import com.eafit.extra.hours.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeesRepository extends JpaRepository<Employees, String> {
    Optional<Employees> findByEmployeeId(String employeeId);
}

package com.eafit.extra.hours.service;

import com.eafit.extra.hours.dto.ReqRes;
import com.eafit.extra.hours.entity.Employees;
import com.eafit.extra.hours.entity.OurUsers;
import com.eafit.extra.hours.repository.EmployeesRepository;
import com.eafit.extra.hours.repository.UsersRepo;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UsersManagementService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private EmployeesRepository employeesRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //public ReqRes register(ReqRes registrationRequest){
        public ReqRes register(ReqRes request){
        ReqRes resp = new ReqRes();

        try {

            // Validaciones básicas
            validateRequest(request);

            // Buscar empleado
            Employees employee = employeesRepository.findByEmployeeId(request.getEmployeeId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "No se encontró el empleado con ID: " + request.getEmployeeId()));

            // Crear usuario con valores por defecto
            OurUsers newUser = OurUsers.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .employee(employee)
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .enabled(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            // Guardar usuario
            OurUsers savedUser = usersRepo.save(newUser);

            // Preparar respuesta exitosa
            resp.setStatusCode(200);
            resp.setMessage("Usuario guardado correctamente");
            resp.setOurUsers(savedUser);

        } catch (IllegalArgumentException e) {
            log.error("Error de validación: {}", e.getMessage());
            resp.setStatusCode(400);
            resp.setError("Error de validación: " + e.getMessage());

        } catch (EntityNotFoundException e) {
            log.error("Error al buscar empleado: {}", e.getMessage());
            resp.setStatusCode(404);
            resp.setError(e.getMessage());

        } catch (DataIntegrityViolationException e) {
            log.error("Error de integridad de datos: {}", e.getMessage());
            resp.setStatusCode(400);
            resp.setError("El email ya existe o hay un problema con los datos proporcionados");

        } catch (Exception e) {
            log.error("Error inesperado: {}", e.getMessage(), e);
            resp.setStatusCode(500);
            resp.setError("Error interno del servidor: " + e.getMessage());
        }


            /*OurUsers ourUser = new OurUsers();

            ourUser.setEmployee(registrationRequest.getOurUsers().getEmployee());
            //ourUser.setEmployee(registrationRequest.getEmployees());
            ourUser.setEmail(registrationRequest.getEmail());
            //ourUser.setName(registrationRequest.getName());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            //ourUser.setCity(registrationRequest.getCity());
            ourUser.setRole(registrationRequest.getRole());
            OurUsers ourUsersResult = usersRepo.save(ourUser);
            if(ourUsersResult.getId()>0){
                //List<OurUsers> usersList = new ArrayList<>();
                //usersList.add(ourUsersResult);
                resp.setOurUsers(ourUsersResult);
                resp.setMessage("Usuario guardado correctamente");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
            //throw new RuntimeException(e);
        }*/
        return resp;
    }

    private void validateRequest(ReqRes request) {
        List<String> errors = new ArrayList<>();

        if (request == null) {
            throw new IllegalArgumentException("La solicitud no puede ser nula");
        }

        if (StringUtils.isEmpty(request.getEmail())) {
            errors.add("El email es requerido");
        }

        if (StringUtils.isEmpty(request.getPassword())) {
            errors.add("La contraseña es requerida");
        }

        if (StringUtils.isEmpty(request.getRole())) {
            errors.add("El rol es requerido");
        }

        if (StringUtils.isEmpty(request.getEmployeeId())) {
            errors.add("El ID del empleado es requerido");
        }

        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(
                    "Errores de validación: " + String.join(", ", errors));
        }
    }

    public ReqRes login(ReqRes loginRequest){

        ReqRes response = new ReqRes();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(),user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("login correcto");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            //throw new RuntimeException(e);
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest){
        ReqRes response = new ReqRes();

        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            OurUsers ourUsers = usersRepo.findByEmail(ourEmail).orElseThrow();
            if(jwtUtils.isTokenValid(refreshTokenRequest.getToken(),ourUsers)){
                var jwt = jwtUtils.generateToken(ourUsers);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hrs");
                response.setMessage("Token actualizado con éxito");
            }
            response.setStatusCode(200);
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            //throw new RuntimeException(e);
        }
        return response;
    }

    public ReqRes getMyInfo(String email){

        ReqRes reqRes = new ReqRes();

        try{
            Optional<OurUsers> usersOptional = usersRepo.findByEmail(email);
            //List<OurUsers> usersOptional = usersRepo.findByEmail(email);

            if (usersOptional.isPresent()){
                reqRes.setOurUsers(usersOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            }else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Usuario no encontrado");
            }
        } catch (Exception e) {
            //throw new RuntimeException(e);
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error obteniendo la info del usuario: "+e.getMessage());
        }
        return reqRes;
    }
}

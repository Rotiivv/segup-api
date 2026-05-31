package backend.segup.api.controller;

import backend.segup.api.domain.registration.DTOs.FindAllRegistrations;
import backend.segup.api.domain.registration.Registration;
import backend.segup.api.domain.registration.DTOs.CreateRegistrationDTO;
import backend.segup.api.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<Registration> create(@RequestBody CreateRegistrationDTO body) {
        Registration newRegistration = this.registrationService.createRegistration(body);

        return ResponseEntity.ok(newRegistration);
    }

    @PostMapping("/all")
    public ResponseEntity<List<Registration>> listRegistrationsByCpf(@RequestBody FindAllRegistrations body) {
        List<Registration> registrations = this.registrationService.findRegistrationsByCpf(body.cpf());

        return ResponseEntity.ok(registrations);
    }
}

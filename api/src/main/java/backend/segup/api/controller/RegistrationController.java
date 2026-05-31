package backend.segup.api.controller;

import backend.segup.api.domain.registration.Registration;
import backend.segup.api.domain.registration.RegistrationRequestDTO;
import backend.segup.api.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<Registration> create(@RequestBody RegistrationRequestDTO body) {
        Registration newRegistration = this.registrationService.createRegistration(body);

        return ResponseEntity.ok(newRegistration);
    }
}

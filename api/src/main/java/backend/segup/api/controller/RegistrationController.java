package backend.segup.api.controller;

import backend.segup.api.domain.registration.DTOs.CreateRegistrationResponseDTO;
import backend.segup.api.domain.registration.DTOs.UpdateDesiredServiceDTO;
import backend.segup.api.domain.registration.Registration;
import backend.segup.api.domain.registration.DTOs.CreateRegistrationDTO;
import backend.segup.api.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registration")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<CreateRegistrationResponseDTO> create(@RequestBody @Valid CreateRegistrationDTO body) {
        CreateRegistrationResponseDTO newRegistration = this.registrationService.createRegistration(body);

        return ResponseEntity.ok(newRegistration);
    }

    @GetMapping("/{cpf}/all")
    public ResponseEntity<List<Registration>> listRegistrationsByCpf(@PathVariable String cpf) {
        List<Registration> registrations = this.registrationService.findRegistrationsByCpf(cpf);

        return ResponseEntity.ok(registrations);
    }

    @PatchMapping("/{id}/service")
    public ResponseEntity<Registration> updateService(@PathVariable UUID id, @RequestBody @Valid UpdateDesiredServiceDTO body) {
        Registration updatedRegistration = this.registrationService.updateServiceRegistration(id, body);

        return ResponseEntity.ok(updatedRegistration);
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Registration> cancelRegistration(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                registrationService.cancelRegistration(id)
        );
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<Registration> confirmRegistration(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                registrationService.confirmRegistration(id)
        );
    }
}

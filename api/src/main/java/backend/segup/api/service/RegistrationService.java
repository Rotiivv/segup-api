package backend.segup.api.service;

import backend.segup.api.domain.registration.Registration;
import backend.segup.api.domain.registration.RegistrationRequestDTO;
import backend.segup.api.repositories.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RegistrationService {
    private final RegistrationRepository repository;

    public RegistrationService(RegistrationRepository repository) {
        this.repository = repository;
    }

    public Registration createRegistration(RegistrationRequestDTO data) {
        Registration newRegistration = new Registration();

         newRegistration.setCpf(data.cpf());
         newRegistration.setFullName(data.fullName());
         newRegistration.setEmail(data.email());
         newRegistration.setPhone(data.phone());
         newRegistration.setDesiredService(data.desiredService());
         newRegistration.setStatus(data.status());
         newRegistration.setObservation(data.observation());
         newRegistration.setProtocol(generateProtocol());

         return repository.save(newRegistration);
    }


    private String generateProtocol() {
        return "PR-" + UUID.randomUUID().toString().substring(0, 36).toUpperCase();
    }
}

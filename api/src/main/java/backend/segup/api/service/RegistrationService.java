package backend.segup.api.service;

import backend.segup.api.domain.registration.Registration;
import backend.segup.api.domain.registration.RegistrationRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    public Registration createRegistration(RegistrationRequestDTO data) {
        Registration newRegistration = new Registration();

         newRegistration.setCpf(data.cpf());
         newRegistration.setFullName(data.fullName());
         newRegistration.setEmail(data.email());
         newRegistration.setPhone(data.phone());
         newRegistration.setDesiredService(data.desiredService());
         newRegistration.setStatus(data.status());
         newRegistration.setObservation(data.observation());

         return newRegistration;
    }
}

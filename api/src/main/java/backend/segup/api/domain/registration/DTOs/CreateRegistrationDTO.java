package backend.segup.api.domain.registration.DTOs;

import backend.segup.api.domain.registration.Registration;

public record CreateRegistrationDTO(String cpf, String fullName, String email, String phone, Registration.DesiredServiceType desiredService, String observation) {
}

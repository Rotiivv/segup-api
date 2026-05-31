package backend.segup.api.domain.registration;

public record RegistrationRequestDTO(String cpf, String fullName, String email, String phone, Registration.DesiredServiceType desiredService, Registration.StatusType status, String observation) {
}

package backend.segup.api.domain.registration.DTOs;

import backend.segup.api.domain.registration.Registration;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateRegistrationDTO(

        @NotBlank(message = "CPF é obrigatório")
        String cpf,

        @NotBlank(message = "Nome completo é obrigatório")
        String fullName,

        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @NotBlank(message = "Telefone é obrigatório")
        String phone,

        @NotNull(message = "Serviço desejado é obrigatório")
        Registration.DesiredServiceType desiredService,

        String observation

) {
}
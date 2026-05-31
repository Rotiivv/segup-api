package backend.segup.api.domain.registration.DTOs;

import backend.segup.api.domain.registration.Registration;
import jakarta.validation.constraints.NotNull;

public record UpdateDesiredServiceDTO(

        @NotNull(message = "Serviço desejado é obrigatório")
        Registration.DesiredServiceType desiredService

) {
}

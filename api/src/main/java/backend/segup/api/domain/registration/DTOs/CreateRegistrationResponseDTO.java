package backend.segup.api.domain.registration.DTOs;

import backend.segup.api.domain.registration.Registration;

import java.util.UUID;

public record CreateRegistrationResponseDTO(
                                            String protocol,
                                            Registration.DesiredServiceType desiredService,
                                            Registration.StatusType status,
                                            String redirectUrl) {

}

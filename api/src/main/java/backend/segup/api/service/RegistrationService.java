package backend.segup.api.service;

import backend.segup.api.domain.registration.DTOs.UpdateDesiredServiceDTO;
import backend.segup.api.domain.registration.Registration;
import backend.segup.api.domain.registration.DTOs.CreateRegistrationDTO;
import backend.segup.api.repositories.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RegistrationService {
    private final RegistrationRepository repository;

    public RegistrationService(RegistrationRepository repository) {
        this.repository = repository;
    }

    public Registration createRegistration(CreateRegistrationDTO data) {
        Registration newRegistration = new Registration();

         newRegistration.setCpf(data.cpf());
         newRegistration.setFullName(data.fullName());
         newRegistration.setEmail(data.email());
         newRegistration.setPhone(data.phone());
         newRegistration.setDesiredService(data.desiredService());
         newRegistration.setStatus(Registration.StatusType.CONFIRMED);
         newRegistration.setObservation(data.observation());
         newRegistration.setProtocol(generateProtocol());

         return repository.save(newRegistration);
    }

    public List<Registration> findRegistrationsByCpf(String cpf) {
        return repository.findAllByCpf(cpf);
    }


    public Registration updateServiceRegistration(UUID id, UpdateDesiredServiceDTO data) {
//        verifico se existe
        Registration registration = repository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Inscrição não encontrada"));

//    verifico se o status nao e cancelado
    if (registration.getStatus() == Registration.StatusType.CANCELED) {
        throw new RuntimeException("Inscrição cancelada não pode ser alterada.");
    }

    Registration.DesiredServiceType newService = data.desiredService();

    // verfico se ja nao existe outra resgistration com o mesmo servico
    boolean alreadyExists =
            repository.existsByCpfAndDesiredServiceAndIdNot(
                    registration.getCpf(),
                    newService,
                    id
            );

    if (alreadyExists) {
        throw new RuntimeException(
                "Este CPF já possui inscrição neste serviço."
        );
    }

    registration.setDesiredService(newService);

    return repository.save(registration);
    };


    private String generateProtocol() {
        return "PR-" + UUID.randomUUID().toString().substring(0, 36).toUpperCase();
    }
}

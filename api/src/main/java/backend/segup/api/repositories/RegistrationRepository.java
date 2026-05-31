package backend.segup.api.repositories;

import backend.segup.api.domain.registration.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RegistrationRepository extends JpaRepository<Registration, UUID> {
    List<Registration> findAllByCpf(String cpf);
}

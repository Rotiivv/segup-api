package backend.segup.api.domain.registration;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "registrations")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String cpf;

    private String fullName;

    private String email;

    private String phone;

    @Enumerated(EnumType.STRING)
    private DesiredServiceType desiredService;

    @Enumerated(EnumType.STRING)
    private EventStatusType status;

    private String protocol;

    private String observation;

    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    public enum EventStatusType {
        CONFIRMADO,
        CANCELADO
    }

    public enum DesiredServiceType {
        PYTHONNORTE,
        AWSNORTE,
        NODENORTE,
        JAVANORTE,
        RUBINORTE
    }
}

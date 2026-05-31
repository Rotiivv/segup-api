package backend.segup.api.exceptions;

public class RegistrationCanceledException extends RuntimeException {
    public RegistrationCanceledException(String message) {
        super(message);
    }
}

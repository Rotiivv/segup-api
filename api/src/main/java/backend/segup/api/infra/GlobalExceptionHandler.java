package backend.segup.api.infra;

import backend.segup.api.exceptions.RegistrationAlreadyExistException;
import backend.segup.api.exceptions.RegistrationCanceledException;
import backend.segup.api.exceptions.RegistrationNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RegistrationNotFoundException.class)
    public ResponseEntity<String> handleNotFound(RegistrationNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exception.getMessage());
    }

    @ExceptionHandler(RegistrationAlreadyExistException.class)
    public ResponseEntity<String> handleAlreadyExists(
            RegistrationAlreadyExistException exception
    ) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(exception.getMessage());
    }

    @ExceptionHandler(RegistrationCanceledException.class)
    public ResponseEntity<String> handleCanceledRegistration(
            RegistrationCanceledException exception
    ) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(exception.getMessage());
    }

}

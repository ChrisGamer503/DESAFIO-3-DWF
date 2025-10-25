package sv.edu.udb.desafio1.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiError {
    private int status;
    private String error;
    private String message;
    private Map<String, String> fieldErrors; // optional, for validation details
    private LocalDateTime timestamp;
}

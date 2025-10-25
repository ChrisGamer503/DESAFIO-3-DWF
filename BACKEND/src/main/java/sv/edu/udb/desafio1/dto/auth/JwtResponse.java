package sv.edu.udb.desafio1.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    @Builder.Default
    private String tokenType = "Bearer";
    private String email;
    private String role;
}
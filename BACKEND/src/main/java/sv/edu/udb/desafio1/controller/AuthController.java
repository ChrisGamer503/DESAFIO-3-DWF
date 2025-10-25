package sv.edu.udb.desafio1.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio1.dto.auth.JwtResponse;
import sv.edu.udb.desafio1.dto.auth.LoginRequest;
import sv.edu.udb.desafio1.service.security.JwtService;

@RestController
@RequestMapping("/api/auth") // Endpoint Público: /api/auth/login
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints para inicio de sesión y generación de JWT")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @PostMapping("/login")
    @Operation(summary = "Inicio de Sesión", description = "Autentica al usuario y devuelve un token JWT")
    public ResponseEntity<JwtResponse> authenticate(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String jwt = jwtService.generateToken(userDetails);

        String userRole = userDetails.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER")
                .replace("ROLE_", "");

        return ResponseEntity.ok(JwtResponse.builder()
                .token(jwt)
                .email(request.getEmail())
                .role(userRole)
                .build());
    }
}
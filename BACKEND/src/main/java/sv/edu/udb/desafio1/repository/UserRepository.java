package sv.edu.udb.desafio1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.desafio1.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);
}

package sv.edu.udb.desafio1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.desafio1.model.Subscription;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUserId(Long userId);
}

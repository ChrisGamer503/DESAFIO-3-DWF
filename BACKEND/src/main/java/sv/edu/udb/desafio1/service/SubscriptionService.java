package sv.edu.udb.desafio1.service;

import sv.edu.udb.desafio1.dto.SubscriptionDTO;
import sv.edu.udb.desafio1.model.Subscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SubscriptionService {
    List<Subscription> getAllSubscriptions();
    Page<Subscription> getAllSubscriptionsPaged(Pageable pageable);
    Subscription createSubscription(SubscriptionDTO dto);
    Subscription updateSubscription(Long id, SubscriptionDTO dto);
    void deleteSubscription(Long id);
    List<Subscription> getSubscriptionsByUserId(Long userId);
}

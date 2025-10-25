package sv.edu.udb.desafio1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sv.edu.udb.desafio1.dto.SubscriptionDTO;
import sv.edu.udb.desafio1.exception.ResourceNotFoundException;
import sv.edu.udb.desafio1.model.Subscription;
import sv.edu.udb.desafio1.model.User;
import sv.edu.udb.desafio1.repository.SubscriptionRepository;
import sv.edu.udb.desafio1.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    @Override
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    @Override
    public Page<Subscription> getAllSubscriptionsPaged(Pageable pageable) {
        return subscriptionRepository.findAll(pageable);
    }

    @Override
    public Subscription createSubscription(SubscriptionDTO dto) {

        if (dto.getStartDate().isAfter(dto.getEndDate())) {
            throw new IllegalArgumentException("Start date must be before end date.");
        }

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + dto.getUserId()));

        Subscription s = new Subscription();
        s.setType(dto.getType());
        s.setStartDate(dto.getStartDate());
        s.setEndDate(dto.getEndDate());
        s.setUser(user);
        return subscriptionRepository.save(s);
    }

    @Override
    public Subscription updateSubscription(Long id, SubscriptionDTO dto) {
        if (dto.getStartDate().isAfter(dto.getEndDate())) {
            throw new IllegalArgumentException("Start date must be before or equal to end date.");
        }

        Subscription s = subscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found with id " + id));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + dto.getUserId()));

        s.setType(dto.getType());
        s.setStartDate(dto.getStartDate());
        s.setEndDate(dto.getEndDate());
        s.setUser(user);
        return subscriptionRepository.save(s);
    }


    @Override
    public void deleteSubscription(Long id) {
        if (!subscriptionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Subscription not found with id " + id);
        }
        subscriptionRepository.deleteById(id);
    }

    @Override
    public List<Subscription> getSubscriptionsByUserId(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }
}

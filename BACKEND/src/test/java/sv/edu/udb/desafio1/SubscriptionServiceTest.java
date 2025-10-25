package sv.edu.udb.desafio1;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sv.edu.udb.desafio1.dto.SubscriptionDTO;
import sv.edu.udb.desafio1.exception.ResourceNotFoundException;
import sv.edu.udb.desafio1.model.Subscription;
import sv.edu.udb.desafio1.model.User;
import sv.edu.udb.desafio1.service.*;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SubscriptionServiceTest {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserService userService;

    @Test
    void createSubscriptionSuccess() {
        User user = userService.createUser(new sv.edu.udb.desafio1.dto.UserDTO("Sub", "User", "subuser@example.com"));
        SubscriptionDTO dto = new SubscriptionDTO("Premium", LocalDate.now(), LocalDate.now().plusDays(30), user.getId());
        Subscription sub = subscriptionService.createSubscription(dto);
        assertNotNull(sub.getId());
        assertEquals("Premium", sub.getType());
    }

    @Test
    void createSubscriptionInvalidDates() {
        User user = userService.createUser(new sv.edu.udb.desafio1.dto.UserDTO("Invalid", "Date", "invaliddate@example.com"));
        SubscriptionDTO dto = new SubscriptionDTO("Basic", LocalDate.now().plusDays(10), LocalDate.now(), user.getId());
        assertThrows(IllegalArgumentException.class, () -> subscriptionService.createSubscription(dto));
    }

    @Test
    void getSubscriptionByUserId() {
        User user = userService.createUser(new sv.edu.udb.desafio1.dto.UserDTO("Search", "User", "searchuser@example.com"));
        subscriptionService.createSubscription(new SubscriptionDTO("Basic", LocalDate.now(), LocalDate.now().plusDays(10), user.getId()));
        List<Subscription> subs = subscriptionService.getSubscriptionsByUserId(user.getId());
        assertFalse(subs.isEmpty());
    }

    @Test
    void deleteSubscriptionSuccess() {
        User user = userService.createUser(new sv.edu.udb.desafio1.dto.UserDTO("Del", "User", "delsubuser@example.com"));
        Subscription sub = subscriptionService.createSubscription(new SubscriptionDTO("Basic", LocalDate.now(), LocalDate.now().plusDays(10), user.getId()));
        subscriptionService.deleteSubscription(sub.getId());
        assertThrows(ResourceNotFoundException.class, () -> subscriptionService.getSubscriptionsByUserId(user.getId()).get(0));
    }
}

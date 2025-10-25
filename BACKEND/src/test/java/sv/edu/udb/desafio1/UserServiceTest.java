package sv.edu.udb.desafio1;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sv.edu.udb.desafio1.dto.UserDTO;
import sv.edu.udb.desafio1.exception.ResourceNotFoundException;
import sv.edu.udb.desafio1.model.User;
import sv.edu.udb.desafio1.service.UserService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void createUserSuccess() {
        UserDTO dto = new UserDTO("Test", "User", "testuser@example.com");
        User created = userService.createUser(dto);
        assertNotNull(created.getId());
        assertEquals("Test", created.getFirstName());
    }

    @Test
    void getUserByIdNotFound() {
        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(999L));
    }

    @Test
    void deleteUserSuccess() {
        UserDTO dto = new UserDTO("Delete", "User", "deleteuser@example.com");
        User created = userService.createUser(dto);
        userService.deleteUser(created.getId());
        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(created.getId()));
    }
}

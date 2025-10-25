package sv.edu.udb.desafio1.service;

import sv.edu.udb.desafio1.dto.UserDTO;
import sv.edu.udb.desafio1.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    Page<User> getAllUsersPaged(Pageable pageable);
    User createUser(UserDTO userDTO);
    User updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    User getUserById(Long id);
}

package sv.edu.udb.desafio1.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio1.dto.UserDTO;
import sv.edu.udb.desafio1.model.User;
import sv.edu.udb.desafio1.service.UserService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "Get All user", description = "You can get all users here")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<User> safeUsers = users.stream().map(user -> {
            User u = new User();
            u.setId(user.getId());
            u.setFirstName(user.getFirstName());
            u.setLastName(user.getLastName());
            u.setEmail(user.getEmail());
            return u;
        }).toList();
        return ResponseEntity.ok(safeUsers);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get users by id", description = "You can select a user with an id")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        User u = new User();
        u.setId(user.getId());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setEmail(user.getEmail());
        return ResponseEntity.ok(u);
    }

    @GetMapping("/paged")
    @Operation(summary = "Get users with pagination", description = "Retrieve users with pagination and sorting")
    public ResponseEntity<Page<User>> getUsersPaged(Pageable pageable) {
        Page<User> users = userService.getAllUsersPaged(pageable);
        Page<User> safePage = users.map(user -> {
            User u = new User();
            u.setId(user.getId());
            u.setFirstName(user.getFirstName());
            u.setLastName(user.getLastName());
            u.setEmail(user.getEmail());
            return u;
        });
        return ResponseEntity.ok(safePage);
    }

    @PostMapping
    @Operation(summary = "Create user", description = "Creates a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
        User created = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user", description = "Update user by ID")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        User updated = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user", description = "Delete user by ID")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

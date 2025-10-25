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
import sv.edu.udb.desafio1.dto.BookDTO;
import sv.edu.udb.desafio1.model.Book;
import sv.edu.udb.desafio1.service.BookService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    @Operation(summary = "Get all books", description = "Retrieve a list of all books")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/paged")
    @Operation(summary = "Get books with pagination", description = "Retrieve books with pagination and optional sorting")
    public ResponseEntity<Page<Book>> getBooksPaged(Pageable pageable) {
        return ResponseEntity.ok(bookService.getAllBooksPaged(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get book by ID", description = "Retrieve a book using its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found"),
            @ApiResponse(responseCode = "404", description = "Book not found")
    })
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new book", description = "Creates a new book with title, author, and publication year")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Book created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<Book> createBook(@Valid @RequestBody BookDTO bookDTO) {
        Book created = bookService.createBook(bookDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update book", description = "Update book details by ID")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody BookDTO bookDTO) {
        Book updated = bookService.updateBook(id, bookDTO);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/search")
    @Operation(summary = "Search books by title", description = "Search books using a title keyword")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String title) {
        return ResponseEntity.ok(bookService.searchBooksByTitle(title));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete book", description = "Delete a book by ID")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}

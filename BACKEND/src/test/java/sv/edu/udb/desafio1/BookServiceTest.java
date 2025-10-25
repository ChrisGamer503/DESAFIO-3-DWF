package sv.edu.udb.desafio1;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sv.edu.udb.desafio1.dto.BookDTO;
import sv.edu.udb.desafio1.exception.ResourceNotFoundException;
import sv.edu.udb.desafio1.model.Book;
import sv.edu.udb.desafio1.service.BookService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BookServiceTest {

    @Autowired
    private BookService bookService;

    @Test
    void createBookSuccess() {
        BookDTO dto = new BookDTO("Test Book", "Author Name", 2020);
        Book created = bookService.createBook(dto);
        assertNotNull(created.getId());
        assertEquals("Test Book", created.getTitle());
    }

    @Test
    void getBookByIdNotFound() {
        assertThrows(ResourceNotFoundException.class, () -> bookService.getBookById(999L));
    }

    @Test
    void deleteBookSuccess() {
        BookDTO dto = new BookDTO("Delete Book", "Author", 2021);
        Book created = bookService.createBook(dto);
        bookService.deleteBook(created.getId());
        assertThrows(ResourceNotFoundException.class, () -> bookService.getBookById(created.getId()));
    }

    @Test
    void searchBookByTitle() {
        BookDTO dto = new BookDTO("UniqueTitleXYZ", "Author", 2022);
        bookService.createBook(dto);
        List<Book> result = bookService.searchBooksByTitle("UniqueTitleXYZ");
        assertFalse(result.isEmpty());
    }
}

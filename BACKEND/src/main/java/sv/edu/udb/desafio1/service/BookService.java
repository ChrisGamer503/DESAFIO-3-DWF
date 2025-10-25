package sv.edu.udb.desafio1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sv.edu.udb.desafio1.dto.BookDTO;
import sv.edu.udb.desafio1.model.Book;

import java.util.List;

public interface BookService {
    List<Book> getAllBooks();
    Page<Book> getAllBooksPaged(Pageable pageable);
    Book createBook(BookDTO bookDTO);
    Book updateBook(Long id, BookDTO bookDTO);
    List<Book> searchBooksByTitle(String title);
    void deleteBook(Long id);
    Book getBookById(Long id);
}

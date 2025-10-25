package sv.edu.udb.desafio1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "books")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 150, message = "Title must be at most 150 characters")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is mandatory")
    @Size(max = 100, message = "Author must be at most 100 characters")
    @Column(nullable = false)
    private String author;

    @Min(value = 1500, message = "Publication year must be >= 1500")
    @Max(value = 2100, message = "Publication year must be <= 2100")
    @Column(name = "publication_year", nullable = false)
    private int publicationYear;
}

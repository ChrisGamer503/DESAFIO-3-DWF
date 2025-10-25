package sv.edu.udb.desafio1.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
    @NotBlank(message = "Title is mandatory")
    @Size(max = 150, message = "Title must be at most 150 characters")
    private String title;

    @NotBlank(message = "Author is mandatory")
    @Size(max = 100, message = "Author must be at most 100 characters")
    private String author;

    @Min(value = 1500, message = "Publication year must be >= 1500")
    @Max(value = 2100, message = "Publication year must be <= 2100")
    private int publicationYear;
}

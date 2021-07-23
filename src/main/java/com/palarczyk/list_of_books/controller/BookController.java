package com.palarczyk.list_of_books.controller;

import com.palarczyk.list_of_books.DTO.BookDto;
import com.palarczyk.list_of_books.assebler.BookDtoAssembler;
import com.palarczyk.list_of_books.domain.Book;
import com.palarczyk.list_of_books.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class BookController {

    private final BookService bookService;
    private final BookDtoAssembler bookDtoAssembler;


    public BookController(BookService bookService, BookDtoAssembler bookDtoAssembler) {
        this.bookService = bookService;
        this.bookDtoAssembler = bookDtoAssembler;
    }

    @CrossOrigin
    @PostMapping("/book")
    public BookDto create(@RequestBody BookDto bookDto) {
        Book book = new Book();
        book.setId(bookDto.getId());
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPublisher(bookDto.getPublisher());
        return bookDtoAssembler.toDto(bookService.save(book));
    }

    @CrossOrigin
    @GetMapping(value = "/books")
    public List<BookDto> all() {
        return bookService.all().stream()
                .map(bookDtoAssembler::toDto)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping(value = "/book/{id}")
    public BookDto one(@PathVariable Long id) {
        Book book = bookService.findById(id);
        return bookDtoAssembler.toDto(book);
    }

    @CrossOrigin
    @PutMapping(value = "/book/{id}")
    public BookDto update(@PathVariable Long id, @RequestBody BookDto bookDto) {
        Book book = bookService.getBookById(id);
        book.setAuthor(bookDto.getAuthor());
        book.setPublisher(bookDto.getPublisher());
        book.setTitle(bookDto.getTitle());
        return bookDtoAssembler.toDto(bookService.save(book));
    }

    @CrossOrigin
    @DeleteMapping(value = "/book/{id}")
    public BookDto delete(@PathVariable Long id) {
        Book book = bookService.findById(id);
        bookService.delete(book);
        return bookDtoAssembler.toDto(book);
    }


}

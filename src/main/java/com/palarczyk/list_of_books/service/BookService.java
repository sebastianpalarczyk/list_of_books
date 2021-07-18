package com.palarczyk.list_of_books.service;

import com.palarczyk.list_of_books.domain.Book;
import com.palarczyk.list_of_books.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book save(Book book){
        return bookRepository.save(book);
    }

    public List<Book> all(){
        return bookRepository.findAll();
    }
}

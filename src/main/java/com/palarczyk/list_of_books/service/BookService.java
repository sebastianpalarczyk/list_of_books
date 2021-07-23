package com.palarczyk.list_of_books.service;

import com.palarczyk.list_of_books.domain.Book;
import com.palarczyk.list_of_books.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Book findById(Long id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.get();
    }

    public Book getBookById(Long id){
        return bookRepository.getOne(id);
    }

    public void delete(Book book){
        bookRepository.delete(book);
    }
}

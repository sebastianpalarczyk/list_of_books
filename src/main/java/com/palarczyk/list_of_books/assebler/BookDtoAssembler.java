package com.palarczyk.list_of_books.assebler;

import com.palarczyk.list_of_books.DTO.BookDto;
import com.palarczyk.list_of_books.domain.Book;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class BookDtoAssembler {

    private final ModelMapper modelMapper;

    public BookDtoAssembler(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    public BookDto toDto(Book book){
        return modelMapper.map(book, BookDto.class);
    }

    public Book fromDto(BookDto bookDto){
        return modelMapper.map(bookDto,Book.class);
    }
}

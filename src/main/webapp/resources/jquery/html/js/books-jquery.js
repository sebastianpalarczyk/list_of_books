$(document).ready(function() {
   
    const tbody = $("tbody");
    
    function addBookToDom(book) {

        const row = $("<tr>");

        const title = $("<td>");
        title.attr("id", "td1");
        
        const titleAnchor = $("<a>");
        const divId = $("<div>");
        const divButton = $("<div>");
        const buttonUpdate = $("<button>");
        const buttonDelete = $("<button>");
        
        titleAnchor.attr("id", book.id);
        titleAnchor.html(`${book.title}`);

        divId.addClass("hidden");
        divButton.addClass("hidden");
        buttonUpdate.html("update");
        buttonUpdate.addClass("button");
        buttonUpdate.attr("id", book.id);
        buttonDelete.html("delete"); 
        
        title.append(titleAnchor);
        title.append(divButton);

        titleAnchor.on("mouseenter", function(){
            $.ajax({
                url: `http://localhost:8080/book/${$(this).attr("id")}`,
                method: "GET"
            }).done(() => {
                divButton.append(buttonUpdate);
                divButton.append(buttonDelete);
                divButton.toggleClass("hidden");
                divId.html($(this).attr("id"));
                title.append(divId);
            })
        })

        const author = $("<td>");
        author.html(book.author);
        author.attr("id", "td2");

        const publisher = $("<td>");
        publisher.html(book.publisher);
        publisher.attr("id", "td3");

        row.append(title);
        row.append(author);
        row.append(publisher);

        tbody.append(row);

        buttonDelete.on("click", function(){
            $.ajax({
                url: `http://localhost:8080/book/${book.id}`,
                method: "DELETE"
            }).done(response=>{
                if(response.ok){
                    const list = $("a");
                    list.each(function(index, element){
                        if(element.attr("id") === `${book.id}`){
                            let table = element.parent().parent().parent();
                            table.remove(element.parent().parent());
                        }
                    })
                }
            })

            location.reload();
        })

         buttonUpdate.on("click",updateBook);
    
    }

    const titleForm = $("#title");
    const authorForm = $("#author");
    const publisherForm = $("#publisher");
    const button = $("#submitForm");
    
+
    button.on("click", addBook);

    function addBook(event){
        event.preventDefault();
        
        const anchors = $("a");
        const id = anchors.last("a").attr("id");
        
        const book = {

            id: id+1,
            title: titleForm.val(),
            author: authorForm.val(),
            publisher: publisherForm.val(),

        }

        $.ajax({
            url: "http://localhost:8080/book",
            method: "POST",
            data: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(() => {
            console.log("Książka dodana!")
        }).fail(() => {
            console.log("Nie udało się dodać książki")
        })
         addBookToDom(book);

         location.reload();

    }

    function updateBook(){

    const button = $("#submitForm");
    button.off("click", addBook);

    const row = $(this).parent().parent().parent();
    const anchor = row.find("a");
    const bookId = anchor.attr("id");
    const title = row.children("#td1");
    const author = row.children("#td2");
    const publisher = row.children("#td3");
    
    titleForm.val(title.find("a").text());
    authorForm.val(author.text());
    publisherForm.val(publisher.text());
        
    button.on("click", function(event){
            event.preventDefault();
          
            const book = {

                id: bookId,
                title: titleForm.val(),
                author: authorForm.val(),
                publisher: publisherForm.val(),

            }
            
            $.ajax({
                url: `http://localhost:8080/book/${bookId}`,
                data: JSON.stringify(book),
                contentType: "application/json",
                method: "PUT"
            }).done(() => {
                console.log("Książka zaaktualizowana!")
            }).fail(()=>{
                console.log("Nie udało się zaaktualizować książki")
            })

            location.reload();

        })
        
    }

    $.ajax({
        url: "http://localhost:8080/books",
        method: "GET"
    }).done(response => {
            response.forEach(addBookToDom)
    })

})
document.addEventListener("DOMContentLoaded", function() {
    const tbody = document.querySelector("tbody");

    function addBookToDom(book) {
        const row = document.createElement("tr");

        const title = document.createElement("td");
        const titleAnchor = document.createElement("a");
        const divId = document.createElement("div");
        titleAnchor.dataset.id = book.id;
        titleAnchor.innerText = book.title;
        divId.classList.add("hidden");
        title.appendChild(titleAnchor);
        title.appendChild(divId);



        titleAnchor.addEventListener("mouseover", function() {
            $.getJSON({
                url: `http://localhost:8080/book/${this.dataset.id}`,
            }).done(() => {
                divId.innerText = "ID: "+book.id;
                divId.classList.toggle("hidden");
            })
        });

        const author = document.createElement("td");
        author.innerText = book.author;

        const publisher = document.createElement("td");
        publisher.innerText = book.publisher;

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(publisher);

        tbody.appendChild(row);

        titleAnchor.addEventListener("click", function () {
            fetch(`http://localhost:8080/book/${book.id}`, {
                method: "DELETE"
            }).then(response => {
                if (response.ok) {
                    const list = document.querySelectorAll("a");
                    list.forEach(element => {
                        if (element.dataset.id === `${book.id}`) {
                            let table = element.parentElement.parentElement.parentElement;
                            table.removeChild(element.parentElement.parentElement);
                        }
                    })
                }
            })
        })

        updateBook();
    }

    const titleForm = document.getElementById("title");
    const authorForm = document.getElementById("author");
    const publisherForm = document.getElementById("publisher");
    const button = document.querySelector("button");

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const id = document.querySelectorAll("a").length;

        const book = {

            id: id+1,
            title: titleForm.value,
            author: authorForm.value,
            publisher: publisherForm.value,
        }

        fetch("http://localhost:8080/book",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        }).then(addBookToDom(book));

        // $.post({
        //     url: "http://localhost:8080/book",
        //     data: JSON.stringify(book),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).done(() => {
        //     console.log("Książka dodana!")
        // }).fail(() => {
        //     console.log("Nie udało się dodać książki")
        // })
        //  addBookToDom(book);
    });

    function updateBook(){
    
    const rows = document.querySelectorAll("tr");
    const button = document.querySelector("button");

    rows.forEach(row => row.addEventListener("click", function(event){
        
        const children = row.children;
        const bookId = children[0].firstChild.dataset;
        titleForm.value = children[0].innerText;
        authorForm.value = children[1].innerText;
        publisherForm.value = children[2].innerText;

        button.addEventListener("click", function(event){
            event.preventDefault();

            const book = {
                id: bookId.id,
                title: titleForm.value,
                author: authorForm.value,
                publisher: publisherForm.value,
            }

            children[0].innerText = titleForm.value;
            children[1].innerText = authorForm.value;
            children[2].innerText = publisherForm.value;

            $.ajax({
                url: `http://localhost:8080/books/${bookId.id}`,
                data: JSON.stringify(book),
                contentType: "application/json",
                method: "PUT"
            }).done(() => {
                console.log("Książka zaaktualizowana!")
            }).fail(()=>{
                console.log("Nie udało się zaaktualizować książki")
            })
        })
        
    }))


    }


    // ASYNCHRONICZNOŚĆ
    // $.get({
    //     url: "http://localhost:8080/books"
    // }).done(response => {
    //     response.forEach(addBookToDom)
    // })


    //ASYNCHRONICZNOŚĆ
    // ZAMIAST JQUERY MOŻNA
    fetch("http://localhost:8080/books",{
        method: "GET"})
    .then(response => response.json())
    .then(data => {
            data.forEach(addBookToDom);
        })
})
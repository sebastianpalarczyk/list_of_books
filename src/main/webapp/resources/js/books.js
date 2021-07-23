document.addEventListener("DOMContentLoaded", function() {
    const tbody = document.querySelector("tbody");
    
    function addBookToDom(book) {
        const row = document.createElement("tr");

        const title = document.createElement("td");
        const titleAnchor = document.createElement("a");
        const divId = document.createElement("div");
        const divButton = document.createElement("div");
        const buttonUpdate = document.createElement("button");
        const buttonDelete = document.createElement("button");
        
        titleAnchor.dataset.id = book.id;
        titleAnchor.innerText = book.title;

       // divId.classList.add("hidden");
        divButton.classList.add("hidden");
        buttonUpdate.innerText = "update";
        buttonUpdate.classList.add("button")
        buttonDelete.innerText = "delete";
        
        
        title.appendChild(titleAnchor);
        title.appendChild(divButton);

        titleAnchor.addEventListener("mouseover", function() {
            fetch(`http://localhost:8080/book/${this.dataset.id}`,{
                method: "GET"
            }).then(() => {
             divButton.appendChild(buttonUpdate);
             divButton.appendChild(buttonDelete);
             divButton.classList.toggle("hidden");
             divId.innerText = this.dataset.id;
             title.appendChild(divId);
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

        buttonDelete.addEventListener("click", function () {
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

        buttonUpdate.addEventListener("click",updateBook);
    
    }

    const titleForm = document.getElementById("title");
    const authorForm = document.getElementById("author");
    const publisherForm = document.getElementById("publisher");
    const button = document.querySelector("button");
    const buttons = document.querySelectorAll(".batton")
    console.log(buttons)
    
    
+
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const anchors = document.querySelectorAll("a");
        const tab = new Array();

        anchors.forEach(e=>{
            tab.push(e.dataset.id);
        })
        
        const id = tab[length]+1;
        
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
        }).then(addBookToDom(book))
        //.then(location.reload());
    });

    function updateBook(){
    
    
    const button = document.querySelector("button");
    const row = this.parentElement.parentElement.parentElement;
    const anchor = row.firstChild.firstChild;
    console.log(anchor)

  
        
        const children = row.children;
        console.log(children)
        const bookId = anchor.dataset.id;
        console.log("id "+bookId)
        titleForm.value = children[0].innerText;
        console.log("title "+titleForm)
        authorForm.value = children[1].innerText;
        publisherForm.value = children[2].innerText;

        button.addEventListener("click", function(event){
            event.preventDefault();

            const book = {
                id: bookId,
                title: titleForm.value,
                author: authorForm.value,
                publisher: publisherForm.value,
            }
            console.log("ID book "+book.id)

            children[0].innerText = titleForm.value;
            children[1].innerText = authorForm.value;
            children[2].innerText = publisherForm.value;

            fetch(`http://localhost:8080/book/${bookId}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book),
            }).then(response=>{
                response.json()
            })
            .then(
                console.log(json)
            )

        

            // $.ajax({
            //     url: `http://localhost:8080/book/${bookId.id}`,
            //     data: JSON.stringify(book),
            //     contentType: "application/json",
            //     method: "PUT"
            // }).done(() => {
            //     console.log("Książka zaaktualizowana!")
            // }).fail(()=>{
            //     console.log("Nie udało się zaaktualizować książki")
            // })

        })
        
    


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
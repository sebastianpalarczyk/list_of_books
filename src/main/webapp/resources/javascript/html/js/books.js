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

        divId.classList.add("hidden");
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
    const button = document.getElementById("submitForm");
    
+
    button.addEventListener("click", addBook);

    function addBook(event){
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
            body: JSON.stringify(book),
            headers: {
                "Content-Type": "application/json"
            }  
        }).then(addBookToDom(book))
          .then(location.reload());

    }

    function updateBook(){
        
    const button = document.getElementById("submitForm");
    button.removeEventListener("click", addBook);

    const row = this.parentElement.parentElement.parentElement;
    const anchor = row.firstChild.firstChild;
    
    const children = row.children;
    const bookId = anchor.dataset.id;

    titleForm.value = children[0].firstChild.innerText;
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
            
            fetch(`http://localhost:8080/book/${bookId}`,{
                method: "PUT", 
                body: JSON.stringify(book),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                location.reload()
            )

        })
        
    }

    fetch("http://localhost:8080/books",{
        method: "GET"})
    .then(response => response.json())
    .then(data => {
            data.forEach(addBookToDom);
    })

})
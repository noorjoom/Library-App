const addButton = document.getElementById("addButton");
const addBookForm = document.getElementById("addBookForm");
const bookTable = document.getElementById("bookTable");
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function renderLibrary() {
    bookTable.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read</th>
            <th>Remove</th>
        </tr>
    `;

    myLibrary.forEach((book, index) => {
        const newRow = bookTable.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        cell1.textContent = book.title;
        cell2.textContent = book.author;
        cell3.textContent = book.pages;
        //cell4.innerHTML = `<button onclick="toggleReadStatus(${index})">${book.read ? "Yes" : "No"}</button>`;
        //cell5.innerHTML = `<button onclick="removeBook(${index})">Remove</button>`;

        const readButton = document.createElement("button");
        readButton.textContent = book.read ? "Read" : "Not Read";
        readButton.className = `read-button ${book.read ? "read" : "not-read"}`;
        readButton.addEventListener("click", () => toggleReadStatus(index));
        cell4.appendChild(readButton);

        // Add remove button with a class for hover effect
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", () => removeBook(index));
        cell5.appendChild(removeButton);
    });
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    renderLibrary();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    renderLibrary();
}

addButton.addEventListener("click", () => {
    addBookForm.style.display = "block";
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value === "yes";

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    addBookForm.reset();
    addBookForm.style.display = "none";

    renderLibrary();
});

// Initial rendering of the library
renderLibrary();

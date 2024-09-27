"use strict"

const form = document.querySelector("#form");
const table = document.querySelector("#table");

const musicArr = []; // Array for storing the cd's

// eventlistener submitting the form
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const generateRandomId = Math.random(); // Generating a random id
    const authorInput = e.target.author.value;
    const titleInput = e.target.title.value;
    const yearInput = e.target.year.value;

    musicArr.push({
        author : authorInput,
        title : titleInput,
        year : yearInput,
        id : generateRandomId
    });

    //form.reset(); // Resetting the form. Here I'm interacting with the page, which we should avoid doing a lot
    e.target.reset(); // Here I'm using the event instead

    createTable(); // create the table with all items from musicArr
});

function createTable() {
    const tbody = document.createElement("tbody"); // Creating the tbody
    
    const does_tbody_exist = document.querySelector("tbody"); // Checking if there already exists a tbody, and removing it if yes
    if (does_tbody_exist){
        does_tbody_exist.remove();
    }

    musicArr.forEach(cd => {
        const newRow = document.createElement("tr");
        const authorData = document.createElement("td");
        const titleData = document.createElement("td");
        const yearData = document.createElement("td");
        const deleteData = document.createElement("td");

        authorData.innerText = cd.author;
        titleData.innerText = cd.title;
        yearData.innerText = cd.year;

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "delete_btn");
        deleteBtn.setAttribute("id", `${cd.id}`); // set an id with the cd id, so we can delete the right cd later
        deleteBtn.innerHTML = '<img src="icon/trash.svg" alt="delete button" class="delete_icon">';
        deleteBtn.addEventListener("click", () => deleteCd(deleteBtn)); // eventListener for clicking the delete btn
        deleteData.append(deleteBtn);

        newRow.append(authorData, titleData, yearData, deleteData);
        tbody.append(newRow);
    });
    table.append(tbody); // appending the tbody to the table
};

function deleteCd(deleteBtn) {
    const findCd = (cd) => cd.id == deleteBtn.getAttribute("id"); // testing function for finding the right cd
    const findIndex = musicArr.findIndex(findCd); // finding the index of the right cd
    musicArr.splice(findIndex, 1); // removing the right cd
    createTable(); // create the table again
};
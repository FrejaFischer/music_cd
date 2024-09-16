"use strict"

const form = document.querySelector("#form");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const yearInput = document.querySelector("#year");

const tbody = document.querySelector("#tbody");

const musicArr = [];

// function for submitting the form
form.addEventListener("submit", (e)=>{
e.preventDefault();
const generateRandomId = Math.random(); // Generating a random id

musicArr.push({
    author : authorInput.value,
    title : titleInput.value,
    year : yearInput.value,
    id : generateRandomId
});

form.reset(); // resetting the form

createTable(); // create the table with all items from musicArr

});

function createTable() {
    tbody.innerHTML = ""; // clear the table, make it ready to be created (again)

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
};

function deleteCd(deleteBtn) {
    const findCd = (cd) => cd.id == deleteBtn.getAttribute("id"); // testing function for finding the right cd
    const findIndex = musicArr.findIndex(findCd); // finding the index of the right cd
    musicArr.splice(findIndex, 1); // removing the right cd
    createTable(); // create the table again
};
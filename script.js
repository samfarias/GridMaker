// Declare global variables
let numRows = 0;
let numCols = 0;
let colorSelected; 

// There was a need to include two helper functions

// This will color a cell when clicked
function colorCell() {
    if (colorSelected === "SELECT") {
        alert("Please select a color from the dropdown."); /* It is called when a cell is clicked. If no valid color is selected, an alert prompts the user to pick one. 
        Otherwise, the cell’s background is updated to the selected color. */
    } else {
        this.style.backgroundColor = colorSelected;
    }
}


// This will set the global color when a color is chosen from the dropdown
function selectColor() {
    /** This triggered whenever a user chooses a color from the dropdown.
 The function reads the selected color and stores it in the global variable 'colorSelected'. The chosen color is then
  used by other functions like colorCell) to update cell colors.*/
    colorSelected = document.getElementById("selectedColorId").value;
    console.log("Selected color:", colorSelected);
}

// Add a new row to the grid
function addR() {
    // Get a reference to the table element
    let table = document.getElementById("grid");
    // Insert a new row at the end
    let newRow = table.insertRow();

    // If there are no columns, create one by default
    if (numCols === 0) {
        numCols = 1;
    }

    // For each column, create a new cell
    for (let i = 0; i < numCols; i++) {
        let newCell = newRow.insertCell();
        // Attach the click event to color the cell
        newCell.onclick = colorCell;
        // Default the cell's background to white
        newCell.style.backgroundColor = "white";
    }

    // Increase the total row count
    numRows++;
}

// Add a new column to every row in the grid
function addC() {
    let table = document.getElementById("grid");
    let rows = table.rows;

    // If there are no rows, add a new row first
    if (rows.length === 0) {
        addR();
    } else {
        // Insert a new cell in each existing row
        for (let i = 0; i < rows.length; i++) {
            let newCell = rows[i].insertCell();
            newCell.onclick = colorCell;
            newCell.style.backgroundColor = "white";
        }
        // Increase the total column count
        numCols++;
    }
}

// Remove a row
function removeR() {
    if(numRows === 0){//Check if there are any rows to remove
        alert("No rows to remove!");
        return;//Exit function if there are no rows
    }
    let table = document.getElementById("grid");//reference to table with id grid
    table.deleteRow(numRows - 1);//delete the last row

    numRows--;//decrement the row counter

    if(numRows === 0){//if we removed the last row reset the column count as well
        numCols = 0;
    }
}

// Remove a column
function removeC() {
    if(numCols === 0){//check if there are any column to remove
        alert("No columns to remove");
        return;//Exit function if there are any columns
    }

    let table = document.getElementById("grid");//reference to table with id grid
    for(let i = 0; i < numRows; i++){//loop through each row in the table
        table.rows[i].deleteCell(numCols - 1);//dlete the last cell column from each row
    }

    numCols--;//decrement the column counter

    if(numCols === 0){//if we removed the last column remove all the remaining rows
        while(table.rows.length > 0){//loop until all rows are removed
            table.deleteRow(0);//delete frist row repeatedly
        }
        numRows = 0;//reset row counter to zero
    }
}

// Fill all uncolored cells
function fillU() {
    // Get the grid table element
    let table = document.getElementById("grid");
    // Loop through each row of the table
    for (let i = 0; i < table.rows.length; i++) {
        // Loop through each cell of the row
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            // If the cell is uncolored or white, fill it with the selected color
            if (table.rows[i].cells[j].style.backgroundColor === " " || table.rows[i].cells[j].style.backgroundColor === "white") {
                table.rows[i].cells[j].style.backgroundColor = colorSelected;
            }
        }
    }
}

// Fill all cells
function fillAll() {
    // Get the grid table element
    let table = document.getElementById("grid");
    // Loop through each row of the table
    for (let i = 0; i < table.rows.length; i++) {
        // Loop through each cell of the row, then fill it with the selected color
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            table.rows[i].cells[j].style.backgroundColor = colorSelected;
        }
    }
}

// Clear all cells
function clearAll(){
    const table = document.getElementById("grid");//reference to the table with id grid
    
    for(let i = 0; i < table.rows.length; i++){//loop through each row in table
        for(let j = 0; j < table.rows[i].cells.length; j++){//for each row loop through each cell
            table.rows[i].cells[j].style.backgroundColor = "white";//set background color to white
        }
    }
}
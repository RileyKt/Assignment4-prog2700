// IIFE
(() => {

	
	fetch('https://prog2700.onrender.com/threeinarow/random')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        createGrid(json);
        createStatusCheckButton();
    })
    .catch(error =>{
        console.error("Error fetching json data: ", error);
    });

    //function to create grid structure using the DOM, creates a div element for each row and cell.
    function createGrid(data) {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid';


        //for each to create the cells, and add event listeners, to change the color of the cell based on being clicked 
        data.rows.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            row.forEach((cell, cellIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.className = `cell state-${cell.currentState}`;
                cellDiv.addEventListener('click', () => toggleCellState(cell, cellDiv));
                rowDiv.appendChild(cellDiv);
            });

            gridContainer.appendChild(rowDiv);
        });
        
        document.body.appendChild(gridContainer);
    }
    
    //function for toggling the state of a cell, only if its not colored from the start.
    function toggleCellState(cell, cellDiv) {
        if (!cell.canToggle) return;
        cell.currentState = (cell.currentState + 1) % 3;

        cellDiv.className = `cell state-${cell.currentState}`;
    }

    //function to create button to check puzzle status
    function createStatusCheckButton() {
        const button = document.createElement('button');
        button.textContent = 'Check Puzzle Status';
        button.addEventListener('click', checkPuzzleStatus);
        document.body.appendChild(button);
    }

    function checkPuzzleStatus() {
        return;
    }



})();


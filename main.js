// IIFE
(() => {

	
	fetch('https://prog2700.onrender.com/threeinarow/random')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        createGrid(json);
        
    })
    .catch(error =>{
        console.error("Error fetching json data: ", error);
    });
    function createGrid(data) {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid';


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
      
      function toggleCellState(cell, cellDiv) {
        cell.currentState = (cell.currentState + 1) % 3;

        cellDiv.className = `cell state-${cell.currentState}`;
    }

    



})();


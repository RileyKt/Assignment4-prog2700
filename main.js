// IIFE
(() => {
    let puzzleData;
	
	fetch('https://prog2700.onrender.com/threeinarow/random')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        puzzleData = json;
        createGrid(json);
        createStatusCheckButton();
        createHighlightCheckbox();
        createAnswerButton();
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

                //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
                cellDiv.dataset.row = rowIndex;  
                cellDiv.dataset.cell = cellIndex; 
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

    //function for puzzle logic and reporting to user if they did it correctly
    function checkPuzzleStatus() {
        let isComplete = true;
        let isCorrect = true;
        let rows = puzzleData.rows;
    
        for (const row of rows) {
            for (const cell of row) {
                if (cell.currentState === 0) {
                    isComplete = false;
                } else if (cell.canToggle && cell.currentState !== cell.correctState) {
                    isCorrect = false;
                }
            }
        }
    
        //if statements to output to user if they have done the puzzle correctly, so far so good, or if they've gone wrong
        if (isComplete && isCorrect) {
            alert("You did it!!");
        } else if (!isCorrect) {
            alert("Something is wrong");
        } else {
            alert("So far so good");
        }
    }

    //creates the button to highlight incorrect cells
    function createHighlightCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'highlightCheckbox';
        checkbox.addEventListener('change', (event) => highlightIncorrect(event.target.checked));
        document.body.appendChild(checkbox);
    }
    //function to highlight incorrect cells with a red outline
    function highlightIncorrect(isChecked) {
        let rows = puzzleData.rows;
    
        //nested for loop to check each cell for if its correct or not, and changes it so that it has the css property to give it a red outline
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            for (let cellIndex = 0; cellIndex < rows[rowIndex].length; cellIndex++) {
                const cell = rows[rowIndex][cellIndex];
                const cellDiv = document.querySelector(`.cell[data-row="${rowIndex}"][data-cell="${cellIndex}"]`);
    
                if (isChecked && cell.canToggle && cell.currentState !== cell.correctState) {
                    cellDiv.classList.add('incorrect');
                } else {
                    cellDiv.classList.remove('incorrect');
                }
            }
        }
    }
    //function for additional functionallity of a button to show the correct answer for the puzzle
    function createAnswerButton() {
        const answerButton = document.createElement('button');
        answerButton.textContent = 'Show Answer';
        answerButton.addEventListener('click', showAnswer);
        document.body.appendChild(answerButton);
    }

    //function to show the correct answer for the puzzle
    function showAnswer(){
        let rows = puzzleData.rows;

        //nested for loop to show the correct color for each cell in the puzzle
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            for (let cellIndex = 0; cellIndex < rows[rowIndex].length; cellIndex++) {
                const cell = rows[rowIndex][cellIndex];
                const cellDiv = document.querySelector(`.cell[data-row="${rowIndex}"][data-cell="${cellIndex}"]`);
                cellDiv.className = `cell state-${cell.correctState}`;
            }
        }
    }


})();


// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('https://prog2700.onrender.com/threeinarow/random')
    .then((response) => response.json())
    .then((json) => {

    })
    .catch(error =>{
        console.error("Error fetching json data: ", error);
    });
    

    




})();


/*
Author: devCodeCamp
Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
*/
let defaultPerson={
        "id": 0,
        "firstName": "",
        "lastName": "",
        "gender": "",
        "dob": "",
        "height":0,
        "weight":0,
        "eyeColor": "",
        "occupation": "",
        "parents": [],
        "currentSpouse":0 
    }

let firstNames = ['Billy', 'Uma', 'Michael', 'Jon', 'Jack', 'Jen', 'Mister', 'Missez', 'Joy', 'Mader', 'Jill', 'Ralph', 'Jasmine', 'Annie', 'Dave', 'Amii', 'Hana', 'Regina', 'Eloise', 'Mattias', 'Ellen', 'Joey']

let lastNames = ['Bob', 'Walkens', 'Pafoy', 'Potatoo', 'Madden']

function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()
/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
*/
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    // Checks if there are multiple people in the person variable
    else if (person[1]){
        let display = displayResults(person);
        display += `Select 'Okay' to start new search or 'Cancel' to exit app.`;
        if (confirm(display)){
            return app(people);
        }
        return;
    }
    // Runs if 1 person is in the person variable
    else {
        let displayOption = prompt(
            `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
        )
        switch (displayOption) {
            case "info":
                //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
                // HINT: Look for a person-object stringifier utility function to help
                let personInfo = displayPerson(person[0]);
                alert(personInfo);
                break;
            case "family":
                //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
                // HINT: Look for a people-collection stringifier utility function to help
                let personFamily = findPersonFamily(person[0], people);
                alert(personFamily);
                break;
            case "descendants":
                //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
                // HINT: Review recursion lecture + demo for bonus user story
                let personDescendants = findPersonDescendants(person[0], people);
                alert(personDescendants);
                break;
            case "restart":
                // Restart app() from the very beginning
                app(people);
                break;
            case "quit":
                // Stop application execution
                return;
            default:
                // Prompt user again. Another instance of recursion
                alert('Invalid response please try.')
                return mainMenu(person, people);
            }
        
    }
    // Routes our application based on the user's input
    

    }
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", isFirstName);
    let lastName = promptFor("What is the person's last name?", isLastName);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `gender: ${person.gender}\n`;
    personInfo += `dob: ${person.dob}\n`;
    personInfo += `height: ${person.height}\n`;
    personInfo += `weight: ${person.weight}\n`;
    personInfo += `eyeColor: ${person.eyeColor}\n`;
    personInfo += `occupation: ${person.occupation}\n`;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid, people) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response, people));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input, people) {
    let inputKeyWords = input.split(':')
    let peopleKeys = Object.keys(defaultPerson)

    if (input === 'quit'){
        return input;
    }
    else if (input === 'restart') {
        return app(people);
    }
    else if(inputKeyWords.length < 6){;
            for (let i = 0; i < inputKeyWords.length; i++){
                inputKeyWords[i] = inputKeyWords[i].split(' ');
                    if (peopleKeys.includes(inputKeyWords[i][0]) === false){
                        alert('Invalid response, incorrect keyword(s), try again.');
                        return app(people);
                    }
            }
            return inputKeyWords;
    }
    alert('Invalid response, too many searches, try again.');
    return app(people);
}


function isFirstName(input, people) {
    if (firstNames.includes(input) === false){
        alert('Invalid response, try again.');
        return app(people);
    }
    return input;
}

function isLastName(input, people){
    if (lastNames.includes(input) === false){
        alert('Invalid response, try again.');
        return app(people);
    }
    return input;
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????


function searchByTraits(people){

    let searchResults = people;
    let traitSearch = promptFor('Please type in search criteria without spaces then value.\nSeperate keyword and trait by space, seperate multiple criteria by a colon.\nCan also select \'restart\' or \'quit\'.\n(example criteria search - eyeColor brown)\n(example multiple criteria search - gender male:eyeColor brown:weight 200)', chars, people);

    if (traitSearch === 'quit'){
        return;
    }
    else if (traitSearch === 'restart') {
        return app(people);
    }
    else {
            let traitSearches = traitSearch.split(':')
            for (let i = 0; i < traitSearches.length; i++){
                let [trait, value] = traitSearches[i].split(' ') // array destructuring
            
        
                searchResults = searchResults.filter(function(person){
                    return person[trait] == value; // comparison expressions produce a boolean
                })
            }

            return mainMenu(searchResults, people);
    }
}


function findPersonFamily(person, people){
    let displayFamily = `This is ${person.firstName} ${person.lastName}'s family.\n`
    displayFamily += 'Spouse: \n';
    displayFamily += displaySpouse(person, people)
    displayFamily += 'Parents: \n';
    displayFamily += displayParents(person,people)
    displayFamily += 'Siblings: \n'
    displayFamily += displaySiblings(person, people)
    return displayFamily;
}


function findPersonDescendants(person, people = []){
    let displayDescendants = `This is ${person.firstName} ${person.lastName}'s descendants.\n`
    displayDescendants = 'Descendants: \n';
    let descendants = people.filter(function(human){
        for (let i = 0; i < human.parents.length; i++){
            if (human.parents[i] === person.id){
                return true;
            }
        }
    })
    for (let i = 0; i < descendants.length; i++){
        displayDescendants += `${descendants[i].firstName} ${descendants[i].lastName}\n`;
    }
    return displayDescendants;
}


function displayResults(people) {
    let displayOption = `The search returned multiple matches. Here are the potential matches:\n`;
    for (let i = 0; i < people.length; i++){
        displayOption += `${people[i].firstName} ${people[i].lastName}\n`;
    }
    return displayOption;
}

function displaySpouse(person,people){
    let displayCurrentSpouse = '';
    let currSpouses = people.filter(function(spouse) {
        return person.currentSpouse === spouse.id
    })
    if (currSpouses.length > 0) {
        displayCurrentSpouse += `- ${currSpouses[0].firstName} ${currSpouses[0].lastName}\n`;
    }
    return displayCurrentSpouse

}

function displayParents(person, people){
    let displayParents = '';
    let parents = people.filter(function(parent) {
        for (let i = 0; i < person.parents.length; i++){
            if (person.parents[i] === parent.id){
                return true;
            }
        }
    })
    if (parents.length > 0) {
        for (let i = 0; i < parents.length; i++) {
            displayParents += `- ${parents[i].firstName} ${parents[i].lastName}\n`;
        }
    }
    return displayParents
}

function displaySiblings(person, people){
    let displaySiblings = '';
    let siblings = people.filter(function(sibling){
        for (let i = 0; i < person.parents.length; i++){
            if (person.parents[i] === sibling.parents[i] && person.id !== sibling.id) {
                return true;
            }
        }
    })
    if (siblings.length > 0){
        for (let i = 0; i < siblings.length; i++){
            displaySiblings += `- ${siblings[i].firstName} ${siblings[i].lastName}\n`;
        }
    }
    return displaySiblings
}
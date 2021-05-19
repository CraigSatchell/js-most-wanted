"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // (completed) Giancarlo TODO: search by traits
      searchResults = searchByTraits(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) { //person is an array of multiple people

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  //person is an Array of objects [{...}]
  let selection = 0;
  let multipleMatches = [];
  if(person.length > 1){
    for( let i = 0; i< person.length; i++){
      multipleMatches += "(" + i + ") " + person[i].firstName + " " + person[i].lastName + "\n";
    }

    selection = prompt("Found the following people, select the person you are looking for: \n" + multipleMatches);

    console.log(selection);
  }

  
  let displayOption = prompt("You've selected " + person[selection].firstName + " " + person[selection].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      // Craig DONE: get person's info
      // create function to print out person info
      displayPerson(person[selection], people);
      break;
    case "family":
      // Craig TODO: get person's family
      //create a function to print out persons family 
      displayFamily(person[selection], people);
      break;
    case "descendants":
      // Craig TODO: get person's descendants
      displayDescendants(person[selection], people);

      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();


  let foundPerson = people.filter(function (person) {
    if (person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName) {
      return true;

    }
    else {
      return false;
    }
  })
  // (completed) Giancarlo TODO: find the person using the name they entered
  return foundPerson;

}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}



// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}



/***********************************************************
 * paired programming
************************************************************/


// display person information - Craig
function displayPerson(person, people) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + retrievePersonName(person.parents[0], people) + ", " + retrievePersonName(person.parents[1], people) + "\n";
  personInfo += "Current Spouse: " + retrievePersonName(person.currentSpouse, people) + "\n";

  // Craig DONE: finish getting the rest of the information to display

  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}


// helper functioon to pass into promptFor to validate user inputs and ignore case-sensitivity
function nameCompare(input, databaseName){
  
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}



// perform person lookup using id - Craig
function lookupPersonByID(id, people) {
  let person = people.find(function (person) {
    if (person.id === id) {
      return person;
    } else {
      return undefined;
    }
  });
  console.log('selected: ', person);
  return person; // person
}


// return string containing person name
// from lookup - Craig
function retrievePersonName(id, people) {
  let person = lookupPersonByID(id, people);
  let name = "unknown";
  if (person) {
    name = person.firstName + " " + person.lastName;
  }
  console.log('retrieve: ', person);
  console.log(name);
  return name;
}
//(completed) searchByTraits() Giancarlo
function searchByTraits(people) {
	let gender = prompt("What is the person's gender"); //string
	let height = prompt("What is the person's height?"); //number
	let weight = prompt("What is the person's weight"); //number
	let eyeColor = prompt("What is the person's eye color");//string
	let filterOn = false; // no filtered items by default

	let foundPerson = people.filter(function (person) {
		let filter = true;	// set default filter state
		// build filtering criteria
		if (gender.trim().length != 0) {
			filter = filter && person.gender.toLowerCase() === gender.toLowerCase();
			filterOn = true;
		}

		if (height != '') {
			filter = filter && person.height === parseInt(height);
			filterOn = true;
			
		}

		if (weight != '') {
			filter = filter && person.weight === parseInt(weight);
			filterOn = true;
		}

		if (eyeColor.trim().length != 0) {
			filter = filter && person.eyeColor.toLowerCase() === eyeColor.toLowerCase();
			filterOn = true;
		}
		// check item before filtering
		if (filter && filterOn) {
			return true;
		}
		else {
			return false;
		}
	})

  //end of people.filter

	// (completed)Giancarlo TODO: find the person using the traits entered
	return foundPerson; // return array of objects  (refactored by Craig)
}


//(completed) Craig - Look up descendants
function lookupDescendants(id, people) { //lookup (children, grand children, and great grand children )
	let offSpring = [];
	for (let i = 0; i < people.length; i++) {
		if (people[i].parents[0] === id || people[i].parents[1] === id) {
			offSpring.push({ person: people[i], relation: 'child' });
			for (let j = 0; j < people.length; j++) {
				if (people[j].parents[0] === offSpring[offSpring.length - 1].person.id || people[j].parents[1] === offSpring[offSpring.length - 1].person.id) {
					offSpring.push({ person: people[j], relation: 'grand-child' });
					for (let k = 0; k < people.length; k++) {
						if (people[k].parents[0] === offSpring[offSpring.length - 1].person.id || people[k].parents[1] === offSpring[offSpring.length - 1].person.id) {
							offSpring.push({ person: people[k], relation: 'great-grand-child' });
						}
					}
		
				}
			}
		}
	}
	return offSpring; // array of object
}

function lookupSiblings(id, people) {
	let siblings = [];
	let person = lookupPersonByID(id, people);
	let found = false;
	if (person.parents.length !=0) {
		for (let i = 0; i < people.length; i++){
			if ((person.parents[0] === people[i].parents[0] || person.parents[0] === people[i].parents[1]) && people[i].id != id) {
				found = true;
			} else if ((person.parents[1] === people[i].parents[0] || person.parents[0] === people[i].parents[1])&& people[i].id != id) {
				found = true;
			} else {
				found = false;
			}
			found ? siblings.push(people[i]) : siblings // append sibling
		}
	}
	return siblings;
}



function familyPerson(id, people) {
	let person;
	let parent1 = {};
	let parent2 = {};
	let descendants = [];
	let siblings = [];
	let spouseDetails = {};

	person = lookupPersonByID(id, people);
	parent1 = lookupPersonByID(person.parents[0], people);
	parent2 = lookupPersonByID(person.parents[1], people);
	descendants = lookupDescendants(id, people);
	siblings = lookupSiblings(id, people)
	spouseDetails = lookupPersonByID(person.currentSpouse, people);
	return { ...person, descendants, siblings, spouseDetails, parent1, parent2 };
}

/*
As a user, I want to be able look up someone’s descendants after I find them with the program (display the names of the descendants), using recursion
*/


function displayDescendants(person, people){
  
	let descendants = lookupDescendants(person.id, people);
	let personDes =  person.firstName + "'s children are:\n+ ";

	for (let i = 0 ; i < descendants.length; i++){
		console.log(descendants[i].relation);

		if (descendants[i].relation == "child"){
		personDes += descendants[i].person.firstName + " + ";}
	}

	personDes += "\n" + person.firstName + "'s grand-children are:\n+ ";
	for (let i = 0 ; i < descendants.length; i++){
		if (descendants[i].relation == "grand-child"){
		personDes += descendants[i].person.firstName + " + ";}
	}
	personDes += "\n" + person.firstName + "'s great-grand-children are:\n+ ";
	for (let i = 0 ; i < descendants.length; i++){
		if (descendants[i].relation == "great-grand-child"){
		personDes += descendants[i].person.firstName + " + "};
	}

	alert(personDes);
  }




  /*
   As a user, I want to be able look up someone’s immediate family members after I find them with the program (display the names of the family members and their relation to the found person. Parents, spouse, and siblings).
   */

function displayFamily(person, people){

  //Missing: display children
let spouse = "";
let family = familyPerson(person.id, people);
if (family.spouseDetails == undefined){
  spouse = "none";
}
else{
 spouse = family.spouseDetails.firstName;
}

let parents = {
	"mom" : "unknown",
	"dad" : "unknown" 
}
if(family.parent1){
	if(family.parent1.gender == "female"){
		parents.mom = family.parent1.firstName;
	}
	else if(family.parent1.gender == "male"){
		parents.dad = family.parent1.firstName;
	}
}
if(family.parent2){
	if(family.parent2.gender == "female"){
		parents.mom = family.parent2.firstName;
	}
	else if(family.parent2.gender == "male"){
		parents.dad = family.parent2.firstName;
	}
}



let siblings = {
	"sisters": [],
	"brothers": []
}
let sisterCount = 0;
let brotherCount = 0;


if(family.siblings.length > 0){
	
for(let i = 0; i <  family.siblings.length; i++){
	if(family.siblings[i].gender == "female"){
		siblings.sisters.push(family.siblings[i].firstName);
		sisterCount++;
	}
	if(family.siblings[i].gender == "male"){
		siblings.brothers.push(family.siblings[i].firstName);
		brotherCount++;
	}
}
}
if (sisterCount == 0){
	siblings.sisters.push("unknown");
}
if (brotherCount == 0){
	siblings.brothers.push("unknown");

}


let displayFamily = person.firstName + "'s parents are: \n";
displayFamily += "dad: " + parents.dad + "\n";
displayFamily += "mom: " + parents.mom + "\n";
displayFamily += "sister(s): ";

for( let i =0; i < siblings.sisters.length; i++){
displayFamily += siblings.sisters[i] + " + ";
}

displayFamily += "\nbrother(s): ";

for( let i =0; i < siblings.brothers.length; i++){
	displayFamily += siblings.brothers[i] + " + ";
	}

if (spouse == null){
	spouse = "unknown";
}

displayFamily += "\nspouse: " + spouse;

alert(displayFamily);

}

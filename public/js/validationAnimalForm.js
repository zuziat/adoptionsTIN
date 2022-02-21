function validateForm(){

	const animalNameInput = document.getElementById('animalName');
	const speciesInput = document.getElementById('species');
	const birthDateInput = document.getElementById('birthDate');
	const ageInput = document.getElementById('age');
	const kidFriendlyInput = document.getElementById('kidFriendly');
	const volunteerIdInput = document.getElementById('volunteerId');
	const adopterIdInput = document.getElementById('adopterId');

	const errorAnimalName = document.getElementById('errorAnimalName');
	const errorSpecies = document.getElementById('errorSpecies');
	const errorBirthDate = document.getElementById('errorBirthDate');
	const errorAge = document.getElementById('errorAge');
	const errorKidFriendly = document.getElementById('errorKidFriendly');
	const errorVolunteerId = document.getElementById('errorVolunteerId');
	const errorAdopterId = document.getElementById('errorAdopterId');
	const errorsSummary = document.getElementById('errorsSummary');

	resetErrors([animalNameInput, speciesInput, birthDateInput, ageInput, kidFriendlyInput, volunteerIdInput, adopterIdInput],
		[errorAnimalName, errorSpecies, errorBirthDate, errorAge, errorKidFriendly, errorVolunteerId, errorAdopterId], errorsSummary);

	let valid = true;

	if(!checkRequired(animalNameInput.value)){
		valid= false;
		animalNameInput.classList.add("error-input");
		errorAnimalName.innerText = "Pole jest wymagane";
	} else if(!checkTextLengthRange(animalNameInput.value, 2, 35)){
		valid = false;
		animalNameInput.classList.add("error-input");
		errorAnimalName.innerText = "Pole powinno zawierać 2 do 35 znaków";
	}

	if(!checkRequired(speciesInput.value)){
		valid= false;
		speciesInput.classList.add("error-input");
		errorSpecies.innerText = "Pole jest wymagane";
	} else if(!checkTextLengthRange(speciesInput.value, 2, 30)){
		valid = false;
		speciesInput.classList.add("error-input");
		errorSpecies.innerText = "Pole powinno zawierać 2 do 30 znaków";
	}

	if(!checkDate(birthDateInput.value)){
		valid= false;
		birthDateInput.classList.add("error-input");
		errorBirthDate.innerText = "Pole powinno być datą";
	} else if(!checkDateIfAfter(birthDateInput.value, Date().toISOString().split('T')[0])){
		valid= false;
		birthDateInput.classList.add("error-input");
		errorBirthDate.innerText = "Data nie moze być z przyszłości";
	}
	if(!checkRequired(ageInput.value)){
		valid= false;
		ageInput.classList.add("error-input");
		errorAge.innerText = "Pole jest wymagane";
	} else if(!checkNumber(speciesInput.value)){
		valid = false;
		ageInput.classList.add("error-input");
		errorAge.innerText = "Pole powinno być liczbą";
	}else if(!checkTextLengthRange(speciesInput.value, 1, 2)){
		valid = false;
		ageInput.classList.add("error-input");
		errorAge.innerText = "Pole powinno zawierać 1 do 2 znaków";
	}

	if(!checkRequired(kidFriendlyInput.value)){
		valid= false;
		kidFriendlyInput.classList.add("error-input");
		errorKidFriendly.innerText = "Pole jest wymagane";
	}
	if(!checkRequired(volunteerIdInput.value)){
		valid= false;
		volunteerIdInput.classList.add("error-input");
		errorVolunteerId.innerText = "Pole jest wymagane";
	}
	if(!checkRequired(adopterIdInput.value)){
		valid= false;
		adopterIdInput.classList.add("error-input");
		errorAdopterId.innerText = "Pole jest wymagane";
	}
	if (!valid) {
		errorsSummary.innerText = "Formularz zawiera błędy";
	}

	return valid;


}

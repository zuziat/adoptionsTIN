function validateForm(){
	const volunteerNameInput = document.getElementById('volunteerName');
	const lastNameInput = document.getElementById('lastName');
	const emailInput = document.getElementById('email');
	const phoneNumberInput = document.getElementById('phoneNumber');


	const errorVolunteerName = document.getElementById('errorVolunteerName');
	const errorLastName = document.getElementById('errorLastName');
	const errorEmail = document.getElementById('errorEmail');
	const errorPhoneNumber = document.getElementById('errorPhoneNumber');
	const errorsSummary = document.getElementById('errorsSummary');

	resetErrors([volunteerNameInput, lastNameInput, emailInput, phoneNumberInput],
		[errorVolunteerName, errorLastName, errorEmail, errorPhoneNumber], errorsSummary);

	let valid = true;

	if(!checkRequired(volunteerNameInput.value)){
		valid= false;
		volunteerNameInput.classList.add("error-input");
		errorVolunteerName.innerText = "Pole jest wymagane";
	} else if(!checkTextLengthRange(volunteerNameInput.value, 2, 35)){
		valid = false;
		volunteerNameInput.classList.add("error-input");
		errorVolunteerName.innerText = "Pole powinno zawierać 2 do 35 znaków";
	}

	if(!checkTextLengthRange(lastNameInput.value, 2, 35)){
		valid = false;
		lastNameInput.classList.add("error-input");
		errorLastName.innerText = "Pole powinno zawierać 2 do 35 znaków";
	}

	if(!checkRequired(emailInput.value)){
		valid= false;
		emailInput.classList.add("error-input");
		errorEmail.innerText = "Pole jest wymagane";
	} else if(!checkTextLengthRange(emailInput.value, 5, 60)){
		valid = false;
		emailInput.classList.add("error-input");
		errorEmail.innerText = "Pole powinno zawierać 2 do 60 znaków";
	}
	else if(!checkEmail(emailInput.value)){
		valid = false;
		emailInput.classList.add("error-input");
		errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
	}

	if(!checkTel(phoneNumberInput.value)){
		valid = false;
		phoneNumberInput.classList.add("error-input");
		errorPhoneNumber.innerText = "Pole powinno zawierać 9 znaków";
	}
	if (!valid) {
		errorsSummary.innerText = "Formularz zawiera błędy";
	}

	return valid;

}
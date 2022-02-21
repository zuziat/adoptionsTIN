function validateForm(){
    const adopterNameInput = document.getElementById('adopterName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const hasAnimalsInput = document.getElementById('hasAnimals');
    const hasKidsInput = document.getElementById('hasKids');

    const errorAdopterName = document.getElementById('errorAdopterName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorHasAnimals = document.getElementById('errorHasAnimals');
    const errorHasKids = document.getElementById('errorHasKids');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([adopterNameInput, lastNameInput, emailInput, hasAnimalsInput, hasKidsInput],
        [errorAdopterName, errorLastName, errorEmail, errorHasAnimals, errorHasKids], errorsSummary);

    let valid = true;

    if(!checkRequired(adopterNameInput.value)){
        valid= false;
        adopterNameInput.classList.add("error-input");
        errorAdopterName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(adopterNameInput.value, 2, 35)){
        valid = false;
        adopterNameInput.classList.add("error-input");
        errorAdopterName.innerText = "Pole powinno zawierać 2 do 35 znaków";
    }

    if(!checkRequired(lastNameInput.value)){
        valid= false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(speciesInput.value, 2, 35)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać 2 do 35 znaków";
    }

    if(!checkRequired(emailInput.value)){
        valid= false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(ageInput.value, 2, 60)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać 2 do 60 znaków";
    } else if(!checkEmail(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if(!checkRequired(hasAnimalsInput.value)){
        valid= false;
        hasAnimalsInput.classList.add("error-input");
        errorHasAnimals.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(hasKidsInput.value)){
        valid= false;
        hasKidsInput.classList.add("error-input");
        errorHasKids.innerText = "Pole jest wymagane";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}
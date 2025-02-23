const frm = document.querySelector('.facebookForm');

const firstname = document.querySelector('.firstname');

const surname = document.querySelector('.surname');

const gender = document.getElementsByName('gender');

const mail = document.querySelector('.mail');

const mobile = document.querySelector('.mobile');

const pass = document.querySelector('.password');

const radi = document.querySelectorAll('.formradio');

const radiosmall = document.querySelector('.radiosmall');

const inps = document.querySelectorAll('input');

frm.addEventListener('submit', (event) => {
	event.preventDefault();
	checkInputs();
	if (val1 && val2 && val3 && val4 && val5 && val6) {
		frm.submit();
	}
});

let events = ["keyup", "change"];

inps.forEach(inp => {
	events.forEach(event => {
		inp.addEventListener(event, checkInputs);
	});
});


function checkInputs() {
	const firstnameValue = firstname.value.trim();
	const surnameValue = surname.value.trim();
	const emailValue = mail.value.trim();
	const mobileValue = mobile.value.trim();
	const passwordValue = pass.value.trim();

	if (firstnameValue === '') {
		val1 = setErrorFor(firstname, 'First name cannot be blank');
	} else if (!(isName(firstnameValue))) {
		val1 = setErrorFor(firstname, 'Invalid First name');
	} else {
		val1 = setSuccessFor(firstname, 'Valid FirstName');
	}

	if (surnameValue === '') {
		val2 = setErrorFor(surname, 'Surname cannot be blank');
	} else if (!(isName(surnameValue))) {
		val2 = setErrorFor(surname, 'Invalid Sur name');
	} else {
		val2 = setSuccessFor(surname, 'Valid Surname');
	}

	if (!gender[0].checked && !gender[1].checked && !gender[2].checked) {
		val3 = radioErrorFor();
	}
	else {
		val3 = radioSuccessFor();
	}

	if (emailValue === '') {
		val4 = setErrorFor(mail, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		val4 = setErrorFor(mail, 'Not a Valid email');
	} else {
		val4 = setSuccessFor(mail, 'Valid Email');
	}

	if (mobileValue == '') {
		val5 = setErrorFor(mobile, 'Mobile Number cannot be blank');
	}
	else if (!isNum(mobileValue)) {
		val5 = setErrorFor(mobile, 'Not a valid Mobile number')
	}
	else {
		val5 = setSuccessFor(mobile, 'Valid Mobile NUmber');
	}

	if (passwordValue === '') {
		val6 = setErrorFor(pass, 'Password cannot be blank');
	} else if (!(isPass(passwordValue))) {
		val6 = setErrorFor(pass, `Password should contains:
			At least 8 characters
			At least one uppercase letter (A-Z)
			At least one lowercase letter (a-z)
			At least one digit (0-9)
			At least one special character (@, #, $, etc.)`)
	} else {
		val6 = setSuccessFor(pass, 'Valid Password');
	}
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isNum(mob) {
	return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(mob);
}

function isName(nameValue) {
	return /^[A-Za-z][A-Za-z' -]{1,49}$/.test(nameValue);
}

function isPass(passValue) {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passValue);
}

function radioErrorFor() {
	radi.forEach(rad => {
		rad.classList.add('error');
	})
	radiosmall.innerText = 'Select your Gender';
	radiosmall.classList.add('err');
	radiosmall.parentElement.classList.add('control-error');
	return false;
}

function radioSuccessFor() {
	radi.forEach(rad => {
		rad.classList.remove('success');
		rad.classList.remove('error');
	})
	for (i = 0; i < gender.length; i++) {
		if (gender[i].checked) {
			gender[i].parentElement.parentElement.classList.add('success');
		}
	}
	radiosmall.innerText = 'Valid';
	radiosmall.classList.add('succ');
	radiosmall.parentElement.classList.add('control-error');
	return true;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.classList.remove('form-control-success');
	formControl.classList.add('form-control-error');
	input.classList.remove('success');
	input.classList.add('error');
	small.innerText = message;
	return false;
}

function setSuccessFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	if (formControl.classList.contains('form-control-error')) {
		formControl.classList.replace('form-control-error', 'form-control-success');
		if (input.classList.contains('error')) {
			input.classList.replace('error', 'success');
		}
	}
	else {
		formControl.classList.add('form-control-success');
		input.classList.add('success');
	}
	small.innerText = message;
	return true;
}




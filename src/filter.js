var learnModeIsChecked = false
var testModeIsChecked = false
var spanishModeIsChecked = false

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function drawCheckboxes(){
	var ulDiv = document.getElementById('ulDiv');
	ulDiv.innerHTML += 'PLEASE SELECT THE TENSES YOU WISH TO PRACTICE';
	var ulElement = document.createElement("ul");
	ulElement.setAttribute('id', 'tensesFilter');
	
	for(x in filterArray){
		var liElement = document.createElement("li");
		var checkboxElement = document.createElement("input");
		checkboxElement.setAttribute('type', 'checkBox');
		checkboxElement.setAttribute('id', filterArray[x]);
		if(filterArray[x] == 'Present Indicative'){
			checkboxElement.setAttribute('checked', true)
		}
		liElement.appendChild(checkboxElement);
		liElement.innerHTML += capitalizeFirstLetter(filterArray[x].replace(/([A-Z])/g, ' $1')).trim();
		
		ulElement.appendChild(liElement)
		
	}
	
	var learnModeCheck = document.createElement('input')
	learnModeCheck.setAttribute('type', 'checkBox');
	learnModeCheck.setAttribute('id', 'learnMode')
	
	var liLearnMode = document.createElement('li')
	ulElement.appendChild(document.createElement('br'))
	liLearnMode.appendChild(learnModeCheck)
	liLearnMode.innerHTML += 'Learn Mode'
	ulElement.appendChild(liLearnMode)
	
	var testModeCheck = document.createElement('input')
	testModeCheck.setAttribute('type', 'checkBox');
	testModeCheck.setAttribute('id', 'testMode')
	
	var liTestMode = document.createElement('li')
	liTestMode.appendChild(testModeCheck)
	liTestMode.innerHTML += 'Test Mode'
	ulElement.appendChild(liTestMode)
	
	var spanishModeCheck = document.createElement('input')
	spanishModeCheck.setAttribute('type', 'checkBox');
	spanishModeCheck.setAttribute('id', 'spanishMode')
	spanishModeCheck.setAttribute('checked', true)
	
	var liSpanishMode = document.createElement('li')
	ulElement.appendChild(document.createElement('br'))
	liSpanishMode.appendChild(spanishModeCheck)
	liSpanishMode.innerHTML += 'Spanish Mode'
	ulElement.appendChild(liSpanishMode)
	
	var numInput = document.createElement('input');
	numInput.setAttribute('type', 'number')
	numInput.setAttribute('id', 'numInput')
	numInput.setAttribute('value', 5)
	numInput.setAttribute('min', 1)
	numInput.setAttribute('max', 100)
	
	ulElement.appendChild(numInput);
	ulDiv.appendChild(ulElement);
	filterClicker();
}

window.onload = drawCheckboxes();

function filterClicker(){
	var submitDiv = document.getElementById('submitDiv');
	var submitBoxFilterForFilter = document.createElement('input');
	submitBoxFilterForFilter.setAttribute('type', 'submit');
	submitBoxFilterForFilter.setAttribute('value', 'Submit');
	submitBoxFilterForFilter.setAttribute('id', 'submitBoxFilter');
	submitDiv.appendChild(submitBoxFilterForFilter);
	
	checkboxes = $('ul li input[type=checkbox]');

	document.getElementById("submitBoxFilter").addEventListener("click", function(){
		checkboxes.each(function(e){
			if(this.checked == true){
				keyValueAllowedList.push($(this).attr('id'));
			}
		});
		totalRows = document.getElementById('numInput').value;
		
		if ($('#spanishMode').is(':checked')){
			spanishModeIsChecked = true;
		}
		if ($('#learnMode').is(':checked')) {
			learnModeIsChecked = true;
		}
		else if ($('#testMode').is(':checked')) {
			testModeIsChecked = true;
		}
		else if ($('#testMode').is(':checked') && $('#learnMode').is(':checked')){
			testModeIsChecked = true;
		}
		
		initialLearnMode = learnModeIsChecked
		initialTestMode = testModeIsChecked
		
		drawTable();
	});

}




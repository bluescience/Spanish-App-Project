var learnModeIsChecked = false
var testModeIsChecked = false
var spanishModeIsChecked = false
var translationModeIsChecked = false
var filterArray = ['Conditional Continuous', 'Conditional Indicative', 'Conditional Perfect', 'Future Continuous', 'Future Indicative', 'Future Perfect', 'Future Perfect Subjunctive', 'Future Subjunctive', 'Imperative', 'Imperfect Continuous', 'Imperfect Indicative', 'Imperfect Subjunctive', 'Imperfect Subjunctive 2', 'Negative Imperative', 'Past Perfect', 'Past Perfect Subjunctive', 'Present Continuous', 'Present Indicative', 'Present Perfect', 'Present Perfect Subjunctive', 'Present Subjunctive', 'Preterit Continuous', 'Preterit Indicative', 'Preterit Perfect']
var forcedVerbArray = []

function filterInit(){
	learnModeIsChecked = false
	testModeIsChecked = false
	spanishModeIsChecked = false
	translationModeIsChecked = false
	filterArray = ['Conditional Continuous', 'Conditional Indicative', 'Conditional Perfect', 'Future Continuous', 'Future Indicative', 'Future Perfect', 'Future Perfect Subjunctive', 'Future Subjunctive', 'Imperative', 'Imperfect Continuous', 'Imperfect Indicative', 'Imperfect Subjunctive', 'Imperfect Subjunctive 2', 'Negative Imperative', 'Past Perfect', 'Past Perfect Subjunctive', 'Present Continuous', 'Present Indicative', 'Present Perfect', 'Present Perfect Subjunctive', 'Present Subjunctive', 'Preterit Continuous', 'Preterit Indicative', 'Preterit Perfect']
	forcedVerbArray = []
}

var loginInfo = [['username', 'password'],['username2', 'password2']]

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




function drawCheckboxes(){
	filterInit();
	var ulDiv = document.getElementById('ulDiv');
	ulDiv.innerHTML += 'PLEASE SELECT THE TENSES YOU WISH TO PRACTICE';
	
	var ulElement = document.createElement("ul");
	ulElement.setAttribute('id', 'tensesFilter');
	
	var forcedVerbInput = document.createElement('input')
	forcedVerbInput.setAttribute('id', 'forcedVerbInput')
	ulElement.appendChild(forcedVerbInput)
	ulElement.appendChild(document.createElement('br'))
	
	
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
	learnModeCheck.setAttribute('checked', 'true')
	
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

	var translationModeCheck = document.createElement('input')
	translationModeCheck.setAttribute('type', 'checkBox');
	translationModeCheck.setAttribute('id', 'translationMode')
	
	var liTranslationMode = document.createElement('li')
	liTranslationMode.appendChild(translationModeCheck)
	liTranslationMode.innerHTML += 'Test your Translation Mode'
	ulElement.appendChild(liTranslationMode)
	
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
		if ($('#translationMode').is(':checked')){
			translationModeIsChecked = true;
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
		
		
		if(document.getElementById('forcedVerbInput').value == null){
			drawTable();
		}
		forcedVerbArray = document.getElementById('forcedVerbInput').value.replace(/[^a-zA-Z0-9]/g, ',').split(',')		
		console.log(forcedVerbArray)
		forcedVerbArray = filterVerbs(forcedVerbArray)
		
		console.log(forcedVerbArray)
		if(totalRows < forcedVerbArray.length){
			totalRows = forcedVerbArray.length
		}
		//conjugationInit();
		drawTable();
	});

}




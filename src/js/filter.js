var learnModeIsChecked = false
var testModeIsChecked = false
var spanishModeIsChecked = false
var translationModeIsChecked = false
var filterArray = ['Conditional Continuous', 'Conditional Indicative', 'Conditional Perfect', 'Future Continuous', 'Future Indicative', 'Future Perfect', 'Future Perfect Subjunctive', 'Future Subjunctive', 'Imperative', 'Imperfect Continuous', 'Imperfect Indicative', 'Imperfect Subjunctive', 'Imperfect Subjunctive 2', 'Negative Imperative', 'Past Perfect', 'Past Perfect Subjunctive', 'Present Continuous', 'Present Indicative', 'Present Perfect', 'Present Perfect Subjunctive', 'Present Subjunctive', 'Preterit Continuous', 'Preterit Indicative', 'Preterit Perfect']
var forcedVerbArray = []
var themeButton
var forcedVerbInput
var numInput

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
	
	forcedVerbInput = document.createElement('input')
	forcedVerbInput.setAttribute('id', 'forcedVerbInput')
	forcedVerbInput.setAttribute('class', 'dark-theme')
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
	
	numInput = document.createElement('input');
	numInput.setAttribute('type', 'number')
	numInput.setAttribute('id', 'numInput')
	numInput.setAttribute('class', 'dark-theme')
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
	submitBoxFilterForFilter.setAttribute('class', 'btn btn-primary btn-block');
	submitDiv.appendChild(submitBoxFilterForFilter);
	
	themeButton = document.createElement('input')
	themeButton.setAttribute('type', 'submit')
	themeButton.setAttribute('value', 'Change Theme')
	themeButton.setAttribute('id', 'themeButton')
	themeButton.setAttribute('class', 'btn btn-danger')
	submitDiv.appendChild(themeButton)
	
	checkboxes = $('ul li input[type=checkbox]');
	
	
	document.getElementById('themeButton').addEventListener("click", function(){
		if ($('body').hasClass('body-class dark-theme')){
			document.getElementById('body').setAttribute('class', 'body-class light-theme')
			forcedVerbInput.setAttribute('class', 'light-theme')
			numInput.setAttribute('class', 'light-theme')
		}
		else {
			document.getElementById('body').setAttribute('class', 'body-class dark-theme')
			forcedVerbInput.setAttribute('class', 'dark-theme')
			numInput.setAttribute('class', 'dark-theme')
		
		}
	});
	
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
		window.mobileAndTabletcheck = function() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		};
		
		//conjugationInit();
		if(window.mobileAndTabletcheck){
			drawTable();
		}
		else{
			drawMobile();
		}
	});

}




var filterArray = ['Conditional Continuous', 'Conditional Indicative', 'Conditional Perfect', 'Future Continuous', 'Future Indicative', 'Future Perfect', 'Future Perfect Subjunctive', 'Future Subjunctive', 'Imperative', 'Imperfect Continuous', 'Imperfect Indicative', 'Imperfect Subjunctive', 'Imperfect Subjunctive 2', 'Negative Imperative', 'Past Perfect', 'Past Perfect Subjunctive', 'Present Continuous', 'Present Indicative', 'Present Perfect', 'Present Perfect Subjunctive', 'Present Subjunctive', 'Preterit Continuous', 'Preterit Indicative', 'Preterit Perfect']

var totalRows;
var cellsInRow = 6;
var verbChecker = [];
var usedVerbTenseCombo;
var randVerbArray;
var correctVerbCombo;
var idForButton;
var keyValueAllowedList = [];
var learnModeWasCheckedBefore;


function conjugationInit(){
	filterArray = ['Conditional Continuous', 'Conditional Indicative', 'Conditional Perfect', 'Future Continuous', 'Future Indicative', 'Future Perfect', 'Future Perfect Subjunctive', 'Future Subjunctive', 'Imperative', 'Imperfect Continuous', 'Imperfect Indicative', 'Imperfect Subjunctive', 'Imperfect Subjunctive 2', 'Negative Imperative', 'Past Perfect', 'Past Perfect Subjunctive', 'Present Continuous', 'Present Indicative', 'Present Perfect', 'Present Perfect Subjunctive', 'Present Subjunctive', 'Preterit Continuous', 'Preterit Indicative', 'Preterit Perfect']
	totalRows;
	cellsInRow = 6;
	verbChecker = [];
	usedVerbTenseCombo;
	randVerbArray;
	correctVerbCombo;
	idForButton;
	keyValueAllowedList = [];	
}


function drawTable() {
	
	console.log(initialLearnMode)
	console.log(learnModeIsChecked)
	console.log(learnModeWasCheckedBefore)
	
	document.getElementById('ulDiv').innerHTML = '';
	document.getElementById('submitDiv').innerHTML = '';
	
	var ulDiv = document.getElementById("ulDiv")
	
	var resetButton = document.createElement('input')
	resetButton.setAttribute('type', 'submit')
	resetButton.setAttribute('value', 'Home')
	resetButton.setAttribute('id', 'resetButton')
	resetButton.setAttribute('class', 'btn btn-success');
	ulDiv.appendChild(resetButton)

	var redrawButton = document.createElement('input')
	redrawButton.setAttribute('type', 'submit')
	redrawButton.setAttribute('value', 'Redraw Table with new verbs')
	redrawButton.setAttribute('id', 'redrawButton')
	redrawButton.setAttribute('class', 'btn btn-success');
	ulDiv.appendChild(redrawButton)
	// [] => ['estar', 'tener', ...]
	
	
	randVerbArray = Object.keys(verbs);
	
	usedVerbTenseCombo = []
	
    // get the reference for the body
    var tableDiv = document.getElementById('tableDiv');
	
    // creates a <table> element
    var tbl = document.createElement("table");
	tbl.setAttribute('class', 'table-styling')
    
	var headerRow = document.createElement('tr')
	var headerCell = document.createElement('th')
	
	headerCell.innerHTML = '<center>verb</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>tense</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>translation</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>yo</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>tú</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>el / ella / usted</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>nosotros</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>vosotros</center>'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = '<center>ellos / ellas / ustedes</center>'
	headerRow.appendChild(headerCell)
	
	tbl.appendChild(headerRow)
	
    
	// creating rows
    for (var r = 0; r < totalRows; r++) {
		
		// randomly chooses verb from randVerbArray
		var randVerb = randVerbArray[Math.ceil(Math.random()*randVerbArray.length)-1];

		
		// pulls all tenses available to randVerb
		var keyArray = Object.keys(verbs[randVerb]);
		
		// randomly chooses tense from keyArray
		keyVal = keyArray[Math.ceil(Math.random()*keyArray.length)-1];
		
		correctVerbCombo = copyCheck(randVerb, keyVal)
		
		randVerb = correctVerbCombo[0]
		keyVal = correctVerbCombo[1]
		if(r < forcedVerbArray.length){
			randVerb = forcedVerbArray[r]
		}
		
		//pushes id of checker label to usedVerbTenseCombo
		usedVerbTenseCombo.push(randVerb + "-" + keyVal);
		
		// removes used tenses 
		keyArray = remove(keyArray, keyVal)
		
		// creates checker column
		var row = document.createElement("tr");
		row.setAttribute('class', 'active');
		var verbCell = document.createElement("td");
		verbCell.setAttribute('class', 'td-styling')
		var verbText = document.createElement("label");
		
		//sets id of label
		verbText.setAttribute("id", randVerb + "-" + keyVal);
		
		// allows checking for correct or incorrect
		verbChecker.push([]);
		verbChecker[r].push([randVerb])
		verbChecker[r].push([keyVal])
		
		//finishes creation
		verbText.innerHTML += randVerb;
		verbCell.appendChild(verbText);
		row.appendChild(verbCell);
		
		var tenseCell = document.createElement('td');
		tenseCell.setAttribute("id", keyVal)
		tenseCell.setAttribute('class', 'td-styling')
		tenseCell.innerHTML += keyVal
		row.appendChild(tenseCell);
		
		//writes translation in new box
		var translationCell = document.createElement('td');
		translationCell.setAttribute('class', 'td-styling')
		translationCell.setAttribute("id", randVerb + "-" + "english")
		if(!translationModeIsChecked){
			translationCell.innerHTML += verbs[randVerb]["english"]
		}
		else{
			var cellTranslationText = document.createElement("input");
			cellTranslationText.setAttribute("id", r + "-translation")
			cellTranslationText.setAttribute('onkeyup', 'dynamicChecker();')
			translationCell.appendChild(cellTranslationText)
			
			var translationDiv = document.createElement("div");
			translationDiv.setAttribute("id", r + "-translation-div")
			translationCell.appendChild(translationDiv)
		}
		row.appendChild(translationCell);
		
	    // create cells in row
        for (var c = 0; c < cellsInRow; c++) {
            var cell = document.createElement("td");
			cell.setAttribute('class', 'td-styling')
            var cellText = document.createElement("input")
			var cellDiv = document.createElement("div")
			cellDiv.setAttribute("id", String(r) + '-' + String(c) + "-div")
			cellText.setAttribute('onkeyup', 'dynamicChecker();')
				
			//sets id for inputs
			if(keyVal == "Imperative" || keyVal == "Negative Imperative"){
				if(c == 0){
					cellText.setAttribute("id", "empty" + r)
					cellText.setAttribute("disabled", true)
				}
				else{
					cellText.setAttribute("id", String(r) + "-" + String(c-1) + "-input");
					cellText.setAttribute("onClick", "enableText(this.id)");
				}
			}
			else{
				cellText.setAttribute("id", String(r) + "-" + String(c) + "-input");
				cellText.setAttribute("onClick", "enableText(this.id)");	
			}
			if(!spanishModeIsChecked){
				if(c == 4){
					cellText.setAttribute("id", "empty2" + r)
					cellText.setAttribute("disabled", true)
				}
			}
			else{
				cellText.setAttribute("id", String(r) + "-" + String(c) + "-input");
				cellText.setAttribute("onClick", "enableText(this.id)");	
			}
			
			cell.appendChild(cellText);
			cell.appendChild(cellDiv);
			row.appendChild(cell);
        }           
            
	tbl.appendChild(row); // add the row to the end of the table body
    }
    
    tableDiv.appendChild(tbl); // appends <table> into <tableDiv>	 
	
	
	var accentDiv = document.getElementById('accentDiv');
	var submitAccent = ['Á','É','Í','Ó','Ú','á','é','í','ó','ú','Ñ','ñ'];
	for(x in submitAccent){
		var inputAccent = document.createElement("input");
		inputAccent.setAttribute('type', 'submit');
		inputAccent.setAttribute('value', submitAccent[x]);
		inputAccent.setAttribute('id', submitAccent[x]);
		inputAccent.setAttribute('class', 'btn btn-info');
		accentDiv.appendChild(inputAccent);
	}
	
	
	var submitDiv = document.getElementById('submitDiv');
	var submitBoxForVerbs = document.createElement('input');
	submitBoxForVerbs.setAttribute('type', 'submit');
	submitBoxForVerbs.setAttribute('class', 'btn btn-primary btn-block');
	if(learnModeIsChecked){
		submitBoxForVerbs.setAttribute('value', 'Hint');
	}
	else{
		submitBoxForVerbs.setAttribute('value', 'Submit');
	}
	submitBoxForVerbs.setAttribute('id', 'submitBox');
	submitDiv.appendChild(submitBoxForVerbs);

	if(!learnModeIsChecked && !testModeIsChecked){
		submitDiv.innerHTML = ''
	}
	submitDiv.appendChild(themeButton)
	clicker();
}



//checks if answer is correct or incorrect

function enableText(elem){
	idForButton = elem;
}

function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}


function dynamicChecker(){
	if(!testModeIsChecked){
		var answers = []
		for (var r = 0; r < totalRows; r++){
			if(translationModeIsChecked){
				idAns = r + "-translation"
				
				if((toUpperCase(document.getElementById(idAns).value).trim()) == toUpperCase(verbs[verbChecker[r][0]]['english'])){
					document.getElementById(idAns).style.color = "green"
				}
				else{
					document.getElementById(idAns).style.color = "black"
				}
			}
			
			for (var c = 0; c < verbs[verbChecker[r][0]][verbChecker[r][1]].length; c++){
				if(!spanishModeIsChecked && c == 4){
					c++;
				}
				idAns = String(r) + "-" + String(c)+ "-input";
				//answers.push(document.getElementById(idAns).value);
				console.log(verbs[verbChecker[r][0]][verbChecker[r][1]])
				if((toUpperCase(document.getElementById(idAns).value).trim()) == toUpperCase(verbs[verbChecker[r][0]][verbChecker[r][1]][c])){
					document.getElementById(idAns).style.color = "green"
				}
				else{
					document.getElementById(idAns).style.color = "black"
				}
			}
		}
		
	}
}


function clicker (){
	
	document.getElementById('resetButton').addEventListener("click", function(){
		ulDiv.innerHTML = ''
		tableDiv.innerHTML = ''
		accentDiv.innerHTML = ''
		submitDiv.innerHTML = ''
		scoreDiv.innerHTML = ''
		
		conjugationInit();
		drawCheckboxes();
	});
	
	document.getElementById('redrawButton').addEventListener("click", function(){
		ulDiv.innerHTML = ''
		tableDiv.innerHTML = ''
		accentDiv.innerHTML = ''
		submitDiv.innerHTML = ''
		scoreDiv.innerHTML = ''
		if(initialLearnMode){
			learnModeIsChecked = true
			learnModeWasCheckedBefore = false
		}
		
		verbChecker = [];
		drawTable();
	});
	if(learnModeIsChecked || testModeIsChecked){
		document.getElementById("submitBox").addEventListener("click", function(){
			var answers = []
			var questionAmount = 0
			var correctAnswers = 0
			for (var r = 0; r < totalRows; r++){
				if(translationModeIsChecked){
					idAns = r + "-translation"
					questionAmount++
					if((toUpperCase(document.getElementById(idAns).value).trim()) == toUpperCase(verbs[verbChecker[r][0]]['english'])){
						document.getElementById(idAns).style.color = "green"
						correctAnswers++
					}
					else{
						document.getElementById(idAns).style.color = "black"
					}
					if(initialLearnMode){
						if(learnModeIsChecked){
							document.getElementById(r + '-translation-div').innerHTML = verbs[verbChecker[r][0]]['english']
						}
						else if (learnModeWasCheckedBefore){
							document.getElementById(r + '-translation-div').innerHTML = '';
						}
					}
				}	
				for (var c = 0; c < verbs[verbChecker[r][0]][verbChecker[r][1]].length; c++){
					if(!spanishModeIsChecked && c == 4){
						c++;
					}
					var inputedVerb = String(r) + "-" + String(c) + "-input";
					if(initialLearnMode){
						if(learnModeIsChecked){
							document.getElementById(String(r) + '-' + String(c) + "-div").innerHTML = verbs[verbChecker[r][0]][verbChecker[r][1]][c]
						}
						else if (learnModeWasCheckedBefore){
							document.getElementById(String(r) + '-' + String(c) + "-div").innerHTML = '';
						}

						//answers.push(document.getElementById(idAns).value);
						if((toUpperCase(document.getElementById(inputedVerb).value).trim()) == toUpperCase(verbs[verbChecker[r][0]][verbChecker[r][1]][c])){
							document.getElementById(inputedVerb).style.color = "green"
						}
						else{
							document.getElementById(inputedVerb).style.color = "black"
						}
					}
					if(initialTestMode){
						questionAmount++;
						if((toUpperCase(document.getElementById(inputedVerb).value).trim()) == toUpperCase(verbs[verbChecker[r][0]][verbChecker[r][1]][c])){
							document.getElementById(inputedVerb).style.color = "green"
							correctAnswers++;
						}
						else{
							document.getElementById(inputedVerb).style.color = "red"
						}
					}
				}
			}
			
			if(initialLearnMode){
				if(learnModeIsChecked){
					learnModeIsChecked = false
					learnModeWasCheckedBefore = true
				}
				else if(learnModeWasCheckedBefore){
					learnModeIsChecked = true
					learnModeWasCheckedBefore = false
				}
			}
			if(initialTestMode){
				document.getElementById('scoreDiv').innerHTML += ("You have scored " + correctAnswers + '/' + questionAmount + ": scoring " + (correctAnswers / questionAmount) * 100 + "% <br>")
			}
		});
	}

	 
	jQuery("#Á").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Á';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#É").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'É';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#Í").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Í';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
		dynamicChecker()
	});
	jQuery("#Ó").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Ó';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#Ú").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Ú';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});


	jQuery("#á").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'á';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#é").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'é';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#í").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'í';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#ó").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'ó';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#ú").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'ú';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});


	jQuery("#Ñ").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Ñ';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
	jQuery("#ñ").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'ñ';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			dynamicChecker()
	});
}

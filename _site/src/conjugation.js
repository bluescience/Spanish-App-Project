//Object.keys(verbs["estar"])[Math.floor(Math.random()*Object.keys(verbs["estar"]).length
//console.log(verbs["estar"]["present"][0])
var filterArray = ['conditionalContinuous', 'conditionalIndicative', 'conditionalPerfect', 'futureContinuous', 'futureIndicative', 'futurePerfect', 'futurePerfectSubjunctive', 'futureSubjunctive', 'imperative', 'imperfectContinous', 'imperfectIndicative', 'imperfectSubjunctive', 'imperfectSubjunctive2', 'negativeImperfect', 'pastPerfect', 'pastPerfectSubjunctive', 'presentContinuous', 'presentIndicative', 'presentPerfect', 'presentPerfectSubjunctive', 'presentSubjunctive', 'preteritContinuous', 'preteritIndicative', 'preteritPerfect']

var totalRows;
var cellsInRow = 6;
var verbChecker = [];
var usedVerbTenseCombo;
var randVerbArray;
var correctVerbCombo;
var idForButton;
var keyValueAllowedList = [];

var uselessVar




function remove(array, element){
	//console.log(array);
	//console.log(element);
	return array.filter(tense => tense !== element);
}
	
function copyCheck(randomVerb, keyValue){
	if($.inArray(randomVerb + "-" + keyValue, usedVerbTenseCombo) !== -1 || $.inArray(keyValue, keyValueAllowedList) == -1){
	
		// randomly chooses verb from randVerbArray
		randomVerb = randVerbArray[Math.ceil(Math.random()*randVerbArray.length)-1];
	
		// pulls all tenses available to randVerb
		keyArray = Object.keys(verbs[randomVerb]);
	
		// randomly chooses tense from keyArray
		keyValue = keyArray[Math.floor(Math.random()*keyArray.length)];
		/*
		console.log(" ")
		console.log("middle::randVerb-keyVal: "+ randomVerb + "-" + keyValue)
		console.log("middle::usedVerbTenseCombo: "+ usedVerbTenseCombo)
		console.log(" ")
		*/			
		return copyCheck(randomVerb, keyValue);
	}
		
	else{
		var correctCombo = [randomVerb, keyValue];
		return correctCombo;
	}	
}			
	

function drawTable() {
	console.log(learnModeIsChecked)
	console.log(testModeIsChecked)
	document.getElementById('ulDiv').innerHTML = '';
	document.getElementById('submitDiv').innerHTML = '';
	
	// [] => ['estar', 'tener', ...]
	
	
	randVerbArray = Object.keys(verbs);
	
	usedVerbTenseCombo = []
	
    // get the reference for the body
    var tableDiv = document.getElementById('tableDiv');
	
    // creates a <table> element
    var tbl = document.createElement("table");
    
	var headerRow = document.createElement('tr')
	var headerCell = document.createElement('th')
	
	headerCell.innerHTML = 'verb'
	headerRow.appendChild(headerCell)
	
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = 'translation'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = 'yo'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = 'tú'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = 'el / ella / usted'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = 'nosotros'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = 'vosotros'
	headerRow.appendChild(headerCell)
	
	headerCell = document.createElement('th')
	headerCell.innerHTML = 'ellos / ellas / ustedes'
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
		
		//pushes id of checker label to usedVerbTenseCombo
		usedVerbTenseCombo.push(randVerb + "-" + keyVal);
		
		// removes used tenses (WIP)
		keyArray = remove(keyArray, keyVal)
		
		// creates checker column
		var row = document.createElement("tr");
		var verbCell = document.createElement("td");
		var verbText = document.createElement("label");
		
		//sets id of label
		verbText.setAttribute("id", randVerb + "-" + keyVal);
		
		// allows checking for correct or incorrect
		verbChecker.push([]);
		verbChecker[r].push([randVerb])
		verbChecker[r].push([keyVal])
		
		//finishes creation
		verbText.innerHTML += randVerb + "-" + keyVal;
		verbCell.appendChild(verbText);
		row.appendChild(verbCell);
		
		//writes translation in new box
		var translationCell = document.createElement('td');
		translationCell.setAttribute("id", randVerb + "-" + "english")
		translationCell.innerHTML += verbs[randVerb]["english"]
		row.appendChild(translationCell);
		
	    // create cells in row
        for (var c = 0; c < cellsInRow; c++) {
            var cell = document.createElement("td");
            var cellText = document.createElement("input")
			var cellDiv = document.createElement("div")
			cellDiv.setAttribute("id", String(r) + '-' + String(c) + "-div")
			cellText.setAttribute('onkeyup', 'dynamicChecker();')
				
			//sets id for inputs
			if(keyVal == "imperative" || keyVal == "negativeImperative"){
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
		accentDiv.appendChild(inputAccent);
	}
	
	var submitDiv = document.getElementById('submitDiv');
	var submitBoxForVerbs = document.createElement('input');
	submitBoxForVerbs.setAttribute('type', 'submit');
	submitBoxForVerbs.setAttribute('value', 'Submit');
	submitBoxForVerbs.setAttribute('id', 'submitBox');
	submitDiv.appendChild(submitBoxForVerbs);
	
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
			for (var c = 0; c < verbs[verbChecker[r][0]][verbChecker[r][1]].length; c++){
				idAns = String(r) + "-" + String(c)+ "-input";
				//answers.push(document.getElementById(idAns).value);
				if((document.getElementById(idAns).value).trim() == verbs[verbChecker[r][0]][verbChecker[r][1]][c]){
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
	document.getElementById("submitBox").addEventListener("click", function(){
		var answers = []
		var questionAmount = 0
		var correctAnswers = 0
		for (var r = 0; r < totalRows; r++){
			for (var c = 0; c < verbs[verbChecker[r][0]][verbChecker[r][1]].length; c++){
				var inputedVerb = String(r) + "-" + String(c) + "-input";
				if(initialLearnMode){
					if(learnModeIsChecked){
						document.getElementById(String(r) + '-' + String(c) + "-div").innerHTML = verbs[verbChecker[r][0]][verbChecker[r][1]][c]
					}
					else if (learnModeWasCheckedBefore){
						document.getElementById(String(r) + '-' + String(c) + "-div").innerHTML = '';
					}

					//answers.push(document.getElementById(idAns).value);
					if((document.getElementById(inputedVerb).value).trim() == verbs[verbChecker[r][0]][verbChecker[r][1]][c]){
						document.getElementById(inputedVerb).style.color = "green"
					}
					else{
						document.getElementById(inputedVerb).style.color = "black"
					}
				}
				if(initialTestMode){
					questionAmount++;
					if((document.getElementById(inputedVerb).value).trim() == verbs[verbChecker[r][0]][verbChecker[r][1]][c]){
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

	 
	jQuery("#Á").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Á';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#É").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'É';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#Í").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Í';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#Ó").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Ó';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#Ú").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Ú';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});


	jQuery("#á").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'á';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#é").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'é';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#í").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'í';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#ó").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'ó';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#ú").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'ú';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});


	jQuery("#Ñ").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'Ñ';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
	jQuery("#ñ").on('click', function() {
			var $txt = jQuery("#" + idForButton);
			var caretPos = $txt[0].selectionStart;
			var textAreaTxt = $txt.val();
			var txtToAdd =  'ñ';
			$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
	});
}
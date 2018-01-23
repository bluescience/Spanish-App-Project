//Object.keys(verbs["estar"])[Math.floor(Math.random()*Object.keys(verbs["estar"]).length
//console.log(verbs["estar"]["present"][0])

var totalRows = 10;
var cellsInRow = 6;
var verbChecker = [];
var usedVerbTenseCombo;
var randVerbArray;
var correctVerbCombo;
var idForButton;
var keyValueAllowedList = ['presentIndicative', 'preteritIndicative'];



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
			
			console.log(" ")
			console.log("middle::randVerb-keyVal: "+ randomVerb + "-" + keyValue)
			console.log("middle::usedVerbTenseCombo: "+ usedVerbTenseCombo)
			console.log(" ")
						
			return copyCheck(randomVerb, keyValue);
		}
		
		else{
			var correctCombo = [randomVerb, keyValue];
			return correctCombo;
		}	
	}			
	

    function drawTable() {
		// [] => ['estar', 'tener', ...]
		
		
		randVerbArray = Object.keys(verbs);
		
		usedVerbTenseCombo = []
		
        // get the reference for the body
        var div1 = document.getElementById('div1');
		
        // creates a <table> element
        var tbl = document.createElement("table");
        
		// creating rows
        for (var r = 0; r < totalRows; r++) {
			// randomly chooses verb from randVerbArray
			var randVerb = randVerbArray[Math.ceil(Math.random()*randVerbArray.length)-1];
			
			// pulls all tenses available to randVerb
			var keyArray = Object.keys(verbs[randVerb]);
			
			// randomly chooses tense from keyArray
			keyVal = keyArray[Math.ceil(Math.random()*keyArray.length)-1];
			
			
			console.log("before::randVerb-keyVal: "+ randVerb + "-" + keyVal)
			console.log("before::usedVerbTenseCombo: "+ usedVerbTenseCombo)
			
			correctVerbCombo = copyCheck(randVerb, keyVal)
			
			randVerb = correctVerbCombo[0]
			keyVal = correctVerbCombo[1]
			
			//pushes id of checker label to usedVerbTenseCombo
			usedVerbTenseCombo.push(randVerb + "-" + keyVal);
			
			console.log("after::randVerb-keyVal: "+ randVerb + "-" + keyVal)
			console.log("after::usedVerbTenseCombo: "+ usedVerbTenseCombo)
			console.log(" ")
			console.log(" ")
			
			// removes used tenses (WIP)
			keyArray = remove(keyArray, keyVal)
			
			// creates checker column
			var row = document.createElement("tr");
			var verbCell = document.createElement("td");
			var verbText = document.createElement("label");
			
			//sets id of label
			verbText.setAttribute("id", randVerb + "-" + keyVal);
			
			// allows chekcing for correct or incorrect
			verbChecker.push([]);
			verbChecker[r].push([randVerb])
			verbChecker[r].push([keyVal])
			
			//finishes creation
			verbText.innerHTML += randVerb + "-" + keyVal;
			verbCell.appendChild(verbText);
			row.appendChild(verbCell);
			
			
	     // create cells in row
             for (var c = 0; c < cellsInRow; c++) {
                var cell = document.createElement("td");
                var cellText = document.createElement("input")	
				
				//sets id for inputs
				cellText.setAttribute("id", String(r) + "-" + String(c));
				cellText.setAttribute("onClick", "enableText(this.id)");
				cell.appendChild(cellText);
                row.appendChild(cell);
				
            }           
            
	tbl.appendChild(row); // add the row to the end of the table body
        }
    
     div1.appendChild(tbl); // appends <table> into <div1>	 
}

window.onload=drawTable; 

//checks if answer is correct or incorrect
document.getElementById("submitBox").addEventListener("click", function(){
	var answers = []
	for (var r = 0; r < totalRows; r++){
		for (var c = 0; c < cellsInRow; c++){
			idAns = String(r) + "-" + String(c);
			//answers.push(document.getElementById(idAns).value);
		if((document.getElementById(idAns).value).trim() == verbs[verbChecker[r][0]][verbChecker[r][1]][c]){
				document.getElementById(idAns).style.color = "green"
			}
		else if((document.getElementById(idAns).value).trim() == ""){
			
		}
		
		else{
				document.getElementById(idAns).style.color = "red"
			}
		}
	}

});

function enableText(elem){
	idForButton = elem;
}

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

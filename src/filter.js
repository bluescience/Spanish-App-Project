var ulDiv = document.getElementById('ulDiv');



`

<ul id = 'tensesFilter'>

<li> <input type ="checkBox" id = 'conditionalContinuous'  > Conditional Continuous </li>
<li> <input type ="checkBox" id = 'conditionalIndicative'  > Conditional Indicative </li>
<li> <input type ="checkBox" id = 'conditionalPerfect'  > Conditional Perfect </li>
<li> <input type ="checkBox" id = 'futureContinuous'  > Future Continuous </li>
<li> <input type ="checkBox" id = 'futureIndicative'  > Future Indicative </li>
<li> <input type ="checkBox" id = 'futurePerfect'  > Future Perfect </li>
<li> <input type ="checkBox" id = 'futurePerfectSubjunctive'  > Future Perfect Subjunctive </li>
<li> <input type ="checkBox" id = 'futureSubjunctive'  > Future Subjunctive </li>
<li> <input type ="checkBox" id = 'imperative'  > Imperative </li>
<li> <input type ="checkBox" id = 'imperfectContinous'  > Imperfect Continous </li>
<li> <input type ="checkBox" id = 'imperfectIndicative'  > Imperfect Indicative </li>
<li> <input type ="checkBox" id = 'imperfectSubjunctive'  > Imperfect Subjunctive </li>
<li> <input type ="checkBox" id = 'imperfectSubjunctive2'  > Old Imperfect Subjunctive </li>
<li> <input type ="checkBox" id = 'negativeImperfect'  > Negative Imperfect </li>
<li> <input type ="checkBox" id = 'pastPerfect'  > Past Perfect </li>
<li> <input type ="checkBox" id = 'pastPerfectSubjunctive'  > Past Perfect Subjunctive </li>
<li> <input type ="checkBox" id = 'presentContinuous'  > Present Continuous </li>
<li> <input type ="checkBox" id = 'presentIndicative'  > Present Indicative </li>
<li> <input type ="checkBox" id = 'presentPerfect'  > Present Perfect </li>
<li> <input type ="checkBox" id = 'presentPerfectSubjunctive'  > Present Perfect Subjunctive</li>
<li> <input type ="checkBox" id = 'presentSubjunctive'  > Present Subjunctive </li>
<li> <input type ="checkBox" id = 'preteritContinuous'  > Preterit Continuous </li>
<li> <input type ="checkBox" id = 'preteritIndicative'  > Preterit Indicative </li>
<li> <input type ="checkBox" id = 'preteritPerfect'  > Preterit Perfect </li>

<br>
<input type="submit" value="Submit" id="submitBoxFilter">
</ul>`;


checkboxes = $('ul li input[type=checkbox]')

var tenseArray = []

document.getElementById("submitBox").addEventListener("click", function(){
	checkboxes.each(function(e){
		if(this.checked == true){
			tenseArray.push($(this).attr('id'));
		}
	});
	location.href = 'index.html'
});





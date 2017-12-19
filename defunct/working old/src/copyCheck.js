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
	
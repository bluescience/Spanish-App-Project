
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function toUpperCase(str){
	return str.toUpperCase()
}

function filterVerbs(arrayToFilter){
	for(var i = 0; i < arrayToFilter.length; i++){
		var isInArray = false
		for(var j = 0; j < Object.keys(verbs).length; j++){
			if(arrayToFilter[i] == Object.keys(verbs)[j]){
				isInArray = true
			}
		}
		if(!isInArray){
			arrayToFilter[i] = null
		}
	}
	
	if(arrayToFilter.sort()[0] == null && arrayToFilter.sort()[arrayToFilter.length -1] == null){
		return []
	}
	
	while(arrayToFilter[0] == null){
		arrayToFilter = arrayToFilter.slice(1,arrayToFilter.length)
	}
	while(arrayToFilter[arrayToFilter.length-1] == null){
		arrayToFilter = arrayToFilter.slice(0,arrayToFilter.length-1)
	}
	
	arrayToFilter = arrayToFilter.filter(onlyUnique)
	
	for(var i = 0; i < arrayToFilter.length; i++){
		
		while(arrayToFilter[i] == null){
			array1 = arrayToFilter.slice(0, i)
			array2 = arrayToFilter.slice(i+1, arrayToFilter.length)
			array3 = []
			
			for(var j = 0; j < array1.length; j++){
				array3.push(array1[j])
			}
			
			for(var k = 0; k < array2.length; k++){
				array3.push(array2[k])
			}
			
			arrayToFilter = array3
			
		}
	}
	
	return arrayToFilter
}




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
	
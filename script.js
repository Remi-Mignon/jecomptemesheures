
//--------------------------------------------------------------------------
// Initialisation
//--------------------------------------------------------------------------

const amplitudeJournaliereMax = 12
const debutDePauseMax = 14
const debutDePauseMin = 11
const repasDuSoirMin = 18
const repasDuSoirMax = 21
const tempsDePauseDecimalMin = 0.5
const coeffDeLArnaque = 0.8
const heuresSupPar15eneMax = 16
const heureMensuelle = 152
const joursDeCongesAcquis = 2.5
const prime = 0

var isTabInit = false
var isTab2Init = false
var isTab3Init = false
var isDiffCalc = false

var mois = new Array()

function init() {

}

//--------------------------------------------------------------------------
// Utilitaires pour les dates
//--------------------------------------------------------------------------

function getDayName(day) {

	var dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
	return dayNames[day]
}

function dateToString(date) {

	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();
	var dateString = yyyy + '-' + mm + '-' + dd;
	return dateString;
}

//--------------------------------------------------------------------------
// Array vers HTML
//--------------------------------------------------------------------------
function initTab() {

	var firstDate = new Date(document.getElementById("datejour1").value)
	var table = document.getElementById("daysTab");

	if (!isTabInit) {
		for (var i = 0; i <= (7*4)-1; i++) {

			var date = new Date(firstDate)
			date.setDate(date.getDate()+i)
			var dateDay = date.getDay()
			var dayName = getDayName(dateDay)
			var dateString = dateToString(date)

			var row = table.insertRow(i+1);
			if (dateDay==0 || dateDay==6 ) {
				row.style.backgroundColor = 'rgb(220 220 220)';
			}

			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			var cell7 = row.insertCell(6);

			cell1.innerHTML = "<span>"+dayName+"</span>";
			cell2.innerHTML = "<input type='date' value='"+dateString+"' disabled/>";
			cell3.innerHTML = "<input type='time' value=''/>";
			cell4.innerHTML = "<input type='time' value=''/>";
			cell5.innerHTML = "<input type='time' value=''/>";
			cell6.innerHTML = "<input type='time' value=''/>";
			cell7.innerHTML = "<input type='checkbox'/>";
		}
		document.getElementById("daysTab").hidden = false;
		document.getElementById("extButt").hidden = false;
		isTabInit = true
	} else {
		modifTab(firstDate, table)
	}
}

function modifTab(firstDate, table) {
	const myElement = table.firstChild.nextSibling.nextSibling.nextSibling;
	var row = -1
	for (const child of myElement.children) {
		row++
		var cell = -1
		for (const son of child.children) {
			cell++

			var date = new Date(firstDate)
			date.setDate(date.getDate()+row)
			var dateDay = date.getDay()
			var dayName = getDayName(dateDay)
			var dateString = dateToString(date)

			if(cell==0){
				son.firstChild.innerText = dayName
			}
			if(cell==1){
				son.firstChild.value = dateString
			}
		}
	}
}

function initTab2(data) {

	const table = document.getElementById("daysTab");
	const header = table.firstChild.nextSibling.firstChild.nextSibling
	const myElement = table.firstChild.nextSibling.nextSibling.nextSibling;

	for (var i = 0; i <= data.length-2; i++) {

		var obj = data[i];
		var j=-1
		for (var key in obj){
			j++
			var value = obj[key];
			if(i==0 && j>6 && !isTab2Init) { //pas j>6 mais key!=Jour,Date, prise de service, ... TO DO
				header.appendChild(document.createElement("th")).textContent = key //add cell in header
			}
			var row = -1
			for (const child of myElement.children) {
				row++
				if(row==i && j>6) { //pas j>6 mais key!=Jour,Date, prise de service, ... TO DO 
					if(!isTab2Init) {
						child.appendChild(document.createElement("td")).innerHTML = "<span>"+Math.round(value*100)/100+"</span>" //add cell in tab rows
					} else {
						var cell = -1
						for (const son of child.children) {
							cell++
							if(cell==j) {
								son.innerHTML = "<span>"+Math.round(value*100)/100+"</span>"
							}
						}
					}
				}
			}
		}
	}
	isTab2Init = true
}

function initTabSemaine(semaine1,semaine2,semaine3,semaine4) {

	var table = document.getElementById("semaines");
	table.innerHTML = ''

	var tBody = table.createTBody();
	var tHeader = table.createTHead();
	var hrow = tHeader.insertRow(0);

	var row = tBody.insertRow(-1);
	var obj = semaine1;
	var j=-1
	for (var key in obj){
		j++
		var value = obj[key];
		hrow.insertCell(j).outerHTML  = "<th>"+key+"</th>";
		row.insertCell(j).innerHTML = "<span>"+Math.round(value*100)/100+"</span>";
	}

	row = tBody.insertRow(-1);
	obj = semaine2;
	j=-1
	for (var key in obj){
		j++
		var value = obj[key];
		row.insertCell(j).innerHTML = "<span>"+Math.round(value*100)/100+"</span>";
	}

	row = tBody.insertRow(-1);
	obj = semaine3;
	j=-1
	for (var key in obj){
		j++
		var value = obj[key];
		row.insertCell(j).innerHTML = "<span>"+Math.round(value*100)/100+"</span>";
	}

	row = tBody.insertRow(-1);
	obj = semaine4;
	j=-1
	for (var key in obj){
		j++
		var value = obj[key];
		row.insertCell(j).innerHTML = "<span>"+Math.round(value*100)/100+"</span>";
	}

	table.hidden = false;
}

function initTab15ene(premiere15ene,deusieme15ene) {

	var table = document.getElementById("ene15");
	table.innerHTML = ''
	var tBody = table.createTBody();
	var tHeader = table.createTHead();
	var hrow = tHeader.insertRow(0);

	var row = tBody.insertRow(-1);
	var obj = premiere15ene;
	var j=-1
	for (var key in obj){
		j++
		var value = obj[key];
		hrow.insertCell(j).outerHTML  = "<th>"+key+"</th>";
		row.insertCell(j).innerHTML = "<span>"+Math.round(value*100)/100+"</span>";
	}

	row = tBody.insertRow(-1);
	obj = deusieme15ene;
	j=-1
	for (var key in obj){
		j++
		var value = obj[key];
		row.insertCell(j).innerHTML = "<span>"+Math.round(value*100)/100+"</span>";
	}

	table.hidden = false;
}

function initTabMois(mois) {
	var table = document.getElementById("mois");
	if(!isTab3Init) {
		var tBody = table.createTBody();
		var tHeader = table.createTHead();
		var hrow = tHeader.insertRow(0);

		hrow.insertCell(-1).outerHTML = "<th></th>";
		hrow.insertCell(-1).outerHTML = "<th>Dû</th>";
		hrow.insertCell(-1).outerHTML = "<th>Paie</th>";
		hrow.insertCell(-1).outerHTML = "<th>Différance</th>";


		var obj = mois;
		var j=-1
		for (var key in obj){
			j++
			var row = tBody.insertRow(j);
			var value = obj[key];
			row.insertCell(-1).innerHTML = key;
			row.insertCell(-1).innerHTML = "<span>"+Math.round(value*100)/100+"</span>";
			row.insertCell(-1).innerHTML = "<input type='number' value=''/>";
			row.insertCell(-1).innerHTML = "<span></span>";
		}

		table.hidden = false;
		document.getElementById("calcButt").hidden = false;
		isTab3Init = true

	} else {
		
		const header = table.firstChild.nextSibling.firstChild
		const tbody = table.firstChild.nextSibling.nextSibling;

		var obj = mois;
		var j=-1
		for (var key in obj){
			j++
			var value = obj[key];
			var row = -1
			for (const child of tbody.children) {
				row++
				var cell = -1
				for (const son of child.children) {
					cell++
					if(row==j && cell==1) {
						son.innerHTML = "<span>"+Math.round(value*100)/100+"</span>"
					}
				}
			}
		}
	}
}


//--------------------------------------------------------------------------
// Utilitaires des tab
//--------------------------------------------------------------------------
async function exportTab() {

	var table = document.getElementById("daysTab");
	var data = parseTable(table); // faire le parse moi meme TO DO
	data = await calcTab(data)



	var semaine1 = new Array()
	semaine1 = calcSemaine(1,7,semaine1,data)

	var semaine2 = new Array()
	semaine2 = calcSemaine(8,14,semaine2,data)

	var semaine3 = new Array()
	semaine3 = calcSemaine(15,22,semaine3,data)

	var semaine4 = new Array()
	semaine4 = calcSemaine(23,28,semaine4,data)



	var premiere15ene = new Array()
	premiere15ene = calc15ene(semaine1,semaine2,premiere15ene)

	var deusieme15ene = new Array()
	deusieme15ene = calc15ene(semaine3,semaine4,deusieme15ene)


	mois = calcMois(premiere15ene,deusieme15ene,mois)


	initTab2(data)
	initTabSemaine(semaine1,semaine2,semaine3,semaine4)
	initTab15ene(premiere15ene,deusieme15ene)
	initTabMois(mois)
	if (isDiffCalc) {
		calcDiff()
	}
}

function arrayify(collection) {
	return Array.prototype.slice.call(collection);
}

function factory(headings) {
	return function(row) {
	return arrayify(row.cells).reduce(function(prev, curr, i) {

		if (curr.firstChild.nodeName == 'SPAN') {
			if(headings[i]!="Ext"){
				prev[headings[i]] = curr.innerText;
			}
		}else {
				switch (curr.firstChild.type) {
				case 'span':
				break;
				case 'time':
				prev[headings[i]] = curr.firstChild.value;
				break;
				case 'date':
				prev[headings[i]] = curr.firstChild.value;
				break;
				case 'checkbox':
				prev[headings[i]] = curr.firstChild.checked;
				prev["Ext"] = curr.firstChild.checked;
				break;
				default:
				console.log('ERROR');
			}
		}
		
		return prev;
	}, {});
	}
}

function parseTable(table) {
	var headings = arrayify(table.tHead.rows[0].cells).map(function(heading) {
	return heading.innerText;
	});
	return arrayify(table.tBodies[0].rows).map(factory(headings));
}

function callJourFerieAPI(annee) {

	const apiUrl1 = `https://calendrier.api.gouv.fr/jours-feries/metropole/${annee}.json`;
	var result = new Array()
	
	return fetch(apiUrl1)
	.then(response => {
		if (!response.ok) {
			throw new Error('API ERROR');	
		}
		return response.json();
	})
	.then(apiData => {
		result = apiData
		return result
	})
	.catch(error => {
		console.error('Fetch error:', error);
	});
}

async function getJourFerie(data) {

	const resultAPI1 = await callJourFerieAPI(parseInt(data[0]['Date'].slice(0, 4)))
	const resultAPI2 = await callJourFerieAPI(parseInt(data[0]['Date'].slice(0, 4))+1)

	for (var i = 0; i <= data.length-2; i++) {
		if(typeof resultAPI1[data[i]['Date']] !== "undefined")
		{
			data[i]['Ferie'] = true
		} else if(typeof resultAPI2[data[i]['Date']] !== "undefined")
		{
			data[i]['Ferie'] = true
		} else {
			data[i]['Ferie'] = false
		}
	}
	return data
}

//--------------------------------------------------------------------------
// Calcules
//--------------------------------------------------------------------------
async function calcTab(data) {


	await getJourFerie(data).then((result) => {
	  	data = result;},
	);
	for (var i = 0; i <= data.length-2; i++) {

		data[i]['Prise de service en decimal'] = 0
		if (data[i]['Prise de service']!==""){
			data[i]['Prise de service en decimal'] = parseInt(data[i]['Prise de service'].slice(0, 2))+parseInt(data[i]['Prise de service'].slice(3, 6))/60
		}

		data[i]['Début de pause en decimal'] = 0
		if (data[i]['Début de pause']!==""){
			data[i]['Début de pause en decimal'] = parseInt(data[i]['Début de pause'].slice(0, 2))+parseInt(data[i]['Début de pause'].slice(3, 6))/60
		}
		
		data[i]['Fin de pause en decimal'] = 0
		if (data[i]['Fin de pause']!==""){
			data[i]['Fin de pause en decimal'] = parseInt(data[i]['Fin de pause'].slice(0, 2))+parseInt(data[i]['Fin de pause'].slice(3, 6))/60
		}
		
		data[i]['Fin de service en decimal'] = 0
		if (data[i]['Fin de service']!==""){
			data[i]['Fin de service en decimal'] = parseInt(data[i]['Fin de service'].slice(0, 2))+(parseInt(data[i]['Fin de service'].slice(3, 6))/60)
		}
		
		if(data[i]['Fin de service en decimal']<data[i]['Prise de service en decimal']) {
			data[i]['Fin de service en decimal'] = data[i]['Fin de service en decimal'] + 24
		}

		data[i]['Amplitude en decimal'] = data[i]['Fin de service en decimal'] - data[i]['Prise de service en decimal']
		data[i]['Temps de pause en decimal'] = data[i]['Fin de pause en decimal'] - data[i]['Début de pause en decimal']
		data[i]['Temps de travail en decimal'] = data[i]['Amplitude en decimal'] - data[i]['Temps de pause en decimal']

		data[i]['Amplitude en heure'] = (data[i]['Amplitude en decimal']-(data[i]['Amplitude en decimal']%1))+(60*(data[i]['Amplitude en decimal']%1)/100)
		data[i]['Temps de pause en minute'] = data[i]['Temps de pause en decimal']*60
		data[i]['Temps de travail en heure'] = (data[i]['Temps de travail en decimal']-(data[i]['Temps de travail en decimal']%1))+(60*(data[i]['Temps de travail en decimal']%1)/100)

		if(data[i]['Début de pause en decimal']>debutDePauseMax || (data[i]['Début de pause en decimal']<debutDePauseMin && data[i]['Début de pause en decimal']!=0)){
			data[i]['Ext'] = true
		}

		data[i]['Repas de 30min'] = false
		if(data[i]['Temps de pause en decimal']==tempsDePauseDecimalMin && data[i]['Ext']==false){
			data[i]['Repas de 30min'] = true
		} else if(data[i]['Temps de pause en decimal']<tempsDePauseDecimalMin && data[i]['Temps de pause en decimal']>0 && data[i]['Ext'] == false){
			data[i]['Ext'] = true
			//data[i]['Temps de travail en decimal'] = data[i]['Temps de travail en decimal']+0.25
		}

		data[i]['IDAJ'] = 0
		if(data[i]['Amplitude en decimal']>amplitudeJournaliereMax){
			data[i]['IDAJ'] = data[i]['Amplitude en decimal']-amplitudeJournaliereMax
		}

		data[i]['Nuit'] = false
		if((data[i]['Prise de service en decimal']>17 && data[i]['Fin de service en decimal']>=28) || data[i]['Prise de service en decimal']==0) {
			data[i]['Nuit'] = true
		}

		data[i]['Dimanche'] = false
		if(data[i]['Jour'] == "Dimanche")
		{
			data[i]['Dimanche'] = true
		}

		data[i]['Majoration dimanche / ferie'] = false
		if(data[i]['Dimanche'] == true && data[i]['Prise de service en decimal']!=0)
		{
			data[i]['Majoration dimanche / ferie'] = true
		}
		if(data[i]['Ferie'] == true && data[i]['Prise de service en decimal']!=0)
		{
			data[i]['Majoration dimanche / ferie'] = true
		}

		data[i]['Nuit / Week end / Ferie'] = false
		if(data[i]['Jour'] == "Samedi")
		{
			data[i]['Nuit / Week end / Ferie'] = true
		}
		if(data[i]['Dimanche'] == true)
		{
			data[i]['Nuit / Week end / Ferie'] = true
		}
		if(data[i]['Ferie'] == true)
		{
			data[i]['Nuit / Week end / Ferie'] = true
		}

		data[i]['Repas du soir'] = false
		if(data[i]['Prise de service en decimal']<=repasDuSoirMin && data[i]['Fin de service en decimal']>=repasDuSoirMax && !data[i]['Nuit / Week end / Ferie']){
			data[i]['Repas du soir'] = true
		}

		if(data[i]['Nuit'] == true)
		{
			data[i]['Nuit / Week end / Ferie'] = true
		}

		data[i]['Temps de travail effectif en decimal'] = data[i]['Temps de travail en decimal']
		if(data[i]['Nuit']==true && i==data.length-2 && (data[i]['Prise de service en decimal']!=0 || data[i]['Fin de service en decimal']!=0) )
		{
			data[i]['Temps de travail effectif en decimal'] =  24 - data[i]['Prise de service en decimal'] - data[i]['Temps de pause en decimal']
		}
		if(data[i]['Nuit / Week end / Ferie'] == true)
		{
			data[i]['Temps de travail effectif en decimal'] = (data[i]['Temps de travail effectif en decimal']*coeffDeLArnaque)
		}
	}

	return data
}

function calcSemaine(debut,fin,semaine,data) {
	semaine["total heures"] = 0
	semaine["heures sup"] = 0
	semaine["idaj"] = 0
	semaine["repas30"] = 0
	semaine["repasExt"] = 0
	semaine["repasSoir"] = 0
	semaine["Majoration dimanche"] = 0
	semaine["amplitude"] = 0
	for (var i = debut-1; i <= fin-1; i++) {
		semaine["amplitude"] = semaine["amplitude"] + data[i]['Amplitude en decimal']
		semaine["total heures"] = semaine["total heures"] + data[i]['Temps de travail effectif en decimal']
		semaine["idaj"] = semaine["idaj"] + data[i]['IDAJ']
		if(data[i]['Repas de 30min']==true){
			semaine["repas30"] = semaine["repas30"] + 1
		}
		if(data[i]['Ext']==true){
			semaine["repasExt"] = semaine["repasExt"] + 1
		}
		if(data[i]['Repas du soir']==true){
			semaine["repasSoir"] = semaine["repasSoir"] + 1
		}
		if(data[i]['Majoration dimanche / ferie']==true){
			semaine["Majoration dimanche"] = semaine["Majoration dimanche"] + 1
		}
	}
	semaine["heures sup"] = semaine["total heures"] - 35
	return semaine
}

function calc15ene(semaine1,semaine2,ene15){
	ene15["total heures"] = semaine1["total heures"] + semaine2["total heures"]
	ene15["heures sup"] = semaine1["heures sup"] + semaine2["heures sup"]
	if(ene15["heures sup"]<0){
		ene15["heures sup"]=0
	}
	ene15["idaj"] = semaine1["idaj"] + semaine2["idaj"]
	ene15["repas30"] = semaine1["repas30"] + semaine2["repas30"]
	ene15["repasExt"] = semaine1["repasExt"] + semaine2["repasExt"]
	ene15["repasSoir"] = semaine1["repasSoir"] + semaine2["repasSoir"]
	ene15["Majoration dimanche"] = semaine1["Majoration dimanche"] + semaine2["Majoration dimanche"]
	ene15["amplitude"] = semaine1["amplitude"] + semaine2["amplitude"]

	if(ene15["heures sup"]<=heuresSupPar15eneMax) {
		ene15["majorees 25"] = ene15["heures sup"]
		ene15["majorees 50"] = 0
	} else if (ene15["heures sup"]>heuresSupPar15eneMax) {
		ene15["majorees 25"] = heuresSupPar15eneMax
		ene15["majorees 50"] = ene15["heures sup"] - heuresSupPar15eneMax
	}

	return ene15
}

function calcMois(premiere15ene,deusieme15ene,mois){
	mois["base mensuel"] = heureMensuelle
	mois["majorees 25"] = premiere15ene["majorees 25"] + deusieme15ene["majorees 25"]
	mois["majorees 50"] = premiere15ene["majorees 50"] + deusieme15ene["majorees 50"]
	mois["Majoration dimanche"] = premiere15ene["Majoration dimanche"] + deusieme15ene["Majoration dimanche"]
	mois["idaj"] = premiere15ene["idaj"] + deusieme15ene["idaj"]
	mois["Prime"] = prime
	mois["repasExt"] = premiere15ene["repasExt"] + deusieme15ene["repasExt"]
	mois["repasSoir"] = premiere15ene["repasSoir"] + deusieme15ene["repasSoir"]
	mois["repas30"] = premiere15ene["repas30"] + deusieme15ene["repas30"]
	mois["Jous de congés acquis"] = joursDeCongesAcquis

	return mois
}

function calcDiff(){
	var table = document.getElementById("mois");
		
	const header = table.firstChild.nextSibling.firstChild
	const tbody = table.firstChild.nextSibling.nextSibling;

	var obj = mois;
	var j=-1
	for (var key in obj){
		j++
		var value = obj[key];
		var row = -1
		for (const child of tbody.children) {
			row++
			var cell = -1
			for (const son of child.children) {
				cell++
				if(row==j && cell==1) {

					var result = 0.0
					if(son.nextSibling.firstChild.value==""){
						result = 0
					} else {
						result = parseFloat(son.nextSibling.firstChild.value)-parseFloat(value)
					}
					console.log(result)
					if(result<0.01 && result>-0.01){
						son.nextSibling.nextSibling.innerHTML = "<span>"+Math.round(result*100)/100+"</span>"
					} else if(result>=0.01) {
						son.nextSibling.nextSibling.innerHTML = "<span style=\"background-color:lime;\">"+Math.round(result*100)/100+"</span>"
					} else if(result<=-0.01) {
						son.nextSibling.nextSibling.innerHTML = "<span style=\"background-color:red;\">"+Math.round(result*100)/100+"</span>"
					}
				}
			}
		}
	}
	isDiffCalc = true
}

window.onbeforeunload = function() {
        return "Dude, are you sure you want to refresh? Think of the kittens!";
}
function init() {
}

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

function initTab() {

	var firstDate = new Date(document.getElementById("datejour1").value)

	var table = document.getElementById("daysTab");
	for (var i = 0; i <= (7*4)-1; i++) {

		var date = new Date()
		date.setDate(firstDate.getDate()+i)
		var dayName = getDayName(date.getDay())
		var dateString = dateToString(date)

		var row = table.insertRow(i+1);
		if (dayName=="Dimanche" || dayName=="Samedi" ) {
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
		cell2.innerHTML = "<input type='date' value='"+dateString+"'/>";
		cell3.innerHTML = "<input type='time' value=''/>";
		cell4.innerHTML = "<input type='time' value=''/>";
		cell5.innerHTML = "<input type='time' value=''/>";
		cell6.innerHTML = "<input type='time' value=''/>";
		cell7.innerHTML = "<input type='checkbox'/>";
	}
	document.getElementById("daysTab").hidden = false;
	//document.getElementById("initDiv").hidden = true;
}

function exportTab() {

	var table = document.getElementById("daysTab");
    var data  = parseTable(table);
    console.log(data);
}

function arrayify(collection) {
  return Array.prototype.slice.call(collection);
}

function factory(headings) {
  return function(row) {
    return arrayify(row.cells).reduce(function(prev, curr, i) {
      //if child = span then .innertext
      //if child = time ou date then .value
      //if child = checkbox then .checked
      prev[headings[i]] = curr.firstChild.value;
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
let errorMsg = document.getElementById('error');
let x = null;
let y = null;
let radius = null;
let rCheckboxes = document.querySelectorAll(".radius_checkbox");
let xCheckboxes = document.querySelectorAll(".x_coordinate_checkbox");
let t1 = 0; // variables for check that pressed on checkbox 2 times
let t2 = 0;
let xOld = null;
let yOld = null;
let point;


// first param take value of checkbox, second - type (radius, x_coordinate)
function storeVar(value, type){
	makeCheckBox(value, type);
}

function makeCheckBox(number, type){
	if (type === 'x'){
		for (let checkbox of xCheckboxes){
			if (checkbox.value === number) {
				checkbox.setAttribute("enabled", "true");
				x = checkbox.value;
				t1++;
			}
			else checkbox.setAttribute("disabled", "true");
		}
		//if click on checkbox second time than all buttons must be enabled
		if (t1 === 2){
			for (let checkboxes of xCheckboxes){
				checkboxes.removeAttribute("disabled");
			}
			x = null;
			t1=0;
		}
	} else if (type === 'r') {
		for (let checkbox of rCheckboxes){
			if (checkbox.value === number) {
				checkbox.setAttribute("enabled", "true");
				radius = checkbox.value;
				t2++;
			}
			else checkbox.setAttribute("disabled", "true");
		}
		//if click on checkbox second time than all buttons must be enabled
		if (t2 === 2){
			for (let checkboxes of rCheckboxes){
				checkboxes.removeAttribute("disabled");
			}
			radius = null;
			t2=0;
		}
	}

}



function validateForm(){

	y = document.getElementById('y_coordinat').value;
	document.getElementById('timezone').value = new Date().getTimezoneOffset();
	if (y.length >= 10 ){
		errorMsg.innerHTML="Много цифр после запятой у 'Y'! Максимальное количество чисел позле запятой 8!";
		return false;
	}

	if ( x === null ){

		errorMsg.innerHTML="Некорректное значение 'X'!";
		return false;
	} else if (isNaN(y) || y === "" ||  y >= 5 || y <= -5){
		errorMsg.innerHTML="Некорректное значение 'Y'!";
		return false;
	} else if ( radius === null ){

		errorMsg.innerHTML="Некорректное значение 'R'!";
		return false;
	} else {
		localStorage.setItem("cx", (x*2/radius*33)+110);
		localStorage.setItem("cy", -(y*2/radius*33)+110);
		return true;
	}
}

	let graph = document.getElementById("graph");


	// It's important to add an load event listener to the object,
	// as it will load the svg doc asynchronously
	graph.addEventListener("load",function(){


		// get the inner DOM of alpha.svg
		let svgDoc = graph.contentDocument;
		// get the inner element by id
		let rect = svgDoc.getElementById("svg-graph");

		let rx = svgDoc.getElementById("rx");
		let minus_rx = svgDoc.getElementById("minus_rx");
		let minus_halfrx = svgDoc.getElementById("minus_halfrx");
		let halfrx = svgDoc.getElementById("halfrx");

		let ry = svgDoc.getElementById("ry");
		let minus_ry = svgDoc.getElementById("minus_ry");
		let minus_halfry = svgDoc.getElementById("minus_halfry");
		let halfry = svgDoc.getElementById("halfry");
		point = svgDoc.getElementById("point")

		rect.addEventListener("mouseenter",function other(){
			if (radius === null){
				errorMsg.innerHTML = "Пожалуйста выберите радиус!";
				rx.innerHTML = 'R';
				minus_rx.innerHTML = "-R";
				halfrx.innerHTML = 'R/2' ;
				minus_halfrx.innerHTML = "-R/2" ;

				ry.innerHTML = 'R';
				minus_ry.innerHTML = "-R";
				halfry.innerHTML = 'R/2' ;
				minus_halfry.innerHTML = "-R/2" ;
			} else {

				rx.innerHTML = radius;
				minus_rx.innerHTML = "-" + radius;
				halfrx.innerHTML = radius / 2 ;
				minus_halfrx.innerHTML = "-" + radius/2 ;

				ry.innerHTML = radius;
				minus_ry.innerHTML = "-" + radius;
				halfry.innerHTML = radius / 2;
				minus_halfry.innerHTML = "-" + radius/2 ;
				errorMsg.innerHTML = null;
			}

		}, false);

		// add behaviour
		rect.addEventListener("click",function clicked(evt){
			if (radius === null){
			errorMsg.innerHTML = "Пожалуйста выберите радиус!";
			} else {

				let xcheck = ((evt.clientX-110)/33*radius/2).toFixed(0);
				let ycheck = (-(evt.clientY-110)/33*radius/2).toFixed(3);
				if (xcheck === '-5'){
					x = -4;
				} else if (xcheck === '5'){
					x = 4;
				} else {
					x = xcheck;
				}
				y = ycheck;

				localStorage.setItem("cx", (x*2/radius*33)+110);
				localStorage.setItem("cy", -(y*2/radius*33)+110);


				errorMsg.innerHTML = null;
				for (let checkbox of xCheckboxes){
					// don't do === instead ==
					if (x == checkbox.value) {

						checkbox.removeAttribute("disabled");
						checkbox.checked = true;
					}
					else {
						checkbox.checked = false;
						checkbox.setAttribute("disabled", "true");

					}
				}

				document.getElementById('y_coordinat').value = y;
				document.getElementById('timezone').value = new Date().getTimezoneOffset();
				document.getElementById('form').submit();

			}

		}, false);
	}, false);

	// when window load we draw on svg a point with old params
	window.onload = function (){

		xOld = localStorage.getItem("cx");
		yOld = localStorage.getItem("cy");

		point.setAttribute("cx", xOld);
		point.setAttribute("cy", yOld);

	}









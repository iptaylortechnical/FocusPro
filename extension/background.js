var enabled = false;
var selected;
var default_border;

var hist = {};


//GLOBAL FLAGS
var KEY_SPACE = 32;
var KEY_UP = 38;
var KEY_F = 70;
var KEY_D = 68;
var KEY_S = 83;
var KEY_DOWN = 40;



document.onkeydown = function(event){
	if(event.ctrlKey == true && event.which == KEY_F){
		toggleEnable();
	}

	if(enabled == true){
		event.preventDefault();

		switch(event.which){
			case KEY_D:
				del();
				break;
			case KEY_SPACE:
				sel();
				break;
			case KEY_S:
				single();
				break;
			case KEY_UP:
				parent();
				break;
			case KEY_DOWN:
				child();
				break;
		}

	}

}





function single(){
	setTimeout(function(){
		selected.style.border = default_border;

		var data = selected.outerHTML;

		var bod = document.body;
		bod.innerHTML = data;
	}, 10);
}

function parent(){
	// hist["hist"] = JSON.parse(JSON.stringify(hist));
	hist["selected"] = selected;
	hist["default_border"] = default_border;

	selected.style.border = default_border;

	selected = selected.parentElement;

	default_border = selected.style.border;
	setBorder();
	console.log(JSON.stringify(hist));
}

function sel(){
	resetBorder();

	var selected_raw = $(":hover");
	var selected_length = selected_raw.length;

	selected = selected_raw[selected_length-1];

	default_border = selected.style.border;

	setBorder();
	console.log(selected);
}

function del(){
	setTimeout(function(){
		resetBorder();

		var data = selected.outerHTML;

		var parent = selected.parentElement;
		var parentHTML = parent.innerHTML;
		var parentFinal = "";

		parentFinal = parentHTML.replace(data, "");
		parent.innerHTML = parentFinal;
	}, 10);
}

function toggleEnable(){
	if(enabled == true){
		resetBorder();
		enabled = false;
	}else{
		var selected_raw = $(":hover");
		var selected_length = selected_raw.length;

		selected = selected_raw[selected_length-1];

		default_border = selected.style.border;
		setBorder();
		enabled = true;
	}
}

function child(){
	resetBorder();

	// hist = hist["hist"];
	selected = hist["selected"];
	default_border = hist["default_border"];

	setBorder();
}

function resetBorder(){
	selected.style.border = default_border;
}

function setBorder(){
	selected.style.border = "4px solid red";
}
/* For the js masochists, this is how we avoid using fetch or JQs ajax. */
var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.send();
};

/* This actually does the api call, and adds the images associated. */
function run(searchVal, searchLimit){
  var req = getJSON("http://api.giphy.com/v1/gifs/search?q=" + searchVal + "&api_key=dc6zaTOxFJmzC&limit=" + searchLimit, function(err, res){
	if(err != null){
	  alert("You done fucked up now! " + err);
	}else{
		var container = document.getElementById("gifContainer");
		container.innerHTML = "";
		for(let i in res.data){
			var img = document.createElement("img");
			img.src = res.data[i].images.original_still.url+".gif";
			img.still = res.data[i].images.original_still.url+".gif";
			img.animated = res.data[i].images.original.url+".gif";
			container.appendChild(img);
			img.onclick = gifClicked;
		}
	}
  });
}

/* Changes the source of an image that was added to the dom when clicked. */
function gifClicked(){
	if(this.src == this.still){
		this.src = this.animated;
	}else{
		this.src = this.still;
	}
}

/* Adds a button to the buttonContainer. */
function addButton(){
	var textContent = arguments[0] || document.getElementById("searchBar").value;
	if(textContent.trim() != ""){
		var container = document.getElementById("buttonContainer");
		var buttonToAdd = document.createElement("button");
		buttonToAdd.searchVal = arguments[0] || document.getElementById("searchBar").value;
		buttonToAdd.searchLimit = arguments[1] || ((Math.floor(document.getElementById("numberOfGifs").value) != "" || Math.floor(document.getElementById("numberOfGifs").value) > 0) ? Math.floor(document.getElementById("numberOfGifs").value) : 25);
		buttonToAdd.textContent = textContent.trim() + " (" + buttonToAdd.searchLimit + ")";
		buttonToAdd.onclick = function(e){
			run(buttonToAdd.searchVal, buttonToAdd.searchLimit);
		}
		buttonToAdd.onmousedown = function(e){
			if(e.button == 2){
				container.removeChild(buttonToAdd);
			}
		}
		container.appendChild(buttonToAdd);
	}
}

/* Bad practice I know, but things were getting annoying, so you are just going to have to live with the fact that you have to press F12 to open the console. ¯\_(ツ)_/¯ */
document.addEventListener("contextmenu", event => event.preventDefault());

/* Adds the pre-existing buttons to the webpage. */
addButton("Ben Shapiro Thug Life", 10);
addButton("Meme review", 21);
addButton("freedom intensifies", 7);
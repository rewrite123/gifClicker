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

function gifClicked(){
	if(this.src == this.still){
		this.src = this.animated;
	}else{
		this.src = this.still;
	}
}

function addButton(){
	var textContent = arguments[0] || document.getElementById("searchBar").value;
	if(textContent.trim() != ""){
		var container = document.getElementById("buttonContainer");
		var buttonToAdd = document.createElement("button");
		buttonToAdd.addEventListener("contextmenu", event => event.preventDefault());
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

addButton("Ben Shapiro Thug Life", 10);
addButton("Meme review", 21);
addButton("freedom intensifies", 7);
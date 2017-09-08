const ul = document.getElementById('data');
var searchString = "";
const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchString + '&limit=5&format=json&origin=*'; 

function createNode(element) {
	return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
	return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function wikiReq(url){
	fetch(url)
		.then((resp) => resp.json())
		.then(function(data) {
			var pages = data;
			var searchTerm = pages[0];
			var title = pages[1];
			var content = pages[2];
			console.log(pages[1]);
			/*
			ul.innerHTML += "\
			<li class='listing'>\
				<h2 class='title'>" + title + "</h2>\
				<div class='content'>" +
					content +
				"</div>\
			</li>"
			console.log(pages);
			*/

		/*
	  // Here you get the data to modify as you please
	  	let authors = data.results;
	  	return authors.map(function(author) {
	  		let li = createNode('li');
	  		let img = createNode('img');
	  		let span = createNode('span');
	  		img.src = author.picture.medium;
	  		span.innerHTML = author.name.first + " " + author.name.last;
	  		console.log(span.innerHTML);
	  		append(li, img);
	  		append(li, span);
	  		append(ul, li);
	  	})
		*/
	  }).catch(function(error) {
	  // If there is any error you will catch them here
	  console.log(error);
	});   
};

wikiReq(url);
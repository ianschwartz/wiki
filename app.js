
var vm = new Vue({
	el: "#app",
	data: {
		searchString: "",
		searchResults: [],
		title: "",
		content: "",
		wikiLink: ""
	},
	methods: {
		url: function(str) {
			return 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.searchString + '&limit=5&format=json&origin=*';
		},
		makeSearchReguest: function() {
			if (this.searchStringIsThere) {
				fetch(this.url())
					.then(function(resp) {
						return resp.json();
					}).then(function(resp) {
						vm.searchResults = zipThreeObjs(resp[1], resp[2], resp[3]);
					}).catch(function(error) {
						console.log(error);
				});
			} else {
				fetch("https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=5&origin=*&format=json&rnnamespace=0")
					.then(function(resp) {
						return resp.json();
					}).then(function(resp) {
						data = resp.query.random;
						vm.searchResults = data;
					}).catch(function(error) {
						console.log(error);
				});
			}	
		},
		makeArticleRequest: function(url) {
			fetch(url)
				.then(function(resp) {
					return resp.json();
				}).then(function(resp) {
					var data = resp.parse;
					console.log(resp);
					vm.title = data.title;
					vm.content = data.text["*"];
					vm.wikiLink = "https://en.wikipedia.org/?curid=" + data.pageid;
				}).then(function() {
					sanitizeURLs();
				}).then(function() {
					scrollToArticle();
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		updateArticle: function(title) {
			var url = "https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&format=json&origin=*";
			this.makeArticleRequest(url);
		},
		randomArticle: function() {
			fetch("https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&origin=*&format=json&rnnamespace=0")
				.then(function(resp) {
					return resp.json();
				}).then(function(resp) {
					data = resp.query.random;
					vm.searchResults = data;
					return data[0].title;
				}).then(function(title) {
					vm.updateArticle(title);
				}).catch(function(error) {
					console.log(error);
			});

		}
	},
	computed: {
		searchStringIsThere: function() {
			return this.searchString.length > 0;
		},
		articleLoaded: function() {
			return this.title.length > 0;
		}
	}
})

function zipThreeObjs(obj1, obj2, obj3) {
	var arr = [];
	Object.keys(obj1).forEach(function(key) {
		arr.push({
			title: obj1[key],
			content: obj2[key],
			url: obj3[key]
		})
	});
	return arr;
}
testURL = "https://en.wikipedia.org/wiki/Hood_County_Courthouse_Historic_District";
// https://en.wikipedia.org/w/api.php?action=parse&page=Albert%20Einstein&format=jsonfm
// https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&page=pizza
//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json

function formatPageUrl(url) {
	santizedURL = url.split('/').pop();
	return "https://en.wikipedia.org/w/api.php?action=parse&page=" + santizedURL + "&format=json&origin=*"
//	return "https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&origin=%2A&page=" + santizedURL + "&format=json";
}

function sanitizeURLs() {
	var a = document.getElementById('content').getElementsByTagName('a');
	Object.keys(a).forEach(function(key) {
		var url = a[key].href;
		var splitURL = url.split("/");
		var localURL = window.location.href.split("/");
		if (splitURL[2] === localURL[2] && splitURL.length === 5) {
			a[key].href = "https://en.wikipedia.org/wiki/" + splitURL[4];
			a[key].target = "_blank";
		}
	})
}

function scrollToArticle() {
	var el = document.getElementById("article");
	el.scrollIntoView(true);
}
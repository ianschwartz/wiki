
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
			return 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.searchString + '&format=json&origin=*';
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
				fetch("https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=5&origin=*&format=json")
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
				}).catch(function(error) {
					console.log(error);
				})
		},
		updateArticle: function(title) {
			var url = "https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&format=json&origin=*";
			this.makeArticleRequest(url);
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
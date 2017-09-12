
var vm = new Vue({
	el: "#app",
	data: {
		searchString: "",
		searchResults: [],
		title: "test",
		content: "Incididunt irure et ex dolor consectetur in sint anim qui sit mollit do laborum sit reprehenderit mollit mollit cillum veniam labore elit commodo irure sit dolore voluptate consectetur nulla dolor in qui aute adipisicing in dolore ut.",
		wikiLink: "http://www.google.com"
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
				console.log('no search terms');
			}	
		},
		updateArticle: function(article) {
			console.log(article);
		}
	},
	computed: {
		searchStringIsThere: function() {
			return this.searchString.length > 0;
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
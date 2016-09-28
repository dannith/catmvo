(function(){
	
	var data = {
		selection : 0,	// Which cat is selected (same as indexes in array)
		counters : []	// Counters for every cat
		//data.json
	};

	var octopus = {

		getJson : function(){
			$.get("json/cats.json").done(function(JSON){
				data.json = JSON;
				return octopus.getList();	//	Get the list template
			})
			.fail(function(){
				return view.error("'JSON' file");	// Update view with error msg
			});
		},		

		getList : function(){
			$.get("templates/listTemplate.html")
			.done(function(listTemplate){
				view.container.append(listTemplate);	// Push template into view
				data.json.forEach(function(cat){
					$("#list").append($("<div></div>").addClass("cat").text(cat.name));	// Update the list with names of cats from json
					data.counters.push(0);	//	Add a counter for each cat
				});
				$("#list").on("click", ".cat", function(e){	// Add listener for clicks on list, uses index to update selection
					data.selection = $(".cat").index(e.target);
					view.updateCat();	// Update the cat view with the new selection
				});				
				return octopus.getCat();	//	Get the list template
			})
			.fail(function(){
				return view.error("'list' template");
			});
		},

		getCat : function(){
			$.get("templates/catTemplate.html").done(function(catTemplate){
				view.container.append(catTemplate);		//	Push template into view
				$("#main-cat").on("click", "img", function(e){	// Add listener for clicks on cat picture
					data.counters[data.selection]++;	// Update the counter
					view.updateCounter();	//	Update the view
				});
				return view.updateCat();	// Update the view
			})
			.fail(function(){
				return view.error("'cat' template");
			});
		}
	};

	var view = {

		init : function(){
			this.container = $("#container");	//	The container everything will be put in
			octopus.getJson();	// Start by getting the JSON file
		},

		updateCat : function(){	// Updates the cat view
			$("#main-cat-name").text(data.json[data.selection].name);
			$("#main-cat").find("img").attr("src", data.json[data.selection].path);
			return this.updateCounter();
		},

		updateCounter : function(){
			$("#main-cat-clicks").text(data.counters[data.selection]);
		},

		error : function(info){	//	If theres an error while fetching the files, display it here
			this.container.html($("<h3></h3>").attr("id", "error").text("ERROR: could not load " +info+ "."));
		}

	};

	view.init();


}());
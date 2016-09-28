(function(){

var catPix = ["images/cat1.png","images/cat2.png", "images/cat3.png", "images/cat4.png", "images/cat5.png"];

var build = {
	div : function(data = catPix, counter = 0){
			var tempdiv = $("<div></div>").addClass("cat-box");		// Create a tempdiv that we will add to the container - 1 for each data.
			tempdiv.append($("<img>", {src: data[counter]}));
			tempdiv.append($("<div></div>").addClass("cat-clix").text(0));
			$("#container").append(tempdiv);	
			if(counter + 1 < data.length){ return this.div(data, ++counter);}		//Recurse
			else { return this.listener();}		// If everything in data is loaded - create listener
	},
	listener : function(){
		$(".cat-box").on("click", function(){
			var counter = $(this).find(".cat-clix").text();		// Get the current number
			counter++;		// Update it	
			$(this).find(".cat-clix").text(counter);		// Replace
		});
	}
};
build.div();		// Init
}());


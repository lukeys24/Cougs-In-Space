var Smile = (function() {

    // PRIVATE VARIABLES
        
    // The backend we'll use for Part 2. For Part 3, you'll replace this 
    // with your backend.
 // var apiUrl = 'https://smile451.herokuapp.com'; 
	var apiUrl = 'http://localhost:5000';
    // FINISH ME (Task 4): You can use the default smile space, but this means
    //            that your new smiles will be merged with everybody else's
    //            which can get confusing. Change this to a name that 
    //            is unlikely to be used by others. 
    var smileSpace = 'Jared'; // The smile space to use. 


    var smiles; // smiles container, value set in the "start" method below
    var smileTemplateHtml; // a template for creating smiles. Read from index.html
                           // in the "start" method
    var create; // create form, value set in the "start" method below


    // PRIVATE METHODS
      
   /**
    * HTTP GET request 
    * @param  {string}   url       URL path, e.g. "/api/smiles"
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
   var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'GET',
           url: apiUrl + url,
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };

    /**
     * HTTP POST request
     * @param  {string}   url       URL path, e.g. "/api/smiles"
     * @param  {Object}   data      JSON data to send in request body
     * @param  {function} onSuccess   callback method to execute upon request success (200 status)
     * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
     * @return {None}
     */
    var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'POST',
            url: apiUrl + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };
        
    /**
     * Insert smile into smiles container in UI
     * @param  {Object}  smile       smile JSON
     * @param  {boolean} beginning   if true, insert smile at the beginning of the list of smiles
     * @return {None}
     */
    var insertSmile = function(smile, beginning) {
        // Start with the template, make a new DOM element using jQuery
        var newElem = $(smileTemplateHtml);
        // Populate the data in the new element
        // Set the "id" attribute 
        newElem.attr('id', smile.id); 
        // Now fill in the data that we retrieved from the server
		console.log(newElem.find('.inmid'));
        newElem.find('.inmid').text(smile.title);
		newElem.find('.story').text(smile.story);
		if(smile.happiness_level == 2)
			newElem.find('.happiness-level-1').removeClass("happiness-level-1").addClass('happiness-level-2');
		if(smile.happiness_level == 3)
			newElem.find('.happiness-level-1').removeClass("happiness-level-1").addClass('happiness-level-3');
        newElem.find('.count').text(smile.like_count);
		newElem.find('.timestamp').text(smile.created_at);
        newElem.find('.updated_at').text(smile.updated_at);
		
		
		//This should work and show the time and date@!
		var myDate = new Date(smile.created_at); // Your timezone!
		var myEpoch = myDate.getTime()/1000.0;
		newElem.find('.timestamp').text(smile.myEpoch);

        // FINISH ME (Task 2): fill-in the rest of the data
		
        if (beginning) {
            smiles.prepend(newElem);
        } else {
            smiles.append(newElem);
        }
    };


     /**
     * Get recent smiles from API and display 10 most recent smiles
     * @return {None}
     */
    var displaySmiles = function() {
        // Prepare the AJAX handlers for success and failure
		
        var onSuccess = function(data) {
            /* FINISH ME (Task 2): display smiles with most recent smiles at the beginning */
			var i = 0;
			while(data.smiles[i] != null)
			{
				insertSmile(data.smiles[i], false);
				i++;
			}
        };
        var onFailure = function() { 
            console.error('display smiles failed'); 
        };
        /* FINISH ME (Task 2): make a GET request to get recent smiles */
		makeGetRequest("/api/smiles?space="+smileSpace+"&count=10&order_by=created_at", onSuccess, onFailure);
    };

    /**
     * Add event handlers for clicking like.
     * @return {None}
     */
    var attachLikeHandler = function(e) {
        // Attach this handler to the 'click' action for elements with class 'like'
        smiles.on('click', '.like', function(e) {
            // FINISH ME (Task 3): get the id of the smile clicked on to use in the POST request
            //var smileId = '123';
			
			var smileID = $(this).parents('article').attr('id');
			console.log(smileID);
			var url = "/api/smiles/" + smileID + "/like";

			//$(this).attr('like_count') = smileLikes;
            // Prepare the AJAX handlers for success and failure
            var onSuccess = function(data) {
                /* FINISH ME (Task 3): update the like count in the UI */
				//get the story id that was updated and then update only
				//the like count value (Div)
				//just post the value of like count to the screen
				//document.getElementById($(this).attr('id')).setAttribute("count", $(this).attr('like_count')+1);
				//$(this).parents('article').attr('count').text(newLikeCount); 
				//update the count div and find out why smiles arent posting.
				//this articles child class is count

			 $('#' +smileID+ ' .count').text(data.smile.like_count);
			 
            };
            var onFailure = function() { 
                console.error('like smile error'); 
            };
            /* FINISH ME (Task 3): make a POST request to like this smile */
			makePostRequest(url, smiles, onSuccess, onFailure);
        });
    };


    /**
     * Add event handlers for submitting the create form.
     * @return {None}
     */
    var attachCreateHandler = function(e) {
        // First, hide the form, initially 
        create.find('form').hide();

        // FINISH ME (Task 4): add a handler to the 'Share a smile...' button to
        //                     show the 'form' and hide to button
		create.on('click', '.share-smile', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action
			smiles.find('.smile').hide();
			create.find('.share-smile').hide();
			create.find('form').show();
        });
		
        // FINISH ME (Task 4): add a handler for the 'Cancel' button to hide the form
        // and show the 'Shared a smile...' button
		 create.on('click', '.cancel-input', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action
			
			smiles.find('.smile').show();
			create.find('.share-smile').show();
			create.find('form').hide();
			//show smiles again
        });

        // The handler for the Post button in the form
        create.on('click', '.submit-input', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

            var smile = {}; // Prepare the smile object to send to the server
            smile.title = create.find('.title-input').val();
			smile.story = create.find('.story-input').val();
			smile.like_count = 0;
			smile.space = smileSpace;
			var happiness_level_string = $('.happiness-level-input').find('option:selected').text();
			if(happiness_level_string == "Happy")
			{ smile.happiness_level = 1; }
			if(happiness_level_string == "Really Happy")
			{ smile.happiness_level = 2; }
			if(happiness_level_string == "So ecstatic, I can't stop smiling!")
			{ smile.happiness_level = 3; }
			//returns the string from the drop down menu, compare to another string to store value in correct number for happiness level in json file
			
			
            // FINISH ME (Task 4): collect the rest of the data for the smile
            var onSuccess = function(data) {
                // FINISH ME (Task 4): insert smile at the beginning of the smiles container
				insertSmile(data.smile, true);
				//smiles.show();
				//makeGetRequest("/api/smiles?space="+smileSpace+"&count=10&order_by=created_at", onSuccess, onFailure);
				
				smiles.find('.smile').show();
				create.find('.share-smile').show();
				create.find('form').hide();
            };
            var onFailure = function() { 
                console.error('create smile failed'); 
            };
            
            // FINISH ME (Task 4): make a POST request to create the smile, then 
            //            hide the form and show the 'Shared a smile...' button
			//finish the json object { "space": "testing", "title": "mytitle", "story happinesllevel like_count}
			if(smile.title.length <= 0 || smile.title.length > 64)
			{
				console.error('Title was too long or too short');
				alert('Title was too long or too short');
			}
			else if(smile.happiness_level < 1 || smile.happiness_level > 3)
			{
				console.error('Happiness Level incorrect choice');
				alert('Happiness Level incorrect choice');
			}
			else if(smile.story.length <= 0 || smile.story.length > 2048)
			{
				console.error('Story was too long or too short.');
				alert('Story was too long or too short.');
			}
			else
			{
				makePostRequest('/api/smiles/', smile, onSuccess, onFailure);
			}
        });

    };

    
    /**
     * Start the app by displaying the most recent smiles and attaching event handlers.
     * @return {None}
     */
    var start = function() {
        smiles = $(".smiles");
        create = $(".create");

        // Grab the first smile, to use as a template
        smileTemplateHtml = $(".smiles .smile")[0].outerHTML;
        // Delete everything from .smiles
        smiles.html('');

        displaySmiles();
        attachLikeHandler();
        attachCreateHandler();
    };
    

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via Smile.key_name, e.g. Smile.start()
    return {
        start: start
    };
    
})();
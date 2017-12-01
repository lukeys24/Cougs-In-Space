window.onload = function() {
    showPage('Home-navbar');
};

var Cougs_In_Space = (function() {

	//Private Variables
    var apiUrl = 'http://localhost:8080';
    var cis;

    var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'GET',
           url: apiUrl + url,
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };

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

    var insertPost = function(post, beginning) {
        // Start with the template, make a new DOM element using jQuery
        var newElem = $(postTemplateHtml);
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
    var attachCreateHandler = function(e) {

        cis.on('click', '.submit', function(e) {
            e.preventDefault();
            create.find('form').hide();
            post.parent().find('.create-post').show();
            post.show();
        });
    };

    var start = function() {
        
        cis = $(".cis");
        attachCreateHandler();
		//DOM template for posts
		postTemplateHtml = $(".card-container .card")[0].outerHTML;
    };

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via Smile.key_name, e.g. Smile.start()
    return {

        start: start
    };

})();

function showPage(id) {
    cis = $(".cis");
    if (id == 'Home-navbar') {
         cis.find('.home-page').show();
         //find the nav bar element and add the active class
    } else {
         cis.find('.home-page').hide();
    }
    if (id == 'Our-Teams') {
        cis.find('.team-page').show();
    } else {
        cis.find('.team-page').hide();
    }
    if (id == 'Systems-dropdown') {
        cis.find('.systems-page').show();
    } else {
        cis.find('.systems-page').hide();
    }
    if (id == 'Power-dropdown') {
        cis.find('.power-page').show();
    } else {
        cis.find('.power-page').hide();
    }
    if (id == 'Attitude-dropdown') {
        cis.find('.attitude-page').show();
    } else {
        cis.find('.attitude-page').hide();
    }
    if (id == 'Structures-dropdown') {
        cis.find('.structure-page').show();
    } else {
        cis.find('.structure-page').hide();
    }
    if (id == 'Thermal-dropdown') {
        cis.find('.thermal-page').show();
    } else {
        cis.find('.thermal-page').hide();
    }
    if (id == 'Donors-navbar') {
        cis.find('.donors-page').show();
    } else {
        cis.find('.donors-page').hide();
    }
    if (id == 'GetInvolved-navbar') {
        cis.find('.get-involved-page').show();
    } else {
        cis.find('.get-involved-page').hide();
    }
    if (id == 'Donate-navbar') {
        cis.find('.donate-page').show();
    } else {
        cis.find('.donate-page').hide();
    }
    if (id == 'K-12-navbar') {
        cis.find('.k-12-page').show();
    } else {
        cis.find('.k-12-page').hide();
    }
    if (id == 'About-navbar') {
        cis.find('.about-page').show();
    } else {
        cis.find('.about-page').hide();
    }
};

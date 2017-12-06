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

    //inserts a post into a specific team section based on which team name the 
    var insertPost = function(post, beginning, teamName) {
        // Start with the template, make a new DOM element using jQuery
        var newElem = $(postTemplateHtml);
        // Populate the data in the new element
        // Set the "id" attribute 
        newElem.attr('id', post.id);
        newElem.find('team-name').text(post.team);
        newElem.find('title').text(post.title);
        newElem.find('post-body').text(post.body);

        // Now fill in the data that we retrieved from the server
        switch(teamName) {
            case "systems":
            {
                if (beginning) 
                {
                    systems-posts-container.prepend(newElem);
                }
                else
                {
                    systems-posts-container.append(newElem);
                }
                break;
            }
            case "attitude":
            {
                if (beginning) 
                {
                    attitude-posts-container.prepend(newElem);
                }
                else
                {
                    attitude-posts-container.append(newElem);
                }
                break;
            }
            case "power":
            {
                if (beginning) 
                {
                    power-posts-container.prepend(newElem);
                }
                else
                {
                    power-posts-container.append(newElem);
                }
                break;
            }
            case "thermal":
            {
                if (beginning) 
                {
                    thermal-posts-container.prepend(newElem);
                }
                else
                {
                    thermal-posts-container.append(newElem);
                }
                break;
            }
            case "structures":
            {
                if (beginning) 
                {
                    structures-posts-container.prepend(newElem);
                }
                else
                {
                    structures-posts-container.append(newElem);
                }
                break;
            }
            default:
            {

            }
        }
    };

    var displayPosts = function () {
        var onSuccess = function(data) {
            var json = data.posts;
            /*
            for (i = 0; i < json.length; i++) {
                if (i == 0) {
                    insertSmile(json[i], true);
                } else {
                    insertSmile(json[i], false);
                }
            }
            */
            
        };
        var onFailure = function(error) { 
            console.error(error.status);
        };
        /* FINISH ME (Task 2): make a GET request to get recent smiles */
        makeGetRequest("/api/posts/Power", onSuccess, onFailure);
    };

    var attachCreateHandler = function(e) {

        // FINISH ME (Task 4): add a handler for the 'Cancel' button to hide the form
        // and show the 'Shared a smile...' button
        cis.parent().on('click', '.cancel', function(e) {
            e.preventDefault();
        });

        // The handler for the Post button in the form
        cis.parent().on('click', '.submit', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

            var post = {}; // Prepare the smile object to send to the server
            post.title = cis.parent().find('.createTitle').val();
            post.update = cis.parent().find('.postBody').val();
            post.like_count = 0;
            space = cis.parent().find('.teamSelect').val();


            // FINISH ME (Task 4): collect the rest of the data for the smile
            var onSuccess = function(data) {
                displayPosts();
            };
            var onFailure = function(error) { 
                console.error(error.status); 
            };
            
            // FINISH ME (Task 4): make a POST request to create the smile, then 
            //            hide the form and show the 'Shared a smile...' button
            if (post.title.length == 0 || post.title.length > 64) {
                window.alert("Title length is invalid");
            } else if (post.update.length == 0 || post.update.length > 2048) {
                window.alert("Update length is invalid");
            } else {
                makePostRequest("/api/posts/" + space, post, onSuccess, onFailure);
            }
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
        cis.find('.structures-page').show();
    } else {
        cis.find('.structures-page').hide();
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
    if (id == 'Create-dropdown') {
        cis.find('.create-page').show();
    } else {
        cis.find(".create-page").hide();
    }
};

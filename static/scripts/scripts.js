window.onload = function() {
    showPage('Home-navbar');
};

var Cougs_In_Space = (function() {

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

    var attachCreateHandler = function(e) {

        cis.on('click', '.submit', function(e) {
            e.preventDefault();
            create.find('form').hide();
            smiles.parent().find('.share-smile').show();
            smiles.show();
        });
    };

    var start = function() {
        
        cis = $(".cis");
        attachCreateHandler();
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

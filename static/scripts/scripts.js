var Cougs_In_Space = (function() {


    var attachHomePageHandler = function(e) {
        // First, hide the forms and page content initially
		index.find('home-page').show();      //HOMEPAGE HANDLER
		index.find('team-page').hide();
		index.find('donors-page').hide();
		index.find('get-involved-page').hide();
		index.find('donate-page').hide();
		index.find('K-k-12-page').hide();
		index.find('about-page').hide();
		index.find('systems-page').hide();
		index.find('power-page').hide();
		index.find('attitude-page').hide();
		index.find('structure-page').hide();
		index.find('thermal-page"').hide();

    };

    

    var start = function() {

        attachHomePageHandler();
    };

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via Smile.key_name, e.g. Smile.start()
    return {

        start: start
    };

})();

function test(id) {
    
}
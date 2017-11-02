var Cougs_In_Space = (function() {


    var attachHomePageHandler = function(e) {
        // First, hide the forms and page content initially
		index.find('HomePageContent').show();      //HOMEPAGE HANDLER
		index.find('TeamsCreateForm').hide();
		index.find('DonorsPageContent').hide();
		index.find('GetInvolvedPageContent').hide();
		index.find('DonatePageContent').hide();
		index.find('K-12PageContent').hide();
		index.find('AboutPageContent').hide();
		index.find('TeamsPageContent-Systems').hide();
		index.find('TeamsPageContent-Power').hide();
		index.find('TeamsPageContent-Attitude').hide();
		index.find('TeamsPageContent-Structures').hide();
		index.find('TeamsPageContent-Thermal').hide();

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

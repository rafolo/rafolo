var SignInPage = require('../sessions/sign-in.po.js');
var AlarmsPage = require('./alarms.po.js');
describe('Alarms Tests', function(){
    var signInPage = new SignInPage();
    var alarmsPage = new AlarmsPage();
    var params = browser.params;
    beforeEach(function() {
        isAngularSite(false);
        signInPage.signInAsDefaultUser();
        isAngularSite(true);
        alarmsPage.visit();
    });

    it('should be ok', function() {
        expect(signInPage.isSignedIn()).toBe(true);
        expect(true).toBe(true);
        //TODO: validate Angular model
    });
});
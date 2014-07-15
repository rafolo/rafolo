var SignInPage = require('./sign-in.po.js');
describe('Sign-in Tests', function(){
    var signInPage = new SignInPage();
    var params = browser.params;
    beforeEach(function() {
        isAngularSite(false);
        signInPage.visit();
    });

    it('should sign in with valid credentials', function() {
        signInPage.signIn(params.signIn.user, params.signIn.password);
        expect(signInPage.isSignedIn()).toBe(true);
    });

    it('should sign in as default user', function() {
        signInPage.signInAsDefaultUser();
        expect(signInPage.isSignedIn()).toBe(true);
    });

    it('should not sign in with invalid credentials', function() {
        signInPage.signIn('unknown', 'unknown');
        expect(signInPage.isSignedIn()).toBe(false);
        expect(signInPage.validationMessage()).toBe('Invalid email/password combination.');
    });
});
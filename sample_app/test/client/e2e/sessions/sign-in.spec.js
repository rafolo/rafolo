var SignInPage = require('./sign-in.po.js');
describe('Sign-in Tests', function(){
    beforeEach(function() {
        isAngularSite(false);
    });
    var signInPage = new SignInPage();
    signInPage.signIn('olgierd.falat@gmail.com', '123456')

});
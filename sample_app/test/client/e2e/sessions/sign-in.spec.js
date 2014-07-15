var SignInPage = require('./sign-in.po.js');
describe('Sign-in Tests', function(){
    var signInPage = new SignInPage();;
    beforeEach(function() {
        isAngularSite(false);
        //browser.debugger();
        signInPage.visit();
        //browser.pause();
    });

    it('should sign with valid credentials', function() {
        signInPage.signIn('olgierd.falat@gmail.com', '123456')

        //expect(todoList.count()).toEqual(2);
        //expect(todoList.get(1).getText()).toEqual('build an angular app');
    });
});
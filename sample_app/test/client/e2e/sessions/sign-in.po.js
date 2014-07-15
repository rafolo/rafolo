var SignInPage = function() {
    //console.log(dvr);
    this.email = element(By.css('#session_email'));
    this.password = element(By.css('#session_password'));
    this.signInLink = element(By.css('input[type="submit"]'));

    this.visit = function() {
        browser.get('/signin');
    };

    this.signIn = function(email, password) {
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.signInLink.click();
    };

    this.isSignedIn = function() {
        return element(By.id('signout')).isPresent();
    }
};
module.exports = SignInPage;
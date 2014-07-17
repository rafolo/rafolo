var SignInPage = function() {
    this.email = element(By.css('#session_email'));
    this.password = element(By.css('#session_password'));
    this.signInLink = element(By.css('input[type="submit"]'));
    var params = browser.params;
    this.visit = function() {
        browser.get('/signin');
    };

    this.signIn = function(email, password) {
        console.log("Email: " + email);
        console.log("Password: " + password);
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.signInLink.click();
    };

    this.signInAsDefaultUser = function() {
        this.visit();
        this.signIn(params.signIn.user, params.signIn.password);
    }

    this.isSignedIn = function() {
        return element(By.id('signout')).isPresent();
    }

    this.validationMessage = function() {
        return element(By.css('div.alert-error')).getText();
    }
};
module.exports = SignInPage;
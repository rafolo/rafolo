var SignInPage = function() {
    this.email = element(By.css('#session_email'));
    this.password = element(By.css('#session_password'));
    this.signInLink = element(By.css('input[type="submit"]'));
    this.singOutLink = element(By.xpath("//a[@href='/signout?locale=en']"));
    var params = browser.params;
    this.visit = function() {
        browser.get('/signin');
    };

    this.signIn = function(email, password) {
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.signInLink.click();
    };

    this.signInAsDefaultUser = function() {
        this.visit();
        this.signIn(params.signIn.user, params.signIn.password);
    }

    this.isSignedIn = function() {
        return this.singOutLink.isPresent();
    }

    this.validationMessage = function() {
        return element(By.css('div.alert-error')).getText();
    }
};
module.exports = SignInPage;
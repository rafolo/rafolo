var SigninPage = function() {
    this.email = dvr.find(By.css('#session_email'));
    this.password = dvr.find(By.css('#session_password'));
    this.signInLink = element(By.css('input[type="submit"]'));

    this.get = function() {
        browser.get('/signin');
    };

    this.signIn = function(email, password) {
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.signInLink.click();
    };
};
module.exports = Homepage;
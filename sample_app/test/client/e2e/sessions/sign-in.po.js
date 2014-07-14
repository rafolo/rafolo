var SignInPage = function() {
    //console.log(dvr);
    this.email = dvr.findElement(By.css('#session_email'));
    this.password = dvr.findElement(By.css('#session_password'));
    this.signInLink = dvr.findElement(By.css('input[type="submit"]'));

    this.get = function() {
        //browser.debugger();
        browser.get('/signin');
    };

    this.signIn = function(email, password) {
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.signInLink.click();
    };
};
module.exports = SignInPage;
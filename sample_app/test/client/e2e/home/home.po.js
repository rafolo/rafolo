var Homepage = function() {
    this.signInLink = element(by.model('yourName'));

    this.get = function() {
        browser.get('/');
    };

    this.clickSignIn = function() {
        this.signInLink.click();
    };
};
module.exports = Homepage;
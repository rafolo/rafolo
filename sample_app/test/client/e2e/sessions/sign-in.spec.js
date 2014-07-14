var Homepage = require('./sign-in.po.js');
describe('Sign-in Tests', function(){
    var angularHomepage = new AngularHomepage();
    angularHomepage.nameInput.sendKeys('Rafael');
    //...
});
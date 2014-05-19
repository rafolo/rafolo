'use strict';

/* jasmine specs for services go here */

function Apple(name)
{
    this.id =1;
    this.type=name;
    this.sayHello = function ()
    {
        console.log("Hi it is " + name + "1");
    }
}

describe('My suite', function(){
    var mac = new Apple('Macintosh');

    it ('Shoud be true', function(){
        expect(mac.id == 1).toBe(true);
    });

    it ('Negative case', function(){
        expect(mac.type.length > 4);
    });

    it ('Works with obkjects', function(){
        var a = {id:1, len:2};
        var b = {id:1, len:2};

        expect(a).toEqual(b);
    });
})

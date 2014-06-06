"use strict";
describe("the mappoint module", function () {
    var getDataMock, mappointService;

    beforeEach(function () {

        module("ngRoute");
        module("app.mappoint", function($provide) {
            getDataMock = { sayHello: jasmine.createSpy().andReturn("Hello Mock!") };
            $provide.value('helloWorldService', getDataMock);
        });

        //properly instantiate the service
        inject(["mappointService", function (_mappointService) {
            mappointService = _mappointService;
        }]);
    });


    it("should start with map point data populated", function () {

    });
});

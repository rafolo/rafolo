"use strict";
describe("the home module", function () {
    var helloService;

    beforeEach(function () {
        //load contact module,    see http://docs.angularjs.org/api/angular.mock.inject
        module("app.home");

        //properly instantiate the service
        /*inject(["ContactService", function (_contactService) {
            contactService = _contactService;
        }]);*/

        console.log = jasmine.createSpy('console');
    });


    it("should succeed", function () {
        expect(true).toBe(true);
    });
});

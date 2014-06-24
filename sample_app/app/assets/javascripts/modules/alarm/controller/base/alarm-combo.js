/**
 * Created by Rafal on 2014-06-15.
 */
function AlarmCombo($scope){
    var _this = this;

    //Combo
    $scope.activeComboData = [
        {name: "Active", active: true},
        {name: "Inactive", active: false}
    ];
    $scope.myComboData = [
        {name: "Old", age: 50},
        {name: "Young", age: 10}
    ];

}
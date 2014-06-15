/**
 * Created by Rafal on 2014-06-15.
 */
function VasabiGridBaseController($scope){
    var _this = this;

    //private
    $scope.myData;
    $scope.mySelections = [];

    //Filters
    $scope.$watch('gridOptions.filterOptions.filterTextProxy', function (searchText, oldsearchText) {
        if (searchText !== oldsearchText) {
            $scope.gridOptions.filterOptions.filterText = "name:" + searchText + "; ";
        }
    });
    $scope.filterOptions = { filterText: '', filterTextProxy: ''};

    //Pagination
    $scope.totalServerItems = 0;

    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function (data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                    data = largeLoad.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data, page, pageSize);
                });
            } else {
                $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad, page, pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    //Save
    $scope.updateEntity = function (row) {

        if (!$scope.save) {
            $scope.save = { promise: null, pending: false, row: null };
        }
        $scope.save.row = row.rowIndex;
        if (!$scope.save.pending) {
            $scope.save.pending = true;
            $scope.save.promise = $timeout(function () {
                // $scope.list[$scope.save.row].$update();
                console.log("Here you'd save your record to the server, we're updating row: "
                    + $scope.save.row + " to be: "
                    + $scope.myData[$scope.save.row].name + ","
                    + $scope.myData[$scope.save.row].age + ","
                    + $scope.myData[$scope.save.row].status);
                $scope.save.pending = false;
            }, 500);
        }
    };

    //Self
    $scope.gridOptions = {
        data: 'myData',
        columnDefs: $scope.columnDefs,
        selectedItems: $scope.mySelections,
        filterOptions: $scope.filterOptions,
        enableRowSelection: true,
        enableCellEditOnFocus: true,
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems', //paging
        pagingOptions: $scope.pagingOptions,
        selectWithCheckboxOnly: true,
        showSelectionCheckbox: true,
        enableHighlighting: false,
        //showGroupPanel: true,
        //enablePinning: true,
        multiSelect: false
    };

    $scope.changeValue = function changeValue(attribute, value) {
        //alert(JSON.stringify({"attributeID":attribute.attribute.id, "type": attribute.type.typeName, "value":value.id}));
        alert(attribute.name);
    };

}
"use strict";

demoApp.controller('IndexCtrl', ['$scope', '$http',
    function ($scope, $http) {

        //get example data from .json

        $http({
            method: 'GET',
            url: '../data/data.json'
        }).
            success(function (data, status, headers, config) {
                $scope.lovModel = data; //this will be the LOV datasource
            });

        //setup 3 properties

        $scope.lovTitle = "Search for Employees";
        $scope.lovColumnList = ["ID", "First Name", "Last Name"];
        $scope.lovFieldList = ["employeeNumber", "firstName", "lastName"];
        
        //function to be called when you click "choose" button
        $scope.lovCallBack = function (e) {
            //e parameter contains the whole object for the row selected

            $scope.SelectedEmployee = e;
        }

    }]);



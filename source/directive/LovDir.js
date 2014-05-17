/**
The MIT License (MIT)

Copyright (c) 2014 Rolando CC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 *
 * @author Rolando Calderon C
 * @version 1.0
 * @see https://github.com/rolandocc/lov-angular-directive
 * @licence MIT
 */

"use strict";

angular.module("lov-directive", [])
    .directive("lov", ['$modal', function ($modal) {
        return {
            restrict: 'A',
            scope: {
                model: '=',
                title: '=',
                callback: '&',
                columnlist: '=',
                fieldlist: '='
            },
            template: '<button type="button" class="btn btn-default" ' +
                            'ng-click="openPopUp(model, title, callback, columnlist, fieldlist)">' +
                            ' <span class="glyphicon glyphicon-search"></span>' +
                       '</button>',
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.openPopUp = function (model, title, callback, columnlist, fieldlist) {

                    $scope.localPopUp = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        templateUrl: '../template/lovTemplate.html',
                        controller: 'LovCtrl',
                        windowClass: '',
                        resolve: {
                            Model: function () {
                                return model;
                            },
                            Title: function () {
                                return title;
                            },
                            ColumnList: function () {
                                return columnlist;
                            },
                            FieldList: function () {
                                return fieldlist;
                            }
                        }
                    };

                    var modalInstance = $modal.open($scope.localPopUp);

                    modalInstance.result.then(function (selectedItem) {
                        callback({ e: selectedItem });
                    }, function () {
                        //dismiss: nothing to do
                    });
                }
            }]
        }
    }])
    .filter('StartOnPage', function () {
        return function (input, start) {
            start = +start;
            return input.slice(start);
        }
    })
    .controller('LovCtrl', ['$scope', '$log', '$rootScope', '$modalInstance', 'Model', 'Title', 'ColumnList', 'FieldList',
    function ($scope, $log, $rootScope, $modalInstance, Model, Title, ColumnList, FieldList) {

        $scope.ColumnList = ColumnList; //list of columns to show
        $scope.FieldList = FieldList; //list of fields to show
        $scope.Model = Model; //data we want to show 
        $scope.Title = Title; //title for the modal

        $scope.PageSize = 5; //max records per page
        $scope.CurrentPage = 0; //initial page

        //how many pages are available
        $scope.TotalPages = function () {
            return Math.ceil($scope.Model.length / $scope.PageSize);
        }

        //moves back
        $scope.PrevPage = function () {
            if ($scope.CurrentPage > 0)
                $scope.CurrentPage--;
        }

        //moves forward
        $scope.NextPage = function () {
            if ($scope.CurrentPage < $scope.TotalPages() - 1)
                $scope.CurrentPage++;
        }

        //when you click "choose" button
        $scope.ChooseItem = function (x) {
            $modalInstance.close(x);
        }

        //when you clic "X" button
        $scope.CloseLov = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
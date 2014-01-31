var dataService = new breeze.DataService({
    serviceName: 'http://localhost:2360/api/Products',
    adapterName: 'webapi',
    hasServerMetadata: false
});

var manager = new breeze.EntityManager({
    dataService: dataService
});

var app = angular.module("myApp", []);

app.controller("ctrl", function ($scope) {
   // $scope.personas = [{ nombre: "Rubén" }, { nombre: "Katia" }];
    var query = breeze.EntityQuery.from("/");
    manager.executeQuery(query).then(function (data) {
        $scope.results = data.results;
        $scope.$apply();
    }).fail(function (e) {
        alert(e);
    });
});

app.controller("ctrl2", function ($scope) {
    $scope.valor = "";
    $scope.resultado = [];
 

    $scope.find = function (d) {
        //$scope.persona = { nombre: d };
      var op = breeze.FilterQueryOp
      var query2 = breeze.EntityQuery.from("/") // + d);
          .withParameters({ id: d });
          //.where("Id", op.Equals, parseInt(d));
        manager.executeQuery(query2).then(function (data) {
            $scope.resultado = data.results;
            $scope.$apply();
        }).fail(function (e) {
            alert(e);
        });
    };
});
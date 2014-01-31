var dataService = new breeze.DataService({
    serviceName: 'http://localhost:2360/api/Categories',
    adapterName: 'webapi',
    hasServerMetadata: false
});

var manager = new breeze.EntityManager({
    dataService: dataService
});

var app = angular.module("myApp", []);

app.controller("ctrl", function ($scope) {
    var query = new breeze.EntityQuery()
        .from("/")
        //.orderBy("CategoryName desc")
        //.where("CategoryName", "startsWith", "C");;

    manager.executeQuery(query).then(function (data) {
        $scope.results = data.results;
        $scope.$apply();
    }).fail(function (e) {
        alert(e);
    });
});

app.controller("ctrl2", function ($scope) {
    $scope.campos = [
        { nombre: "CategoryID" },
        { nombre: "CategoryName" }];
   
    $scope.campo = "";

    $scope.ord = "asc";

    $scope.resultado = [];

    $scope.ordena = function (campo) {    
        if (campo != undefined) {
            var query = new breeze.EntityQuery()
                .from("/")
                .orderBy(campo + ' ' + $scope.ord);

            manager.executeQuery(query).then(function (data) {
                $scope.results = data.results;
                $scope.$apply();
            }).fail(function (e) {
                alert(e);
            });
        };
    };
});

app.controller("ctrl3", function ($scope) {
    $scope.filtros = [
        { campo: "CategoryName", operador: "startsWith", valor: "C" },
        { campo: "CategoryID", operador: "==", valor: 4 }
    ];

    $scope.opcionesDeFiltrado = [
        { texto: "Categorias que comienzan con C" , indice:"0"},
        { texto: "Categoría cuyo ID es 4", indice:"1"}
    ];

    $scope.opcion = {  };

    $scope.filtra = function (c, o, v) {
        var query = new breeze.EntityQuery()
            .from("/")
            .where(c,o,v);

        manager.executeQuery(query).then(function (data) {
            $scope.results = data.results;
            $scope.$apply();
        }).fail(function (e) {
            alert(e);
        });
    };

});
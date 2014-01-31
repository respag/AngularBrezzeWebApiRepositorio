var dataService = new breeze.DataService({
    serviceName: 'http://localhost:2360/api/Employees',
    adapterName: 'webapi',
    hasServerMetadata: false
});

var manager = new breeze.EntityManager({
    dataService: dataService
});

var app = angular.module("myApp", []);

app.controller("ctrl", function ($scope) {
    var query = new breeze.EntityQuery()
        .from("/");
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
    $scope.ciudad = "";

    //Query para devolver las distintas ciudades de la tabla empleados y con el resultado poblar el dropdownlist
    var query = new breeze.EntityQuery()
        .from("/")
        .select('City');
    manager.executeQuery(query).then(function (data) {
        $scope.results = data.results;
        //Llama a la función para quitar los duplicados y devuelve un resultado con las distintas ciudades
        $scope.results = unique($scope.results);
        $scope.$apply();
    }).fail(function (e) {
        alert(e);
    });

    $scope.filtro = { campo: "City", operador: "==", valor: $scope.ciudad };

    $scope.filtra = function (c, o, v) {
        //Query para devolver los empleados por ciudad
        var query2 = new breeze.EntityQuery()
       .from("/")
       .where(c, o, v);

        //Ejecutamos el query
        manager.executeQuery(query2).then(function (data) {
            $scope.resEmplByCity = data.results;
            $scope.$apply();
        }).fail(function (e) {
            alert(e);
        });
    }
   
   /* Función para quitar duplicados en un array  */
    function unique(list) {
        //Creamos un array para guardar las DISTINTAS ciudades.
        var arrResult = [];
        //Creamos un array para guardar las ciudades (recordar que el resultado que devuelve Breeze es un arreglo de objetos
        var arrCities = [];
        //Recorremos el resultado devuelto por Breeze, y guardamos en el arreglo arrCities
        $.each(list, function (i, e) {
            arrCities.push(e.City)
        });
        //Ahora recorremos el arreglo arrCities y usando la función jQuery.inArray(), colocamos en el arreglo arrResult, sólo las ciudades que ya no están allí
        $.each(arrCities, function (i, e) {
            if ($.inArray(e, arrResult) === -1) arrResult.push(e);
        });
        //La función devuelve el arreglo sin los duplicados 
        return arrResult;
}



//    $scope.campos = [
//        { nombre: "CategoryID" },
//        { nombre: "CategoryName" }];

//    $scope.campo = "";

//    $scope.ord = "asc";

//    $scope.resultado = [];

//    $scope.ordena = function (campo) {
//        if (campo != undefined) {
//            var query = new breeze.EntityQuery()
//                .from("/")
//                .orderBy(campo + ' ' + $scope.ord);

//            manager.executeQuery(query).then(function (data) {
//                $scope.results = data.results;
//                $scope.$apply();
//            }).fail(function (e) {
//                alert(e);
//            });
//        };
//    };
});

//app.controller("ctrl3", function ($scope) {
//    $scope.filtros = [
//        { campo: "CategoryName", operador: "startsWith", valor: "C" },
//        { campo: "CategoryID", operador: "==", valor: 4 }
//    ];

//    $scope.opcionesDeFiltrado = [
//        { texto: "Categorias que comienzan con C", indice: "0" },
//        { texto: "Categoría cuyo ID es 4", indice: "1" }
//    ];

//    $scope.opcion = {};

//    $scope.filtra = function (c, o, v) {
//        var query = new breeze.EntityQuery()
//            .from("/")
//            .where(c, o, v);

//        manager.executeQuery(query).then(function (data) {
//            $scope.results = data.results;
//            $scope.$apply();
//        }).fail(function (e) {
//            alert(e);
//        });
//    };

//});
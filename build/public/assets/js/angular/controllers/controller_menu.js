'use strict';

app.controller('ControllerMenu', ['$scope', '$http', function ($scope, $http, $sce) {

  $scope.getListado = function () {
    $http.get('/home/getList').success(function (data, status, headers, config) {
      $scope.listado = data;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getDptos = function () {
    $http.get('/api/allDptos').success(function (data, status, headers, config) {
      $scope.listDptos = data;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getMpios = function (idDpto) {
    $http.get('/api/Ciudades/' + idDpto).success(function (data, status, headers, config) {
      $scope.listMpios = data;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getRoles = function () {
    $http.get('/api/allRoles').success(function (data, status, headers, config) {
      $scope.listRoles = data;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getComerciantes = function () {
    $http.get('/api/allComerciantes').success(function (data, status, headers, config) {
      $scope.listComerciantes = data;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getPlanes = function () {
    $http.get('/api/allPlanes').success(function (data, status, headers, config) {
      $scope.listPlanes = data;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getCategorias = function () {
    $http.get('/api/allCategorias').success(function (data, status, headers, config) {
      $scope.listCategorias = data;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getSubcategorias = function (id) {
    $http.get('/api/Subcategorias/' + id).success(function (data, status, headers, config) {
      console.log("hola yilmar: " + id);
      $scope.listSubcategorias = data.datos;
      $scope.NameCat = data.datos[0];
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };

  $scope.getComerciantesByCategory = function (idCat) {
    $http.get('/api/Comerciantes/' + idCat).success(function (data, status, headers, config) {
      console.log("hola il");
      $scope.DatosComerciales = data.datos;
      $scope.ResultData = "";
      if (data.datos.length == 0) {
        $scope.ResultData = "No se encontraron resultados";
      }
      //var s = "<h1><i class='"+data[0].Class+"'></i>"+data[0].NombreCategoria+"</h1>" ;
    }).error(function (data, status, headers, config) {
      console.log("Error> " + data);
    });
  };
}]);
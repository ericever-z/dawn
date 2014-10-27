define(['./module'], function (module) {
    module.factory("httpServ",['$http','$q',function($http,$q){
            function Operation(){
                var me = this;
                this.execute = function(url){
                    var deferred = $q.defer();
                    $http.get(url).success(deferred.resolve).error(deferred.reject); 
                    return deferred.promise;  
                }
               this.getTotal = function(url){
                    return me.execute(url);             
                };
                this.getModelList = function(url){
                    return me.execute(url);
                };
                this.deleteItem = function(url){
                    return me.execute(url);              
                };
                this.download = function(url,csv){
                    var deferred = $.ajax({
                        method:"GET",
                        contentType:"text/html,application/xhtml+xml,application/xml,text/csv;",
                        contentDisposition:"attachment;filename="+csv,
                        url:url
                    }); 
                    return deferred;//.promise;  
                };
            }
            return new Operation();
    }]);
});
require.config({
    urlArgs:"rnd="+(new Date()).getTime(),
    paths:{
        "jquery":"../../lib/jquery/jquery.min",
        "angular":"../../lib/angular/angular.min",
        "angular-route":"../../lib/angular-route/angular-route",
        "angular-ui":"../../lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "easing":"../../lib/jquery.easing/js/jquery.easing.min",
        "bootstrap":"../../lib/bootstrap/js/bootstrap.min"
    },
    shim:{
        "angular":{
            exports:"angular"  // 因为angular不是amd标准 所以这里要导出
        },
        "angular-route":{
            deps:["angular"]
        },
        "angular-ui":{
            deps:['angular']
        }
    }
});

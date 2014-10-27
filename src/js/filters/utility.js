define(['./module'],function(module){
    module.filter('numberFormat', function(){
            return function(num) {
                if(!num&&num!=0) {
                    return '-';
                }
                var temp  = num + '';

                var arr = temp.split('.'), reg = /(-?\d+)(\d{3})/;

                while (reg.test(arr[0])) {
                  arr[0] = arr[0].replace(reg, '$1,$2');
                }

                temp = arr[1] ? arr[0] + '.' + arr[1] : arr[0];

                return temp.toString();;
            }
        });
});
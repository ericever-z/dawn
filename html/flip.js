function FlipDigit(){
  var self = this,
      delay = 350,
      digitEls = $('.flipNumber li'),
      currentNum = 0,
      maxDigit = 9,
      getPrevNum = function(){ 
        return (currentNum !== 0) 
            ? currentNum -1
            : maxDigit; 
      },
      getNextNum = function(){
        return ( currentNum + 1 ) % (maxDigit +1);
      },
      remClasses = function(){
        $(digitEls[getPrevNum()]).removeClass('prev');
        $(digitEls[currentNum]).removeClass('curr');
        $(digitEls[getNextNum()]).removeClass('next');
      },
      addClasses = function(){
        $(digitEls[getPrevNum()]).addClass('prev');
        $(digitEls[currentNum]).addClass('curr');
        $(digitEls[getNextNum()]).addClass('next');
      };
  
  self.setNum = function(digit){
    self.flip(digit);
  };
  
  self.flip = function(targetNum){
    if(currentNum !== targetNum){
      console.log('currentNum', currentNum, 'targetNum', targetNum, 'getPrevNum', getPrevNum(), 'getNextNum', getNextNum());      
      console.log('before', digitEls);       

      remClasses();
      currentNum = getNextNum();
      addClasses();

      console.log('after', digitEls);       
      
      setTimeout( 
        function(){
          self.flip(targetNum);
        },
        delay
      );
    }
  };
  
  addClasses();
  
  return {
    setNum: self.setNum
  };
}

function increase(){  
  $('#size').val(parseInt($('#size').val())*2).trigger('change');
}
function decrease(){  
  $('#size').val(parseInt($('#size').val())/2).trigger('change');
}

$(function(){
  var f = new FlipDigit(),
      digit;
  
  f.setNum(10);
  
//  setInterval(function(){ 
    //var digit = Math.floor(Math.random()*7, 0)+3;
    //f.setNum(digit); }, 3000);
//});
  
  $('#size').on('change', 
    function(evt){
      $('.flipNumber').css(
        'font-size',                          $('#size').val() + '%'
      );
    }
  );
});


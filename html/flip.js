function FlipDigit(){
  var self = this,
      delay = 1550,
      digitEls = $('.flipNumber'),
      digitEls = $(digitEls[1]).children("li");
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
  
  self.flip = function(targetNum){
    if(currentNum !== targetNum){
      remClasses();
      currentNum = getNextNum();
      addClasses();   
    }
  };
  addClasses();
}
$(function(){
  var f = new FlipDigit();
  f.flip(8); 
      setTimeout( 
        function(){
          f.flip(9);
        },
        1000
      );    
});


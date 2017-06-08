$(document).ready(function(){
  
  var counting = 0;
  var height = 0;
  var seconds = 0;
  var myTime,increments;
  var bminutes = 5;
  var minutes = 25;
  var pminutes = 25;
  var takeBreak = false;


  

  
  /*==========================
    =================== click events
      ======================================*/
  
  $('.empty-circle').click(function(){
    
    if(counting == 0){
      initClock();
    }
    else{
      clearInterval(myTime);
      counting = 0;
    }
  });
  
  $('#clear').click(function(){
    resetClock();
    
  });
  
  $('.toBreak').click(function(){
    if(takeBreak == false){
      resetClock();
      initBreak();
    }
    
  });
  
  $('.toPomo').click(function(){
    if(takeBreak == true){
      resetClock();
      initPomodoro();
    }
    
  });
  
  
  
  /* ===================== FUNCTIONS ==============================================*/
  
  function initClock(){
    if(takeBreak == true){minutes = bminutes;}
    else{minutes = pminutes;}
    
    myTime  = setInterval(countTime, 1000);
    counting = 1;
    increments = 280 / (minutes * 60 - 1);
  }
  
  
  function resetClock(){
    height = 0;
    seconds = 0;
    counting = 0;
    clearInterval(myTime);
    $('.fill-circle').css({"height":"0px"});
    $('.time').html("");
    
  };
  
  
  
  function initBreak(){
    $('.fill-circle').css({"background-color" : "#0099ff"}); 
    takeBreak = true;
    $('.status').html("BREAK");
    
  }
  
  function initPomodoro(){
    $('.fill-circle').css({"background-color" : "#00e673"});
    takeBreak = false;
    $('.status').html("POMODORO");
  }
  

  /* ================== CLOCK DISPLAY ==========*/
  
  function countTime(){
    seconds +=1;
    height += increments;
    var message = ["Time Left: " + convertTime(),  height + "px"];
    $('.time').html(message[0]);
    $('.fill-circle').css({"height": message[1]});
    
    if(timeRemain() <= 0){
      playSound();
      resetClock();
      if(takeBreak == false){initBreak();}
      else{initPomodoro();}
      initClock();
    }
    
  };
  
  function timeRemain(){
    var t = minutes * 60 - seconds;
    //$('#testarea').text(t);
    return t;
  }
  
  function convertTime(){
    var timeLeft = timeRemain();
    var extraSeconds = timeLeft % 60;
    
    if(extraSeconds < 10){extraSeconds = "0" + extraSeconds;}
    var theMinutes = Math.floor(timeLeft / 60);
    
    var timeStatement = theMinutes + ":" + extraSeconds;
    
    return timeStatement;
  }
  
  function playSound(){
    $('.sound').html('<audio autoplay><source src="https://sfxcontent.s3.amazonaws.com/soundfx/AirplaneChime-DingDong.mp3" type="audio/mpeg">  </audio>');
  }
  
  /*=======================================ADD AND SUBTRACT MINUTES==========================================*/
  
  $('.add').click(function(){
    pminutes += 1;
    $('.minutes').html("POMO TIME IS : " + pminutes);
    if(takeBreak == false){resetClock();}
  });
  
  $('.subtract').click(function(){
    if(pminutes > 1){
      pminutes -= 1;
    }
    if(takeBreak == false){resetClock();}
    $('.minutes').html("POMO TIME IS : " + pminutes);
  });
  
  $('.badd').click(function(){
    bminutes += 1;
    $('.bminutes').html("BREAK TIME IS: " + bminutes);
    if(takeBreak == true){resetClock();}
  });
  
  $('.bsubtract').click(function(){
    if(bminutes > 1){
      bminutes -= 1;
    }
    if(takeBreak == true){resetClock();}
    $('.bminutes').html("BREAK TIME IS: " + bminutes);
  });
  
  
});
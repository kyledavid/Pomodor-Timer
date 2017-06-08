$(document).ready(function(){
  
  var counting = false;
  var filledHeight = 0;
  var elapsedSeconds = 0;
  var myTime,increments;
  var breakMinutes = 5;
  var timerMinutes = 25;
  var pomoMinutes = 25;
  var breakMode = false;

  
  /*==========================
    =================== click events
      ======================================*/
  
  $('.empty-circle').click(function(){
    
    if(counting === false){
      initClock();
      updateClock();
    }
    else{
      clearInterval(myTime);
      counting = false;
    }
  });
  
  $('#clear').click(function(){
    resetClock();
  });
  
  $('.start-break').click(function(){
    if(breakMode === false){
      resetClock();
      initBreak();
    }
    
  });
  
  $('.start-pomo').click(function(){
    if(breakMode === true){
      resetClock();
      initPomodoro();
    }
    
  });
  
  
  
  /* ===================== FUNCTIONS ==============================================*/
  
  function initClock(){
    if(breakMode == true){
      timerMinutes = breakMinutes;
    } else {
      timerMinutes = pomoMinutes;
    }
    
    myTime  = setInterval(countTime, 1000);
    counting = true;
    increments = 280 / (timerMinutes * 60 - 1);
  }
  
  
  function resetClock(){
    filledHeight = 0;
    elapsedSeconds = 0;
    counting = false;
    clearInterval(myTime);
    $('.fill-circle').css({"height":"0px"});
    $('.time').html("Click to Start Timer");
    
  };
  
  
  function initBreak(){
    $('.fill-circle').css({"background-color" : "#0099ff"}); 
    breakMode = true;
    $('.status').html("BREAK");
    
  }
  
  function initPomodoro(){
    $('.fill-circle').css({"background-color" : "#00e673"});
    breakMode = false;
    $('.status').html("POMODORO");
  }
  

  /* ================== CLOCK DISPLAY ==========*/

  function updateClock() {
    var timerHTML = [];

    timerHTML = ["Time Left: " + convertTime(),  filledHeight + "px"];
    $('.time').html(timerHTML[0]);
    $('.fill-circle').css({"height": timerHTML[1]});
  }
  
  function countTime(){

    elapsedSeconds +=1;
    filledHeight += increments;
    
    updateClock();
    
    if(timeRemain() <= 0){
      playSound();
      resetClock();

      if(breakMode == false){
        initBreak();
      } else {
        initPomodoro();
      }

      initClock();
    }
    
  };
  
  function timeRemain(){
    var t = timerMinutes * 60 - elapsedSeconds;
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
    pomoMinutes += 1;
    $('.pomo-minutes').html("POMO TIMER LENGTH : " + pomoMinutes);
    if(breakMode == false){resetClock();}
  });
  
  $('.subtract').click(function(){
    if(pomoMinutes > 1){
      pomoMinutes -= 1;
    }
    if(breakMode == false){resetClock();}
    $('.pomo-minutes').html("POMO TIMER LENGTH : " + pomoMinutes);
  });
  
  $('.break-add').click(function(){
    breakMinutes += 1;
    $('.break-minutes').html("BREAK TIMER LENGTH: " + breakMinutes);
    if(breakMode == true){resetClock();}
  });
  
  $('.break-subtract').click(function(){
    if(breakMinutes > 1){
      breakMinutes -= 1;
    }
    if(breakMode == true){resetClock();}
    $('.break-minutes').html("BREAK TIMER LENGTH: " + breakMinutes);
  });
  
  
});
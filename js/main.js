  let tubes = document.getElementsByClassName('tube');
  for(tube of tubes) {
    tube.addEventListener('click', function(){ this.classList.add('active-tube')})
  }
 $(function(){
   $('.tube').click(function(){
     $(".hovered-tube").first().removeClass("hovered-tube")
     $(".active-tube").first().removeClass("active-tube");
     $(this).children(".upside").first().addClass('active-tube');

    $(".upside").bind("animationend", function(){
      $(this).removeClass("active-tube");
    });

    $(".tube").mouseenter(function(){
      $(this).children(".upside").first().addClass("hovered-tube");
      $("#burger").animate({"left": $(this).offset().left + "px" }, 1000);
      });
    })


    $(".tube").mouseleave(function(){
      $(this).children(".upside").first().removeClass("hovered-tube");
    })
 })

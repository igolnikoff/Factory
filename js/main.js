$(function(){
  let angle = 0;

  let fitting_offset = $(".tube").last().offset().left - $("#burger").offset().left;
  $("#line-up").css ("left", (- fitting_offset - 50) + "px")

  $('.tube').click(function(){
    $(".hovered-tube").first().removeClass("hovered-tube");
    $(".active-tube").first().removeClass("active-tube");
    $(this).children(".upside").first().addClass('active-tube');
    let tube = $(this).children(".upside").first();
    $(tube).animate({"height": "160px"}, 40);

      // function()
      // {
      //   $(this).animate({"height": "300px"}, 300);
      // });
      setTimeout(function(){$(tube).animate({"height": "300px"}, 100, function(){
        let component = $(this).parent().children(".component").first();
        setTimeout(function(){
          let burgerTop =  $("#burger").offset().top - component.offset().top - parseInt(component.css("top")) - parseInt (component.css("height"));
          component.animate({"top": "+=" + burgerTop + "px"}, 500)}, 200);

          setTimeout(function(){$(tube).animate({"height": "200px"}, 80)}, 300);
      })}, 700);

  });

  $(".upside").bind("animationend", function(){
    $(this).removeClass("active-tube");

  });

  $(".tube").mouseenter(function(){
    $(this).children(".upside").first().addClass("hovered-tube");
    let offset = $("#burger").offset().left - $(this).offset().left;
    $("#burger").animate({"left": $(this).offset().left + "px" }, 1000);
    if (offset<0)
      angle += 90;
    else
      angle -= 90;
    $(".inner-wheel").css({"transform": "rotateZ("+angle+"deg)"});
    $("#line-up").animate({"left": "-=" + offset + "px" }, 1000);
    $("#line-down").animate({"left": "+=" + offset + "px" }, 1000);

  });

  $(".tube").mouseleave(function(){
    $(this).children(".upside").first().removeClass("hovered-tube");
  });
 })

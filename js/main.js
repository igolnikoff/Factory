$(function(){
  let angle = 0;

  let fitting_offset = $(".tube").last().offset().left - $("#burger").offset().left;
  $("#line-up").css ("left", (- fitting_offset - 50) + "px")

  $('.tube').click(function(){
    $(".hovered-tube").first().removeClass("hovered-tube");
    $(".active-tube").first().removeClass("active-tube");
    $(this).children(".upside").first().addClass('active-tube');

  });

  $(".upside").bind("animationend", function(){
    $(this).removeClass("active-tube");
  });

  $(".tube").mouseenter(function(){
    $(this).children(".upside").first().addClass("hovered-tube");
    let offset = $("#burger").offset().left - $(this).offset().left;
    $("#burger").animate({"left": "-=" + offset + "px" }, 1000);
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

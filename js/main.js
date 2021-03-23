$(function(){
  let angle = 0;
  let level = 1;
  let component_offsets = new Map([
    ["meat", 5],
    ["salad", 25],
    ["cheese", 25],
    ["tomato", 8],
    ["bread-up", 5]
  ]);

  let current_components = new Array();

  let fitting_offset = $(".tube").last().offset().left - $("#burger").offset().left;
  $("#line-up").css ("left", (- fitting_offset - 50) + "px")

  $('.tube').click(function(){
    $(".hovered-tube").first().removeClass("hovered-tube");
    $(".active-tube").first().removeClass("active-tube");
    $(this).children(".upside").first().addClass('active-tube');
    let tube = $(this).children(".upside").first();
    $(tube).animate({"height": "160px"}, 40);

      setTimeout(function(){$(tube).animate({"height": "300px"}, 100, function(){
        let component = $(this).parent().children(".component").first();
        setTimeout(function(){
        let top_offset = $("#burger img").first().offset().top - component.offset().top + parseInt(component.css("top")) + component_offsets.get(component.attr("id"));
          let burgerTop =  $("#burger").offset().top - component.offset().top - parseInt(component.css("top")) - parseInt (component.css("height"));
          console.log(top_offset, burgerTop)
          component.animate({"top": "+=" + top_offset + "px", "width": $("#burger img").width() + "px"}, 500)}, 200);
          console.log();
          component.css("z-index", level)
          setTimeout(function()
          {
            //let top_offset = $("#burger img").first().offset().top - component.offset().top - parseInt(component.css("top")) - parseInt (component.css("height")) - component_offsets.get(component.attr("id"));
            //
            let add_offset = component_offsets.get(component.attr("id"));
            for (prev_component of current_components)
            {
              add_offset += component_offsets.get(prev_component);
            }
            $("#burger").children("img").first().before($("<img>", {"src": $(component).attr("src"), "class": "flat"}).css({"top": add_offset + "px", "z-index": level}))
            current_components.push($(component).attr("id"))
            level += 1;
            component.css({"top": "-70px", "z-index": 1, "width": $(tube).width() + "px"});
          }, 800);
          setTimeout(function(){$(tube).animate({"height": "200px"}, 80)}, 300);
      })}, 700);

  });

  $(".upside").bind("animationend", function(){
    $(this).removeClass("active-tube");

  });

  $(".tube").mouseenter(function(){
    $(this).children(".upside").first().addClass("hovered-tube");
    let width_diff = Math.abs($("#burger img").width() - $(this).width());
    let offset = $("#burger").offset().left - $(this).offset().left + width_diff / 2;
    $("#burger").animate({"left": ($(this).offset().left + width_diff / 2) + "px" }, 1000);
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

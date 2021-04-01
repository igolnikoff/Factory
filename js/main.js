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
  let is_game_finished = false;

  let scores = 150;
  let skills = new Map([
    [300, "Ты и в правду за ЗОЖ?"],
    [500, "Для перекуса в самый раз"],
    [700, "Не дурно, Мизим точно понадобится"],
    [1000, "Гастрит тебе обеспечен"],
    [1500, "Толстый, это когда ты делаешь селфи в режиме панорамы"]

  ])
  let calories = new Map([
    ["meat", 100],
    ["salad", 30],
    ["cheese", 80],
    ["tomato", 50],
    ["bread-up", 150]
  ]);
  let fitting_offset = $(".tube").last().offset().left - $("#burger").offset().left;
  $("#line-up").css ("left", (- fitting_offset - 50) + "px")

  $('.tube').click(function(){
    if(is_game_finished) return;

    $(".hovered-tube").first().removeClass("hovered-tube");
    $(".active-tube").first().removeClass("active-tube");
    $(this).children(".upside").first().addClass('active-tube');
    let tube = $(this).children(".upside").first();
    $(tube).animate({"height": "-=100px"}, 200).delay(200).animate({"height": "+=140px"}, 200, function(){
        let component = $(this).parent().children(".component").first();
        if(component.attr("id") == "bread-up")
        {
          is_game_finished = true;
        }

        let top_offset = $("#burger img").first().offset().top - component.offset().top + parseInt(component.css("top")) + component_offsets.get(component.attr("id"));
          component.animate({"top": "+=" + top_offset + "px", "width": $("#burger img").width() + "px"}, 500, function()

          {
            component.css("z-index", level);

            scores += calories.get(component.attr("id"));
            console.log(calories.get(component.attr("id")));
            let add_offset = component_offsets.get(component.attr("id"));
            for (prev_component of current_components)
            {
              add_offset += component_offsets.get(prev_component);
            }
            $("#burger").children("img").first().before($("<img>", {"src": $(component).attr("src"), "class": "flat"}).css({"top": add_offset + "px", "z-index": level}))
            current_components.push($(component).attr("id"))
            level += 1;
            component.css({"top": "-50px", "z-index": 1, "width": "90%"});
          });

      }).delay(200).animate({"height": "200px"}, 80, function(){
        if (!is_game_finished) return;
        $("#points-1").text(scores);
        $("#points-2").text(scores);
        for (let score_amout of skills.keys())

        {
          if (scores < score_amout)
          {
            $("#skill").text("(" + skills.get(score_amout) + ")");
            break;
          }
        }
        let new_position = $("body").width() + 50;
        move_burger(new_position);
        $(".tube-wrapper").animate ({"opacity": 0}, 200, function(){
          $(this).css("display", "none");
          $("#result").css("display", "flex");
          $("#result").animate({"opacity": 1}, 200, function(){
            $("#burger").css("left", - $("#burger").width() + "px");
            let new_position = $("body").width() * 3 / 4 - $("#burger").width() / 2;
            move_burger(new_position);

          });
        });
      });

  });

  $("#play").click(function(){
    $("#start-screen").animate({"opacity": 0}, 200, function(){
      $(this).css("display", "none");
      $(".tube-wrapper").css("display", "block").animate({"opacity": 1}, 200);
      $("#burger").css("display", "inline-block").animate({"opacity": 1}, 200);
    })
  })

  $("#retry").click(function(){
    $("#result").animate({"opacity": 0}, 200, function()
      {
        $(this).css("display", "none");
        $(".tube-wrapper").css("display", "block").animate({"opacity": 1}, 200);
        scores = 150;
        level = 1;
        current_components = [];
        let new_position = $("body").width() + 50;
        move_burger(new_position);
        is_game_finished = false;
        let component_images = $("#burger img");
        component_images = component_images.slice(0, component_images.length - 1);
        for(let image of component_images)
        {
          image.remove();
        }
        $("#burger").css("left", - $("#burger").width() + "px");
        move_burger($("body").width() * 0.02);
      });
  });

  $(".upside").bind("animationend", function(){
    $(this).removeClass("active-tube");

  });

  function move_burger(new_position)
  {

    let offset = $("#burger").offset().left - new_position;
    $("#burger").stop(true, false).animate({"left": "-=" + offset + "px" }, 1000);
    if (offset<0)
      angle += 90;
    else
      angle -= 90;
    $(".inner-wheel").css({"transform": "rotateZ("+angle+"deg)"});
    $("#line-up").stop(true, false).animate({"left": "-=" + offset + "px" }, 1000);
    $("#line-down").stop(true, false).animate({"left": "+=" + offset + "px" }, 1000);

  }


  $(".tube").mouseenter(function(){
    if(is_game_finished) return;
    $(this).children(".upside").first().addClass("hovered-tube");
    let width_diff = Math.abs($("#burger img").width() - $(this).width());
    let new_position = $(this).offset().left + width_diff / 2;
    move_burger(new_position);


  });

  $(".tube").mouseleave(function(){
    if(is_game_finished) return;
    $(this).children(".upside").first().removeClass("hovered-tube");
  });
 })

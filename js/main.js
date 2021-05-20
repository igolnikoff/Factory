$(function(){
  let wheel_width = $('.wheel').width() + parseInt($('.wheel').css('padding-left')) * 2 + parseInt($('.wheel').css('margin-left')) * 2;
  let wheel_count = Math.ceil($("body").width() / wheel_width);
  let is_burger_movement_finished = true;
  for(let i = 0; i < wheel_count - 1; ++i)
  {
    $("#wheel-line").append($(".wheel").first().clone());
  }

  $("#wheel-line").append($("<div>", {"class": "clear"}))


  let lineup_offset = $("body").width();
  $("#line-up").css("left", - lineup_offset + "px");
  $("#burger").css("bottom", $("#conveyor").height());
  let angle = 0;
  let level = 1;
  let add_offset = 0;
  let component_offsets = new Map([
    ["meat", 5],
    ["salad", 25],
    ["cheese", 29],
    ["tomato", 8],
    ["bread-up", 5]
  ]);

  let current_components = new Array();
  let is_game_finished = false;

  let scores = 150;
  let skills = new Map([
    [300, "Ты и в правду за ЗОЖ?"],
    [500, "Для перекуса в самый раз"],
    [700, "Недурно, Мизим точно понадобится"],
    [1000, "Гастрит тебе обеспечен"],
    [1500, "Что ж, желудок тебе пухом..."]

  ])
  let calories = new Map([
    ["meat", 100],
    ["salad", 30],
    ["cheese", 80],
    ["tomato", 50],
    ["bread-up", 150]
  ]);
  let fitting_offset = $(".tube").last().offset().left - $("#burger").offset().left;
  function sleep(ms)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//  $("#line-up").css ("left", (- fitting_offset - 50) + "px")

  $('.tube').click(function(){
    if(is_game_finished) return;

    $(".hovered-tube").first().removeClass("hovered-tube");
    // $(".active-tube").first().removeClass("active-tube");
    // $(this).children(".upside").first().addClass('active-tube');
    let tube_upside = $(this).children(".upside").first();
    $(tube_upside).animate({"height": "-=100px"}, 200).delay(200).animate({"height": "+=140px"}, 200, function(){
        let component = $(this).parent().children(".downside").first().children(".component").first();
        // component = component.clone();
        let component_img = component.children("img").first().clone();
        $("#burger img").first().before(component_img);
        console.log(component.offset().top);
        let start_pos = $("#burger img").first().offset().top - component.offset().top;
        component_img.css("bottom", start_pos);
        // console.log(component);
        if(component.attr("id") == "bread-up")
        {
          is_game_finished = true;
        }

        // let top_offset = $("#burger img").first().offset().top - component.offset().top - $("#burger").height() - component.height() - component_offsets.get(component.children("img").attr("id"));
        // let top_offset = $("#burger img").first().offset().top - component.offset().top - component.height() + component_offsets.get(component.children("img").attr("id"))
        // console.log(top_offset, $("#burger img").first().offset().top, component.offset().top, component.height(), component_offsets.get(component.children("img").attr("id")));
        // component.css("bottom", "initial");
          // component.animate({"top": "+=" + top_offset + "px", "width": $("#burger img").width() + "px"}, 3000, function()
          // while(!is_burger_movement_finished)
          // {
            sleep(1500);
          // }
          setTimeout(function(){component_img.css("z-index", level)}, 200);
          add_offset += component_offsets.get(component_img.attr("id"));
          component_img.animate({"bottom": -add_offset}, 1000, function()
          {



            scores += calories.get(component_img.attr("id"));
            // for (prev_component of current_components)
            // {
            //   add_offset += component_offsets.get(prev_component);
            // }
            // $("#burger").children("img").first().before($("<img>", {"src": $(component_img).attr("src"), "class": "flat"}).css({"top": add_offset + "px", "z-index": level}))
            current_components.push($(component_img).attr("id"))
            level += 1;
            // component.css({"top": "initial", "z-index": 1, "width": "100%", "bottom": "-23%"});
            console.log($("#burger img").first().offset().top);
          });


      }).delay(200).animate({"height": "75%"}, 80, function(){
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
      $("#tubes").css("display", "flex");
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
    is_burger_movement_finished = false;
    $("#burger").stop(true, false).animate({"left": "-=" + offset + "px" }, 1000, function(){
      is_burger_movement_finished = true;
    });
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
    let width_diff = $("#burger").width() - $(this).width();
    let new_position = $(this).offset().left - width_diff / 2;
    move_burger(new_position);


  });

  $(".tube").mouseleave(function(){
    if(is_game_finished) return;
    $(this).children(".upside").first().removeClass("hovered-tube");
  });
 })

$(() => {
  var tail = ["","m","6","m6","69","7","m7","maj7","7#5","m7b5","7b9","9","m9","maj9","add9","13","sus2","sus4","dim","dim7","aug","#","#6","#m6","#69","#7","#m7","#7b5","#7#5","#7b9","#9","#7b9","#9","#maj9","#add9","#13","#sus2","#sus4","#dim7","#aug"];
  $(".chord__list li:first").addClass("active");
  $(".chord__list a").click(function(){
    $(this).parents("li").siblings("li").removeClass("active");
    if(!$(this).parents("li").hasClass("active")){
      $(this).parents("li").addClass("active");
    }
    else{
      $(this).parents("li").removeClass("active");
    }
    listTable();
  });
  function listTable(){
    var res = "<ul>";
    var chord = $(".chord__list ul li.active a").attr("data-chord");
    tail.forEach((data) => {
      var c = chord+data;
      res+="<li class='chord__result__chord'>"+c+"</li>";
    });
    res+="</ul>";
    $(".chord__result").html('');
    $(".chord__result").html(res);
    $(".chord__result__chord").each(function(){
      jtab.render($(this)[0], $(this).text());
    });
  }
  listTable();
});
console.clear()

$(function() {
  $(window).scroll(function() {
      if($(this).scrollTop() > 10) {
          $('#nav-scroll-bg').addClass('bg-main-bg')
      } else {
          $('#nav-scroll-bg').removeClass('bg-main-bg')
      }
  })
})

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(window).on("load", function(){
  $.getJSON('config.json', function(data){
    $.each(data, function(i, f){
      $("#version-text").text(f.version)
    })
  })

  var urlContent = getParameterByName('live-name')
  var settings = {
    "url": "https://api.twitch.tv/helix/streams?user_login=JoshuaEpstein",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Client-ID": "jvjddmr928c6to3jwrouqirr61b9ja",
      "Authorization": "Bearer qp4griep8aidsyjz5p5m8jlnu8l6in",
    },
  };

  if(urlContent){
    settings = {
      "url": "https://api.twitch.tv/helix/streams?user_login=" + urlContent,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Client-ID": "jvjddmr928c6to3jwrouqirr61b9ja",
        "Authorization": "Bearer qp4griep8aidsyjz5p5m8jlnu8l6in",
      },
    };
  }

  $.ajax(settings).done(function (response) {
    if(response.data[0] == null){
      $("#live-nav").hide()
      $("#live-red-circle").hide()
      if(urlContent){
        console.log(urlContent + " is not live")
        document.getElementById("nav-contact").style.marginRight = "5rem"
      } else {
        console.log("JoshuaEpstein is not live")
      }
    } else if(response.data[0].type == "live"){
      try {
        console.log(response.data[0].user_name + " is live")
        document.getElementById("live-nav").href = "https://twitch.tv/" + response.data[0].user_name
        document.getElementById("live-nav-ping").href = "https://twitch.tv/" + response.data[0].user_name
        $("#live-nav").show()
        $('#live-red-circle').show()
        $("#live-nav-ping").show()
      } catch(err){
        console.log(err);
      }
    }
  });
})






function cutLoader(){
  $(".loader-wrapper").addClass("hidden")
}
function fadeLoader(){
  $(".loader-wrapper").fadeOut(500)
  window.setTimeout( cutLoader, 500 );
}

$(window).on("load",function(){
  window.setTimeout( fadeLoader, 1500 );
  // cutLoader()
  console.log(`Hidden page loader.`)
});


function addScrollNumber() {
  window.location.href = window.location.href + "&scroll=" + window.scrollY
}

function addScrollNumberQuestion() {
  window.location.href = window.location.href + "?scroll=" + window.scrollY
}
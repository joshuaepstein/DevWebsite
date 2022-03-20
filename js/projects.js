$(window).on("load", function(){
    if(getParameterByName('project') === "ultrautils" || getParameterByName('project') === "wordle" || getParameterByName('project') === "jebot"){
        $("#default").hide()
        $("#" + getParameterByName('project')).show()
        document.title = getParameterByName('project') + " | Dev JoshuaEpstein"
    } else if(getParameterByName('project')){
        $("#doesnt-exist").text("This project does not exist, view the available projects below");
    }
})
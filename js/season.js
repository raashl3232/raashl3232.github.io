function get_checked_name(elementName){
    let group = document.getElementsByName(elementName);
    for(i=0; i< group.length; i++){
        if(group[i].checked)
          return group[i].value;
    }
    return "ERROR: can't find checked element";
}

function get_background_colors(){
    const background = {};
    switch(get_checked_name('lit_season')) {
        case "Advent":
            background.season = "Advent";
            background.dark = "rgb(7, 42, 108)"; //deep blue
            background.light = "#d0fefe"; //pale blue
            background.darkname = "Deep Blue";
            background.lightname = "Pale Blue";
            background.darktext = "#e1e1dd";
            background.lighttext = "rgb(50, 50, 50)";
            break;
        case "Christmas":
            background.season = "Christmas";
            background.dark = "rgb(50, 0, 0)"; // dark red
            background.light = "#fdfff5"; // milk
            background.darkname = "Dark Red";
            background.lightname = "Milk";
            background.darktext = "rgb(255, 255, 255)";
            background.lighttext = "rgb(50, 50, 50)";
            break;
        case "Epiphany":
            background.season = "Epiphany";
            background.dark = "rgb(19, 179, 4)"; // dark green
            background.light = "rgb(109, 163, 104)"; // light green
            background.darkname = "Dark Green";
            background.lightname = "Light Green";
            background.darktext = "rgb(200, 200, 200)";
            background.lighttext = "rgb(0, 0, 0)";
            break;
        case "Lent":
            background.season = "Lent";
            background.dark = "rgb(100, 0, 100)"; // dark purple
            background.light = "rgb(220, 0, 200)"; // light purple
            background.darkname = "Dark Purple";
            background.lightname = "Light Purple"
            background.darktext = "#FFFFFF";
            background.lighttext = "#FFFFFF";
            break;
        case "Easter":
            background.season = "Easter";
            background.dark = "rgb(243, 229, 171)"; // vanilla
            background.light = "rgb(245, 245, 220)"; // beige
            background.darkname = "Vanilla";
            background.lightname = "Beige";
            background.darktext = "rgb(0, 0, 0)";
            background.lighttext = "rgb(50, 50, 50)";
            break;
        case "Pentecost":
            background.season = "Pentecost";
            background.dark = "rgb(50, 0, 0)"; // dark red
            background.light = "rgb(200, 0, 0)"; // light red
            background.darkname = "Dark Red";
            background.lightname = "Light Red";
            background.darktext = "#FFFFFF";
            background.lighttext = "#FFFFFF";
            break;
        case "Common_Time":
            background.season = "Common Time";
            background.dark = "rgb(19, 179, 4)"; // dark green
            background.light = "rgb(109, 163, 104)"; // light green
            background.darkname = "Dark Green";
            background.lightname = "Light Green";
            background.darktext = "rgb(200, 200, 200)";
            background.lighttext = "rgb(0, 0, 0)";
            break;
        default: 
            background.season = "Default";
            background.dark = "rgb(255, 255, 255)"; // white
            background.light = "rgb(255, 255, 255)"; // white
            background.darkname = "White";
            background.lightname = "White";
            background.darktext = "#000000";
            background.lighttext = "#000000";
    }
    return background;
}

function applystyle(season, type){
    var darkElements = document.getElementsByClassName(type);
    for ( e=0; e < darkElements.length; e++ ) {
        element = darkElements[e];
        if( type == "light"){
            darkElements[e].style.backgroundColor = background.light;
            darkElements[e].style.color = background.lighttext;
        }
        else if( type == "dark"){
            darkElements[e].style.backgroundColor = background.dark;
            darkElements[e].style.color = background.darktext;
        }
    }
}

function applyLightDark(season){
    document.getElementById("color_settings").innerHTML = background.season + 
        " color theme is: " + background.darkname + " and " + background.lightname;
        var root = document.querySelector(":root");
        root.style.setProperty('--dark', season.dark);
        root.style.setProperty('--light', season.light);
        root.style.setProperty('--darktext', season.darktext); 
        root.style.setProperty('--lighttext', season.lighttext);
}

function apply_current_litseason(){
    console.log("Enter apply_current_litseason");
    background = get_background_colors();
    applyLightDark(background);
    console.log("Exit apply_current_litseason");
}

function set_radio_box(rbname, stname){
    let elements = document.getElementsByName(rbname);
    if( ( elements.length > 0) && (localStorage.getItem(rbname) != null) ){
        for(r in elements){
            radio = elements[r];
            if(radio.value == localStorage.getItem(rbname) ){
                console.log("Setting " + radio.value + " to checked");
                radio.checked = true;
            }
        }
    }
}

function load_custom_content(){
    set_radio_box('lit_season', 'lit_season');
    set_radio_box('wor_season', 'wor_season');
    console.log("Setting: dark = " + localStorage.getItem("dark"));
    console.log("Setting: light = " + localStorage.getItem("light"));
    console.log("Setting: darktext = " + localStorage.getItem("darktext"));
    console.log("Setting: lighttext = " + localStorage.getItem("lighttext"));
    var root = document.querySelector(":root");

    if(localStorage.getItem("dark") != null){
        root.style.setProperty("--dark", localStorage.getItem("dark"));
    }

    if(localStorage.getItem("dark") != null){
        root.style.setProperty("--light", localStorage.getItem("light"));
    }

    if(localStorage.getItem("dark") != null){
        root.style.setProperty("--darktext", localStorage.getItem("darktext"));
    }

    if(localStorage.getItem("dark") != null){
        root.style.setProperty("--lighttext", localStorage.getItem("lighttext"));
    }
    //
    // Set custom worship schedule
    //
    if( (localStorage.getItem("wor_season")!= null) 
        && (document.getElementById("schedule_header")) != null ){
        if(localStorage.getItem("wor_season") == "Summer"){
            document.getElementById("schedule_header").innerHTML = 
                "Summer Worship Schedule";
            document.getElementById("wor_sunday").innerHTML =
                "10:00 AM Combined worhip in our sanctuary";
            document.getElementById("school_sunday").innerHTML =
                "10:00 AM Sunday School inside";
            document.getElementById("youth_sunday").innerHTML = 
                "11:00 AM Youth Group";
        }

        if(localStorage.getItem("wor_season") == "Fall_Winter_Spring"){
            document.getElementById("schedule_header").innerHTML = 
            "Fall_Winter_Spring Worship Schedule";
            document.getElementById("wor_sunday").innerHTML =
                "11:00 AM Combined worhip in our sanctuary";
            document.getElementById("school_sunday").innerHTML =
                "11:00 AM Sunday School inside";
            document.getElementById("youth_sunday").innerHTML = 
                "12:00 AM Youth Group";
        }
    }
}

function save_current_litseason(){
    console.log("Enter save_current_litseason");
    localStorage.setItem('lit_season', get_checked_name('lit_season'));
    console.log("season is: " + localStorage.getItem('lit_season'));
    background = get_background_colors();
    localStorage.setItem('dark', background.dark);
    localStorage.setItem('light', background.light);
    localStorage.setItem('darktext', background.darktext);
    localStorage.setItem('lighttext', background.lighttext);
    console.log("Exit save_current_litseason");
}

function apply_current_season(){
    console.log("Enter apply_current_season");
    document.getElementById("color_settings").innerHTML = 
        get_checked_name('wor_season') + " was selected"; 
}

function save_current_season(){
    console.log("Enter save_current_season");
    localStorage.setItem('wor_season', get_checked_name('wor_season'));
    console.log("Worship season is " + localStorage.getItem('wor_season'));
    console.log("Exit save_current_season");
}
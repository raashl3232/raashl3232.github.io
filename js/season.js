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
            background.light = "rgb(200, 0, 200)"; //purple
            background.darkname = "Deep Blue";
            background.lightname = "Purple";
            background.text = "rgb(200, 200, 100)";
            break;
        case "After_Eph":
            background.season = "After Ephiphany";
            background.dark = "rgb(19, 179, 4)"; // dark green
            background.light = "rgb(109, 163, 104)"; // light green
            background.darkname = "Dark Green";
            background.lightname = "Light Green";
            background.text = "rgb(200, 200, 200)";
            break;
        case "Lent":
            background.season = "Lent";
            background.dark = "rgb(102, 66, 40)"; // brown
            background.light = "rgb(245, 245, 220)"; // beige
            background.darkname = "Brown";
            background.lightname = "Beige";
            background.text = "#FFFFFF";
            break;
        case "Holy_Week":
            background.season = "Holy Week";
            background.dark = "rgb(10, 10, 10)"; // almost black
            background.light = "rgb(150, 0, 0)"; // red
            background.darkname = "Black";
            background.lightname = "Red";
            background.text = "rgb(200, 200, 200)";
            break;
        case "Pentecost":
            background.season = "Pentecost";
            background.dark = "rgb(255, 215, 0)"; // gold
            background.light = "rgb(243, 229, 171)"; // vanilla
            background.darkname = "Gold";
            background.lightname = "Vanilla";
            background.text = "#000000";
            break;
        case "After_Pent":
            background.season = "After Pentecost";
            background.dark = "rgb(19, 179, 4)"; // dark green
            background.light = "rgb(109, 163, 104)"; // light green
            background.darkname = "Dark Green";
            background.lightname = "Light Green";
            background.text = "rgb(200, 200, 200)";
            break;
        default: 
            background.season = "Default";
            background.dark = "rgb(255, 255, 255)"; // white
            background.light = "rgb(255, 255, 255)"; // white
            background.darkname = "White";
            background.lightname = "White";
            background.text = "#000000";
    }
    return background;
}

function applystyle(season, type){
    var darkElements = document.getElementsByClassName(type);
    for ( e=0; e < darkElements.length; e++ ) {
        element = darkElements[e];
        if( type == "light")
            darkElements[e].style.backgroundColor = background.light;
        else if( type == "dark"){
            darkElements[e].style.backgroundColor = background.dark;
            darkElements[e].style.color = background.text;
        }
    }
}

function applyLightDark(season){
    document.getElementById("color_settings").innerHTML = background.season + 
        " colors are: " + background.darkname + " and " + background.lightname;
        var root = document.querySelector(":root");
        root.style.setProperty('--dark', season.dark);
        root.style.setProperty('--light', season.light);
        root.style.setProperty('--text', season.text); 
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
    console.log("Setting: text = " + localStorage.getItem("text"));
    var root = document.querySelector(":root");

    if(localStorage.getItem("dark") != null){
        root.style.setProperty("--dark", localStorage.getItem("dark"));
    }

    if(localStorage.getItem("dark") != null){
        root.style.setProperty("--light", localStorage.getItem("light"));
    }

    if(localStorage.getItem("dark") != null){
        root.style.setProperty("--text", localStorage.getItem("text"));
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
    localStorage.setItem('text', background.text);
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
import { writeFile } from "fs";
function exportBackground(json){
    writeFile("background.txt", json, "utf8", (error, data) => {
        console.log("write complete");
        console.log(error);
        console.log(data);
    });
}
//written by Kelanel 
//For usage with VAM(Vivid adeventure maps) animated tokens. Currently needs furnace Module to support wait timers
//Expecting a specific filename layout to use for character matching, animation searches, and frame counts for timecodes
//Example: VAM_MonkMMA_Attack2LegSweep_0122.webm
// "MonkMMA" is considered the character name and only files with this after the first underscore will be used by macro matching the currently assigned filename
// "Attack2LegSweep" is used by the search string below to filter what actions you like to select from. Be more specific to filter between specific files
// "0122" is the numbered frame count at the end of the filename and must be after the last underscore. This is expect to be running at 30fps and will be multiplied as such.
// All requirements must be filled above to work properly. The current image file will be updated with the animation for x time, then reverted to the original image.
//This works best with MidiQOL's Macro on action to tie to specific actions of actors. Make one macro per search parameter, otherwise this macro can be used on multiple chars



//adjust this to match the filtered animations tied to character image of selected tokens
let search = "Attack"

//all other comments afterward are just descriptive for others to understand.
//
//simple function for delay timer.
let wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));


//loop through all selected tokens.
for(let nextToken of canvas.tokens.controlled) {
    try { //exception handling
        let originalimg = nextToken.data.img; //backup current image for later.
        let imgpath = originalimg.split("/");   //splitting to breakdown to just filename
        let imgname = imgpath[imgpath.length -1].split("_"); //final breakdown to use name for parsing parts.
        let charname = imgname[1]; //parsing Charactername
        console.log("Charactername found: " + charname);
    	let AnimArray = []; //predeclare array to load up.
        let response = await FilePicker.browse("data", originalimg); //query directory of current imagefile
        for(let imagefile of response.files) {  //parse files
    		let fpath = imagefile.split("/");
    		let fname = fpath[fpath.length - 1]; //scrape file name
    		let search1 = fname.search(search);
    		let search2 = fname.search(charname);
    		if (search1 >= 0 && search2 >= 0) { //charname and search name must match to continue

    			console.log("Image found: " + fname);
    			let sstring = fname.split("_"); //pull framecount
    			let framecount = sstring[sstring.length - 1].split("-")[1]
    			let parsedtimeout = parseFloat( framecount.split(".")[0]) //parse framecount into number
    			if (isNaN(parsedtimeout)) {
    			    
    			    console.log("could not parse animation time due to missing time code!"); //failed to parse
    	   
    			}
    			else { 
    			    console.log("Expected animation time: " + parsedtimeout * 33.33 + "ms");
    			    let ParsedAnim = {  //build successfully found animation and add to list of valid animations
                    
                        path: imagefile,
                        timeout: (parsedtimeout * 33.33)
                    };
                    AnimArray.push(ParsedAnim);
    			}
    	
    		}
    		
    	}
    	if (AnimArray.length > 1) { //multiple animations, pick one randomly
    	    console.log("Multiple matches found, selecting a random animation");
    	    let imageChoice = Math.floor(Math.random() * AnimArray.length);
            let image = AnimArray[imageChoice];
            //console.log(image);
            console.log("Assigning randomized Animation Path: " + image.path );
            nextToken.update({ "img": image.path })
            nextToken.refresh();
            console.log("Animation Assigned.. Waiting " + image.timeout + " ms");
    	    await wait(image.timeout);
    	    console.log("Animation complete, Assigning original Animation Path: " + originalimg );
    	    nextToken.update({ "img": originalimg });
            nextToken.refresh();
    	    
    	} else if (AnimArray.length == 1) { // single animation found, no randomization
    	
    	    
    	    let imageChoice = 0;
            let image = AnimArray[imageChoice];
            //console.log(image);
            console.log("Single match found. Assigning Animation Path:" + image.path );
            
            nextToken.update({ "img": AnimArray[imageChoice].path })
            nextToken.refresh();
            console.log("Animation Assigned.. Waiting " + image.timeout + " ms");
    	    await wait(image.timeout);
    	    console.log("Animation complete, Assigning original Animation Path: " + originalimg );
    	    nextToken.update({ "img": originalimg });
            nextToken.refresh();
    	} else { //no animations found
    	    ui.notifications.warn("No matching images found with timecodes for " + nextToken.name +"!");
    	}
    } catch (err) { //ui catch
            ui.notifications.error(`Error processing ${nextToken.name}, ERROR: ${err}`);
            console.log(`Error processing ${nextToken.name}, ERROR: ${err}`);
    }
	//end of loop. next token
}

//written by Kelanel 
//For usage with VAM(Vivid adeventure maps) animated tokens.
// This macro is meant to undo any token image changes incurred by the death animation macro, but restoring the original image and setting token hp to 1 (undoing trigger)
// Warning: This macro may not work if you've refreshed your session after the death animation is complete as the [originalimg] variable tends to flush from the token on refresh.

//loop through all selected tokens.
for(let nextToken of canvas.tokens.controlled) {
    try { //exception handling
        let originalimg = nextToken.data.originalimg //backup current image for later.
    	if (originalimg != null && originalimg != "") { //multiple animations, pick one randomly
    	     console.log("Found backup image to revert to. Setting HP to 1 and Updating Image to: " + originalimg)
    	    //nextToken.data.actorData.data.attributes.hp.value = 1 ;
    	    nextToken.actor.update({"data.attributes.hp.value" : 1}) //backup original image incase of undo.
    	    nextToken.update({ "img": originalimg }) //backup original image incase of undo.
       
            nextToken.refresh();
    	} else { //no animations found
    	    ui.notifications.warn("No original image found for idle " + nextToken.name +"!");
    	}
    } catch (err) { //ui catch
            ui.notifications.error(`Error processing ${nextToken.name}, ERROR: ${err}`);
            console.log(`Error processing ${nextToken.name}, ERROR: ${err}`);
    }
	//end of loop. next token
}

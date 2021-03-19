// This is a fork of https://github.com/foundry-vtt-community/macros/blob/master/token/randomize_wildcard_tokens.js 
// without limitations on assigned wildcard characters since video files are not supported.
//
// This macro is intended to only be used if you silo your monsters by folder, and they all have the same scale, otherwise you will get unintended images!

// Usage: Select tokens you want randomized and execute until you like the randomization! Works for videos too!

for(let nextToken of canvas.tokens.controlled) {
    let img = nextToken.data.img;
    let response = await FilePicker.browse("data", img);
    let imageChoice = Math.floor(Math.random() * response.files.length);
    let image = response.files[imageChoice]
    nextToken.update({ "img": image })
    nextToken.refresh();
    console.log(image);
}

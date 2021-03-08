let wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
let idle = { 
// set path to webm once animation is complete.
    path: "Path/to/IDLEAnimation.webm", 
    timeout: 5000 // this doesnt matter, just similar object structure!
};
 
let Attack1 = { 
//set path to webm
    path: "Path/to/AttackAnimation1.webm",
    timeout: 5500 //set timeout value based on length of animation sometiems - 50 ms to smooth out to idle
};
let Attack2 = { 
//set path to webm
    path: "Path/to/AttackAnimation1.webm",
    timeout: 4066 //set timeout value based on length of animation sometiems - 50 ms to smooth out to idle
};

let AttackArray = [ Attack1, Attack2] ; //add more attacks if you want above in the same format with a path/timeout then add the final object here to make it part of the 
//randomized list
let tok = canvas.tokens.controlled[0];
let AttackChoice = Math.floor(Math.random() * AttackArray.length);
tok.update({ "img": AttackArray[AttackChoice].path })
tok.refresh();
await wait(AttackArray[AttackChoice].timeout);
tok.update({ "img": idle.path })
tok.refresh();
//console.log(swordAttack1.path);

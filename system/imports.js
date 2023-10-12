var systemRoute = "https://raw.githubusercontent.com/3rdactive/webGlium/main/system/";

var InitialImports = [
    systemRoute+"util.js",
    systemRoute+"noise.js",
    systemRoute+"define.js",
    "data/scripts/register.js",
    systemRoute+"main.js"
]


scenes.forEach(i => {
    InitialImports[InitialImports.length]="data/scenes/"+i+".js";
})
var contin = false;
var ix = 0;

var gizmoEnabled = false;
var running = true;
const canvas = document.getElementById("game");
canvas.style.backgroundColor='white';
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled= false;
var lastTick = new Date();
var lastMs = 0;
var fps = 1000 / lastMs;
var totalMs = 0;
var scaleup = 4;

async function loadScripts(scripts){
    
    var loadinInter = setInterval(() => {
        if(contin==false){
            
            if(ix>=scripts.length){
                clearInterval(loadinInter);
                document.getElementById('loading').textContent="Adding last touches...";
                document.getElementById("gameDiv").style.visibility="visible";
            }else{
                //document.getElementById('loading').textContent="Finished loading: '"+imports[ix];
            loadScript(scripts[ix]);
            }
            ix++;
        }
    }, 100);
}


async function loadScript(i){

        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src=i;
        var s2 = document.head.appendChild(s);
        contin=true;
        document.getElementById('loading').textContent="Loading: '"+i+"' ... ";
        s2.onload= function(){contin=false;}
        s2.onerror= function(){contin=false; alert("Could not load asset: '"+this.src+"' The program may not work as intended, Procceed with caution.")}


}
async function initialLoading(){
    var loadinInter = setInterval(() => {
        if(contin==false){
            
            if(ix>=InitialImports.length){
                clearInterval(loadinInter);
                document.getElementById('loading').textContent="Adding last touches...";
                document.getElementById("gameDiv").style.visibility="visible";
                startUp();
            }else{
                //document.getElementById('loading').textContent="Finished loading: '"+imports[ix];
            loadScript(InitialImports[ix]);
            }
            ix++;
        }
    }, 100);
    //console.log(e);
}

initialLoading();

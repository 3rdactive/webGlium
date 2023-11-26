var width = parseInt(canvas.style.width.substring(0,canvas.style.width.length-2)/scaleup);
var height = parseInt(canvas.style.height.substring(0,canvas.style.height.length-2)/scaleup);
var fpsTotal = [];
var speed = 1;

async function startUp(){
    if(SceneManager.SceneList[SceneManager.CurrentScene]!=undefined){
        await SceneManager.SceneList[SceneManager.CurrentScene].awake(ctx);
        }
        else{
            console.error("Scene "+SceneManager.CurrentScene+" Could not be loaded");
            alert("Error x0001, Scene "+SceneManager.CurrentScene+" dosnt exist, game may not function")
        }
    requestAnimationFrame(update);
}

async function update(){
    lastMs = (new Date().getTime()) - lastTick.getTime();
    totalMs+=lastMs*speed;
    ctx.fillStyle = "#111111ff";
    ctx.strokeStyle = "#111111ff";
    ctx.globalAlpha=1;
    ctx.fillRect(0, 0,width,height);

    if(document.hasFocus()){
        for(var i = 0; i < speed; i++){
        if(SceneManager.GlobalScene!=undefined){
        await SceneManager.GlobalScene.update(ctx);
        await SceneManager.GlobalScene.render(ctx);
        }
        if(SceneManager.SceneList[SceneManager.CurrentScene]!=undefined){
        await SceneManager.SceneList[SceneManager.CurrentScene].update(ctx);
        await SceneManager.SceneList[SceneManager.CurrentScene].render(ctx);
        }
        else{
            console.error("Scene "+SceneManager.CurrentScene+" Could not be loaded");
            alert("Error x0001, Scene "+SceneManager.CurrentScene+" dosnt exist, game may not function")
        }
    }
    
    }
    else{
        ctx.globalAlpha=1;
        ctx.fillStyle = "#111111ff";
        ctx.strokeStyle = "#111111ff";
        ctx.fillRect(0, 0,width,height);
        ctx.fillStyle = "#ffffffff";
        ctx.strokeStyle = "#ffffffff";
        ctx.font = "10px Arial";
        ctx.strokeText("GAME UNFOCUSED", 48, 50);
        ctx.strokeText("click to resume", 60, 70);
    }
//
    
    if(gizmoEnabled){
        ctx.globalAlpha=1;
        ctx.fillStyle = "#ffffffff";
        ctx.strokeStyle = "#ffffffff";
        ctx.font = "20px Arial";
        ctx.strokeText("FPS: "+(fpsTotal.reduce((a, b) => a + b, 0) / fpsTotal.length).toString().substring(0,3), 3, 20);
    }
    fps=1000/lastMs;
    fpsTotal.unshift(fps);
    if(fpsTotal.length>120){
        fpsTotal.pop();
    }
    lastTick = new Date();
    setTimeout(() => {
        
    update();
    }, 10);
}



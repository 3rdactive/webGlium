



var width = parseInt(canvas.style.width.substring(0,canvas.style.width.length-2)/scaleup);
var height = parseInt(canvas.style.height.substring(0,canvas.style.height.length-2)/scaleup);

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
    totalMs+=lastMs;
    ctx.fillStyle = "#111111ff";
    ctx.strokeStyle = "#111111ff";
    ctx.fillRect(0, 0,width,height);

    if(document.hasFocus()){
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
    else{
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
        ctx.fillStyle = "#ffffffff";
        ctx.strokeStyle = "#ffffffff";
        ctx.font = "10px Arial";
        ctx.strokeText("FPS: "+fps.toString().substring(0,3), 3, 10);
    }
    fps=1000/lastMs;
    lastTick = new Date();
    requestAnimationFrame(update);
}



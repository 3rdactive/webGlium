

function startUp(){
    SceneManager.SceneList[SceneManager.CurrentScene].awake(ctx);
    requestAnimationFrame(update);
}

async function update(){
    lastMs = (new Date().getTime()) - lastTick.getTime();
    totalMs+=lastMs;
    ctx.fillStyle = "#111111ff";
    ctx.strokeStyle = "#111111ff";
    ctx.fillRect(0, 0,parseInt(canvas.style.width.substring(0,canvas.style.width.length-2)/scaleup) ,parseInt(canvas.style.height.substring(0,canvas.style.height.length-2))/scaleup );
//
    await SceneManager.SceneList[SceneManager.CurrentScene].update(ctx);

    await SceneManager.SceneList[SceneManager.CurrentScene].render(ctx);

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



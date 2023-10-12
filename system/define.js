var pressedKeys = {};
window.onkeyup = function(e) 
{
    pressedKeys[e.keyCode]=0;
}
window.onkeydown = function(e) 
{
    pressedKeys[e.keyCode] = 1;
}

function getMousePosition(canvas, event) {     
    return [Math.min( Math.max(0,event.clientX - canvas.getBoundingClientRect().left),parseInt(canvas.style.width.substring(0,canvas.style.width.length-2)))  
        , Math.min( Math.max(0,event.clientY - canvas.getBoundingClientRect().top),parseInt(canvas.style.height.substring(0,canvas.style.height.length-2)))];
} 

var mouse = {}

document.body.addEventListener("mousemove", function(e) {
    var data = getMousePosition(canvas,e);
    mouse.x=Math.round( data[0]/scaleup);
    mouse.y=Math.round( data[1]/scaleup);
})

class Scene{

    camera;

    name="Unnamed class";
    elements=[];
    constructor(name = "Unnamed class"){
        this.name=name;
    }

    awake(ctx){
        for(var i =0; i < this.elements.length; i++){
            for(var l =0; l < this.elements[i].components.length; l++){
                this.elements[i].components[l].awake(ctx,this,this.elements[i])
            }
        }
    }

    update(ctx){
        for(var i =0; i < this.elements.length; i++){
            for(var l =0; l < this.elements[i].components.length; l++){
                this.elements[i].components[l].update(ctx,this,this.elements[i])
            }
        }
    }

    render(ctx){
        var elementsSorted = this.elements.toSorted(function(a, b){return a.z-b.z});
        //console.log(elementsSorted);

        for(var i =0; i < elementsSorted.length; i++){
            for(var l =0; l < elementsSorted[i].components.length; l++){
                elementsSorted[i].components[l].render(ctx,this,elementsSorted[i])
            }
        }
    }

    getObjectById(id){
        for(var i =0; i< this.elements.length; i++){
            if(this.elements[i].id==id){
                return this.elements[i];
            }
        }
        return null;
    }

    
}


class SceneManager{
    static SceneList= [];
    static CurrentScene = 0;
}

class element{
    x=0;
    y=0;
    z=0;
    rotation=0;
    id="";
    xscale=1;
    yscale=1;
    components = [];    
    constructor(id){
        this.id=id;
    }


}


class component{

    constructor(){
        
    }

    update(ctx,scene,parent){

    }
    awake(ctx,scene,parent){

    }
    render(ctx,scene,parent){

    }
}


class SpriteRenderer extends component{

    img=new Image();

    constructor(img){
        super();
        this.img=img;
    }
    
    update(ctx,scene,parent){
        
        //console.log(this.parent);
        
    }

    awake(ctx,scene,parent){

    }

    render(ctx,scene,parent){
  
        ctx.drawImage(this.img,parent.x+scene.camera.x,parent.y+scene.camera.y,this.img.width*parent.xscale*+scene.camera.xscale,this.img.height*parent.yscale*+scene.camera.yscale);

    }
}

class UIRenderer extends component{

    img=new Image();

    constructor(img){
        super();
        this.img=img;
    }
    
    update(ctx,scene,parent){
        
        //console.log(this.parent);
        
    }

    awake(ctx,scene,parent){

    }

    render(ctx,scene,parent){
 
        ctx.drawImage(this.img,parent.x,parent.y,this.img.width*parent.xscale*+scene.camera.xscale,this.img.height*parent.yscale*+scene.camera.yscale);

    }
}

class button extends component{

}
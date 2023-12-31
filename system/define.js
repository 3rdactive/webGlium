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
                this.elements[i].components[l].sceneAwake(ctx,this,this.elements[i])
            }
        }
    }

    update(ctx){
        for(var i =0; i < this.elements.length; i++){
            try {
                if(this.elements[i]!=undefined&&this.elements[i].components!=undefined){
                    for(var l =0; l < this.elements[i].components.length; l++){
                        ///console.log(this.elements[i].components[l].initialized);
                        if(this.elements[i].components[l].initialized==true)
                        this.elements[i].components[l].update(ctx,this,this.elements[i])
                        else{
                            this.elements[i].components[l].awake(ctx,this,this.elements[i])
                            this.elements[i].components[l].initialized=true;
                            
                        }
        
                    }
                }
            } catch (error) {
                console.warn(`Could not execute object: ${this.elements[i]}, with error code: ${error}`)
            }
            
        }
    }

    render(ctx){
        var elementsSorted = this.elements.toSorted(function(a, b){return a.z-b.z});
        //console.log(elementsSorted);

        for(var i =0; i < elementsSorted.length; i++){
            for(var l =0; l < elementsSorted[i].components.length; l++){
                if(!elementsSorted[i].visible)
                    continue
            
                var wd = elementsSorted[i].components[l].requestRenderSize(ctx,this,elementsSorted[i]);  
                var w = wd[0];
                var h = wd[1];
                //console.log(wd);         
                /*     
                var c1,c2,c3,c4;
                
                c1=[(elementsSorted[i].x+this.camera.x)*this.camera.xscale
                ,(elementsSorted[i].y+this.camera.y)*this.camera.yscale];

                c2=[(elementsSorted[i].x+this.camera.x+w)*this.camera.xscale
                ,(elementsSorted[i].y+this.camera.y)*this.camera.yscale];

                c3=[(elementsSorted[i].x+this.camera.x)*this.camera.xscale
                ,(elementsSorted[i].y+this.camera.y+h)*this.camera.yscale];

                c4=[(elementsSorted[i].x+this.camera.y+w)*this.camera.xscale
                ,(elementsSorted[i].y+this.camera.y+h)*this.camera.yscale];

                var d1,d2,d3,d4;

                d1=[0,0];
                d2=[0,height];
                d3=[width,0];
                d4=[width,height]
                */

                if((w==0&&h==0) || rectRect((elementsSorted[i].x+this.camera.x)*this.camera.xscale,(elementsSorted[i].y+this.camera.y)*this.camera.yscale,w,h,0,0,width,height)){
                    ctx.globalAlpha = 1;
                    elementsSorted[i].components[l].render(ctx,this,elementsSorted[i]);
                }


            
                //elementsSorted[i].components[l].render(ctx,this,elementsSorted[i]);
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
    static GlobalScene=null;
    static CurrentScene = 0;
}

class element{
    visible=true
    x=0;
    y=0;
    z=0;
    id="";
    xscale=1;
    yscale=1;
    components = [];    
    constructor(id){
        this.id=id;
    }


}


class component{
    initialized = false;
    constructor(){
        this.initialized=false;
    }

    //called every single tick (except the first one of an object)
    update(ctx,scene,parent){

    }

    //called on the first tick of the entire scene (will not trigger if object was created after scene runtime)
    sceneAwake(ctx,scene,parent){

    }
    //called on the first tick of an object (aka when it was created)
    awake(ctx,scene,parent){
        
    }
    //called when the object is rendered, (IF THE OBJECT IS OUTSIDE OF VIEW, THIS WILL NOT BE CALLED)
    render(ctx,scene,parent){
        
    }
    //called whenever an object is considered for rendering, this should return the width and height of the box in which objects would be rendered (IF THE BOX DEFINED IS INSIDE THE CAMERA, THE OBJECT WILL PASS TO RENDER, ENTER 0,0 TO MAKE IT RENDER EVEN WHEN OFF CAMERA)
    requestRenderSize(ctx,scene,parent){
        return[0,0]
    }

    
}

class SpriteRenderer extends component{

    img;

    constructor(img,isUI=false){
        super();
        this.opacity=1;
        this.img=img;
        this.isUI=isUI;
    }
    
    update(ctx,scene,parent){
        
        //console.log(this.parent);
        
    }

    sceneAwake(ctx,scene,parent){

    }

    render(ctx,scene,parent){
        //console.log("rendered");
        ctx.fillStyle="#ffffff";
        ctx.globalAlpha = this.opacity;
        if(!this.isUI)
            ctx.drawImage(this.img,parent.x+scene.camera.x,parent.y+scene.camera.y,this.img.width*parent.xscale*+scene.camera.xscale,this.img.height*parent.yscale*+scene.camera.yscale);
        else
            ctx.drawImage(this.img,parent.x,parent.y,this.img.width*parent.xscale*+scene.camera.xscale,this.img.height*parent.yscale*+scene.camera.yscale);


    }
    requestRenderSize(ctx,scene,parent){
        //console.log(this.img.height);
        return[this.img.width,this.img.height];
    }
}

class UISpriteRenderer extends SpriteRenderer{


    constructor(img){
        super(img,true);
        console.warn(`the UISpriteRender class is deprecated, for the same effect use SpriteRenderer with "isUI" set to "true"`)
    }
    
    update(ctx,scene,parent){
        
        //console.log(this.parent);
        
    }

    sceneAwake(ctx,scene,parent){

    }
}

class button extends component{

}

class Font {
    static FNT04B_03=new Font(systemRoute+"util/fonts/04B_03/",10,0.75);
    static Nintendo_DS_BIOS=new Font(systemRoute+"util/fonts/Nintendo-DS-BIOS",15,0.375);
    static Pixeltype=new Font(systemRoute+"util/fonts/Pixeltype/",15,0.375);
    static TypeWriter=new Font(systemRoute+"util/fonts/type_writer/",15,1);
    static default = this.FNT04B_03;
    /*
    for a custom naming method, use something of the lines of:
    let customNamingMethod = (ascii) => `char_${ascii}.png`;
let myFont = new Font("path/to/font/matrix/", [32, 255], customNamingMethod);
    */
    constructor(fontPath, lineHeight = 20, characterSize = 1, asciiRange = [32,255], namingMethod = null) {
        this.characterImages = {};

        this.characterSize=characterSize;

        this.lineHeight=lineHeight;

        // Default naming method if none is provided
        const defaultNamingMethod = (ascii) => `F${ascii}.png`;

        // Use the provided naming method or the default
        const getFilename = namingMethod || defaultNamingMethod;

        for (let i = asciiRange[0]; i <= asciiRange[1]; i++) {
            let charImage = new Image();
            charImage.src = `${fontPath}/${getFilename(i)}`;
            this.characterImages[i] = charImage;
        }
    }

    getCharImage(asciiDecimal) {
        return this.characterImages[asciiDecimal];
    }
}

class TextRenderer extends component {

    constructor(text,isUI=false, font=Font.default, scale = 1) {
        super();
        this.buffer=document.createElement('canvas');
        this.text = text;
        this.font = font;
        this.scale = scale; // Scaling factor for the font size
        this.isUI=isUI;
    }

    parseText() {
        const regex = /<c value="([^"]+)">(.*?)<\/c>/g;
        const segments = [];
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(this.text)) !== null) {
            // Add previous uncolored segment
            if (match.index > lastIndex) {
                segments.push({
                    text: this.text.substring(lastIndex, match.index),
                    color: null
                });
            }

            // Add colored segment
            segments.push({
                text: match[2],
                color: match[1]
            });

            lastIndex = match.index + match[0].length;
        }

        // Add remaining uncolored segment
        if (lastIndex < this.text.length) {
            segments.push({
                text: this.text.substring(lastIndex),
                color: null
            });
        }

        return segments;
    }

    render(ctx, scene, parent) {
        const segments = this.parseText();
        var x;
        var y;
        if(!this.isUI){
            y = parent.y + scene.camera.y;
            x = parent.x + scene.camera.x;
        }
        else{
            y = parent.y;
            x = parent.x;
        }
        var locx = x;
        segments.forEach(segment => {

            for (let i = 0; i < segment.text.length; i++) {
                let ascii = segment.text.charCodeAt(i);

                // Handle line breaks
                if (ascii === 10) { // ASCII code 10 for line feed/new line
                    y += this.font.lineHeight * this.scale;
                    locx = x;
                    continue;
                }

                let charImage = this.font.getCharImage(ascii);
                if (charImage) {
                    const scaledWidth = charImage.width * this.scale;
                    const scaledHeight = charImage.height * this.scale;
                    var add = 0;
                    if(segment.text[i]=="y"||segment.text[i]=="j"||segment.text[i]=="q"||segment.text[i]=="p"||segment.text[i]=="Y"){
                        add=add+1*this.scale;   
                    }
                    this.buffer.width = scaledWidth;
                    this.buffer.height = scaledHeight
                    const btx = this.buffer.getContext('2d');
    
                    btx.drawImage(charImage, 0, 0);
    
                    btx.fillStyle = '#FFFFFF';
                    if (segment.color) {
                        btx.fillStyle=segment.color;
                    }
                    btx.globalCompositeOperation = 'multiply';
                    btx.fillRect(0, 0, this.buffer.width, this.buffer.height);

                    btx.globalAlpha = 1;
                    btx.globalCompositeOperation = 'destination-in';
                    btx.drawImage(charImage, 0, 0);
                    ctx.drawImage(this.buffer, locx, y+add, scaledWidth, scaledHeight);
                    btx.clearRect(0,0,this.buffer.width,this.buffer.height);
                    
                    locx += scaledWidth * this.font.characterSize;
                }
            }
            if (segment.color) {
                ctx.fillStyle = "#000000"; // Reset to default color after each segment
            }
        });
    }


    requestRenderSize(ctx, scene, parent) {
        const segments = this.parseText();
        var y = 0;
        var x = 0;
        var maxX = 0;
        var locx = x;
        segments.forEach(segment => {

            for (let i = 0; i < segment.text.length; i++) {
                let ascii = segment.text.charCodeAt(i);
                maxX=Math.max(maxX,locx);
                // Handle line breaks
                if (ascii === 10) { // ASCII code 10 for line feed/new line
                    y += this.font.lineHeight * this.scale;

                    locx = x;
                    continue;
                }

                let charImage = this.font.getCharImage(ascii);
                const scaledWidth = charImage.width * this.scale;
                const scaledHeight = charImage.height * this.scale;
                locx += scaledWidth * this.font.characterSize;
            }
        });
        y += this.font.lineHeight * this.scale
        return [maxX,y]
    }
}
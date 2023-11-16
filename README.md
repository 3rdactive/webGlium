# WEBGLIUM (early access)

Here is an example structure of a client side using webglium: (if there is an asterisk next to the name it means the name of the folder / file can be changed and the program will still work)

-> Main*
  - index.html* : {
    the main html file must do the following (IN THIS ORDER):

    1. define a canvas (example):
        <canvas width="192" height="108" id="game" style="width:768px; height:432px; image-rendering: pixelated; background-color: black; font-smooth: never; -webkit-font-smoothing : none;"></canvas>
    2. define a system route (should lead to where the webglium system files are stored)
        var systemRoute= "/Users/yourusername/Documents/webGlium/webGlium/system/";
    3. define a scale up factor (if like in the example canvas, the resolution of the canvas is different then the size of it on the screen, you will need to enter how much it is scaled up / down, if they are the same, leave it at one)
        scaleup=4;
    4. Load the scenes:
        <script src="./data/scenes/imports.js"></script>
    5. Load the main system:
        <script src="/Users/yourusername/Documents/webGlium/webGlium/system/imports.js"></script>

  }
  -> data 
    -> art*
      - (here you can store ur png's / jpgs of the game art)
    -> fonts*
      - (here you can store the font matrix's)
    -> scenes
      - imports.js : {
        // the file must contain something like this:
        var scenes= ["menu","level"];
        //for each "variable" you set, you must create an associated "sceneName.js" file in this folder.
      }
      - sceneName.js* : {
        //an example of scene creation:
        function Scene_menu_Init(){
            var Scene_menu = new Scene("Menu");
            var camera = new element("camera");
            camera.rotation=0;
            camera.components.push(new ShakingCamera(0.00005,192,108,0.1));
            Scene_menu.elements.push(camera);
            Scene_menu.camera=Scene_menu.elements[0];
    

            var object1 = new element("background");
            object1.x=0;
            object1.y=0;
            var sprite1 = new Image(350,391);
            sprite1.src="data/art/background/menu.png";
            var sprite1renderer = new SpriteRenderer(sprite1);
            console.log(sprite1renderer.img)
            object1.components.push(sprite1renderer);

    
            Scene_menu.elements.push(object1);
            SceneManager.SceneList.push(Scene_menu);
        }
        Scene_menu_Init();
      }
      
    -> scripts
      - register.js (here you can write any custom code / components to execute!)

    -> sound*
        - (here you can store ur audio for the game)



After system/import.js is loaded, it will load these files (in this order): 
- system/util.js (utility functions)
- system/noise.js (perlin noise function)
- system/define.js (defines classes like Scene and Element)
- data/scripts/register.js (your custom scripts if you entered any)
- system/main.js (main functionality for playing scenes)
- data/scenes/{Scene} (it will repeat this for every single scene defined in data/scenes/imports.js, the first scene defined will always be the first one to play)


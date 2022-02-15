"use strict";
var PortalEngine;
(function (PortalEngine) {
    var f = FudgeCore;
    f.Debug.info("Main Program Template running!");
    window.addEventListener("load", startup);
    function startup(_event) {
        let engine = new PortalEngine.Game();
        engine.init();
        engine.startLoop();
    }
})(PortalEngine || (PortalEngine = {}));
///<reference types="../../Core/Build/FudgeCore"/>
var f = FudgeCore;
var PortalEngine;
(function (PortalEngine) {
    f.Serializer.registerNamespace(PortalEngine);
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var f = FudgeCore;
    class Frame extends f.Node {
        constructor() {
            super("Frame");
            this.material = new f.Material("mtrTexture", f.ShaderFlat, new f.CoatTextured(new f.Color(1, 1, 1, 1)));
            let node_cuboid_left = new f.Node("cuboid_left");
            let node_cuboid_right = new f.Node("cuboid_right");
            let node_cuboid_bottom = new f.Node("cuboid_bottom");
            let node_cuboid_top = new f.Node("cuboid_top");
            let mesh_cuboid_left = new f.ComponentMesh(new f.MeshCube());
            let mesh_cuboid_right = new f.ComponentMesh(new f.MeshCube());
            let mesh_cuboid_bottom = new f.ComponentMesh(new f.MeshCube());
            let mesh_cuboid_top = new f.ComponentMesh(new f.MeshCube());
            let transform_cuboid_left = new f.ComponentTransform();
            let transform_cuboid_right = new f.ComponentTransform();
            let transform_cuboid_bottom = new f.ComponentTransform();
            let transform_cuboid_top = new f.ComponentTransform();
            let material_cuboid_left = new f.ComponentMaterial(this.material);
            let material_cuboid_right = new f.ComponentMaterial(this.material);
            let material_cuboid_bottom = new f.ComponentMaterial(this.material);
            let material_cuboid_top = new f.ComponentMaterial(this.material);
            transform_cuboid_left.mtxLocal.translateX(-0.75);
            transform_cuboid_right.mtxLocal.translateX(0.75);
            transform_cuboid_left.mtxLocal.scaleY(2);
            transform_cuboid_right.mtxLocal.scaleZ(0.5);
            transform_cuboid_left.mtxLocal.scaleZ(0.5);
            transform_cuboid_right.mtxLocal.scaleY(2);
            transform_cuboid_left.mtxLocal.scaleX(0.5);
            transform_cuboid_right.mtxLocal.scaleX(0.5);
            transform_cuboid_bottom.mtxLocal.translateY(-0.75);
            transform_cuboid_top.mtxLocal.translateY(0.75);
            transform_cuboid_bottom.mtxLocal.scaleY(0.5);
            transform_cuboid_top.mtxLocal.scaleY(0.5);
            transform_cuboid_bottom.mtxLocal.scaleZ(0.5);
            transform_cuboid_top.mtxLocal.scaleZ(0.5);
            node_cuboid_left.addComponent(mesh_cuboid_left);
            node_cuboid_left.addComponent(transform_cuboid_left);
            node_cuboid_left.addComponent(material_cuboid_left);
            node_cuboid_right.addComponent(mesh_cuboid_right);
            node_cuboid_right.addComponent(transform_cuboid_right);
            node_cuboid_right.addComponent(material_cuboid_right);
            node_cuboid_bottom.addComponent(mesh_cuboid_bottom);
            node_cuboid_bottom.addComponent(transform_cuboid_bottom);
            node_cuboid_bottom.addComponent(material_cuboid_bottom);
            node_cuboid_top.addComponent(mesh_cuboid_top);
            node_cuboid_top.addComponent(transform_cuboid_top);
            node_cuboid_top.addComponent(material_cuboid_top);
            this.appendChild(node_cuboid_left);
            this.appendChild(node_cuboid_right);
            this.appendChild(node_cuboid_bottom);
            this.appendChild(node_cuboid_top);
        }
    }
    PortalEngine.Frame = Frame;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var f = FudgeCore;
    class Game {
        init() {
            this.scene = new PortalEngine.Scene();
            PortalEngine.GraphicalUserInterface.getInstance().addMainCanvas();
            this.gameViewport = new PortalEngine.customViewport();
            this.gameViewport.initialize("viewport", this.scene.getSceneGraph(), this.scene.getPlayer().getCamera(), PortalEngine.GraphicalUserInterface.getInstance().getGameCanvas());
            this.gameViewport.setPortals(this.scene.getPortals());
            this.updateListener = this.update.bind(this);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.updateListener);
            console.log("game initialised");
        }
        startLoop() {
            f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
        }
        update() {
            this.scene.update();
            this.gameViewport.draw();
        }
    }
    PortalEngine.Game = Game;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    class GraphicalUserInterface {
        constructor() {
            this.canvas_list = new Array();
        }
        static getInstance() {
            if (!GraphicalUserInterface.instance) {
                GraphicalUserInterface.instance = new GraphicalUserInterface();
            }
            return GraphicalUserInterface.instance;
        }
        addMainCanvas() {
            let canvas = document.createElement('canvas');
            canvas.id = 'mainCanvas';
            document.body.appendChild(canvas);
            this.gameCanvas = canvas;
            this.canvas_list.push(this.gameCanvas);
        }
        getGameCanvas() { return this.gameCanvas; }
    }
    PortalEngine.GraphicalUserInterface = GraphicalUserInterface;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var f = FudgeCore;
    class Player extends f.Node {
        constructor() {
            super("Player");
            this.componentCamera = new f.ComponentCamera();
            this.rotator = new f.Node("rotator");
            this.rotator.addComponent(new f.ComponentTransform());
            this.addChild(this.rotator);
            this.rotator.addComponent(this.componentCamera);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.MULTIPLICATION(f.Matrix4x4.ROTATION_Y(180), f.Matrix4x4.TRANSLATION(new f.Vector3(0, 0.5, 0)))));
            this.controlTranslationX = new f.Control("TranslationX", 7, 0 /* PROPORTIONAL */);
            this.controlTranslationY = new f.Control("TranslationY", 5, 0 /* PROPORTIONAL */);
            this.controlTranslationZ = new f.Control("TranslationZ", 7, 0 /* PROPORTIONAL */);
            this.controlRotateY = new f.Control("RotateY", 150, 0 /* PROPORTIONAL */);
            this.controlRotateX = new f.Control("RotateX", 150, 0 /* PROPORTIONAL */);
            console.log("camera");
        }
        update() {
            let deltaTime = f.Loop.timeFrameReal / 3000;
            let translationX = (f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D]));
            let translationY = (f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.SPACE])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.SHIFT_LEFT]));
            let translationZ = (f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S]));
            let rotateY = (f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.ARROW_LEFT])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.ARROW_RIGHT]));
            let rotateX = (f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.ARROW_DOWN])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.ARROW_UP]));
            this.controlTranslationX.setInput(translationX * deltaTime);
            this.controlTranslationY.setInput(translationY * deltaTime);
            this.controlTranslationZ.setInput(translationZ * deltaTime);
            this.controlRotateY.setInput(rotateY * deltaTime);
            this.controlRotateX.setInput(rotateX * deltaTime);
            this.mtxLocal.translateX(this.controlTranslationX.getOutput());
            this.mtxLocal.translateY(this.controlTranslationY.getOutput());
            this.mtxLocal.translateZ(this.controlTranslationZ.getOutput());
            this.mtxLocal.rotateY(this.controlRotateY.getOutput());
            this.rotator.mtxLocal.rotateX(this.controlRotateX.getOutput());
        }
        getCamera() { return this.componentCamera; }
    }
    PortalEngine.Player = Player;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var f = FudgeCore;
    class Portal extends f.Node {
        init(sceneGraph, camera, translation, rotation) {
            this.camera = camera;
            this.sceneGraph = sceneGraph;
            this.height = this.width = 400;
            this.addComponent(new f.ComponentMesh(new f.MeshQuad()));
            let material = new f.Material("mtrTexture", f.ShaderFlat, new f.CoatTextured(new f.Color(1, 0.2, 0.8, 1)));
            let componentMaterial = new f.ComponentMaterial(material);
            this.addComponent(componentMaterial);
            this.addComponent(new f.ComponentTransform());
            this.initPosition(translation, new f.Vector3(0, rotation, 0));
            this.appendChild(new PortalEngine.Frame());
            console.log("portal initialisation finished");
        }
        initPosition(translation, rotation) {
            this.mtxLocal.rotate(rotation);
            this.mtxLocal.translate(translation, false);
        }
        connect(portalForConnection) {
            this.connectWithPortal(portalForConnection);
            portalForConnection.connectWithPortal(this);
            this.cameraPortal.init(portalForConnection);
            portalForConnection.cameraPortal.init(this);
        }
        connectWithPortal(portalForConnection) {
            //setup portal Material
            let crc2Portal = document.createElement("canvas").getContext("2d");
            crc2Portal.canvas.width = this.width;
            crc2Portal.canvas.height = this.height;
            this.texturePortal = new f.TextureCanvas("Portal", crc2Portal);
            let materialPortal = new f.Material("Portal", PortalEngine.PortalShader, new f.CoatTextured(null, this.texturePortal));
            this.getComponent(f.ComponentMaterial).material = materialPortal;
            //setup Portal Camera
            this.cameraPortal = new PortalEngine.customCamera();
            let portalCameraMount = new f.Node("portal camera mount");
            portalCameraMount.addComponent(this.cameraPortal);
            portalCameraMount.addComponent(new f.ComponentTransform());
            this.sceneGraph.appendChild(portalCameraMount);
            //setup Canvas to Render to
            let canvasPortal = document.createElement("canvas");
            document.body.appendChild(canvasPortal);
            canvasPortal.style.visibility = "hidden";
            canvasPortal.width = this.width;
            canvasPortal.height = this.height;
            //setup portal viewport
            this.viewportPortal = new f.Viewport();
            this.viewportPortal.initialize("TestViewport", this.sceneGraph, this.cameraPortal, canvasPortal);
            this.connectedPortal = portalForConnection;
        }
        update() {
            if (this.connectedPortal) {
                this.updatePortalCamera();
                this.viewportPortal.draw();
                let canvas = this.viewportPortal.getCanvas();
                this.texturePortal.crc2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, this.texturePortal.crc2.canvas.width, this.texturePortal.crc2.canvas.height);
                this.texturePortal.refresh();
            }
        }
        updatePortalCamera() {
            //set translation of camera
            let cameraT_worldSpace = this.camera.node.mtxWorld.clone;
            let inPortal_worldSpace = this.mtxWorld.clone;
            let outPortal_worldSpace = this.connectedPortal.mtxWorld.clone;
            let inPortalT_worldSpace_inverse = f.Matrix4x4.INVERSION(inPortal_worldSpace);
            let cameraT_inPortalSpace = f.Matrix4x4.MULTIPLICATION(inPortalT_worldSpace_inverse, cameraT_worldSpace);
            let relativePosition = cameraT_inPortalSpace.translation;
            relativePosition.transform(f.Matrix4x4.ROTATION_Y(180));
            relativePosition.transform(outPortal_worldSpace);
            //set rotation of camera
            let relativeRotation = cameraT_inPortalSpace.rotation;
            relativeRotation.add(new f.Vector3(0, 180, 0));
            relativeRotation.add(outPortal_worldSpace.rotation);
            let transform = new f.Matrix4x4();
            transform.translate(relativePosition);
            transform.rotate(relativeRotation);
            this.cameraPortal.node.cmpTransform.mtxLocal.set(transform);
        }
    }
    PortalEngine.Portal = Portal;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var f = FudgeCore;
    class Scene {
        constructor() {
            this.portal_list = new Array();
            this.player = new PortalEngine.Player();
            this.sceneGraph = new f.Graph("Scene");
            this.initGraph();
        }
        getSceneGraph() { return this.sceneGraph; }
        getPlayer() { return this.player; }
        getPortals() { return this.portal_list; }
        initGraph() {
            this.sceneGraph.appendChild(this.player);
            let meshCube = new f.MeshCube("meshCube");
            let meshQuad = new f.MeshQuad("meshQuad");
            let meshSphere = new f.MeshSphere("meshSphere", 8, 8);
            let materialQuad = new f.Material("materialFlat", f.ShaderFlat, new f.CoatColored(new f.Color(0.2980392156862745, 0.44313725490196076, 0.2196078431372549, 1)));
            let materialSphere = new f.Material("materialFlat", f.ShaderFlat, new f.CoatColored(new f.Color(1, 0.2, 0.1, 1)));
            let componentLightAmbiant = new f.ComponentLight(new f.LightAmbient(new f.Color(0.3, 0.3, 0.3, 1)));
            let componentLightDirectional = new f.ComponentLight(new f.LightDirectional(new f.Color(1, 1, 1, 1)));
            componentLightDirectional.mtxPivot.rotateX(120);
            this.sceneGraph.addComponent(componentLightAmbiant);
            this.sceneGraph.addComponent(componentLightDirectional);
            let floor = new f.Node("Floor");
            let componentMeshQuad = new f.ComponentMesh(meshQuad);
            let componentMaterialQuad = new f.ComponentMaterial(materialQuad);
            componentMeshQuad.mtxPivot.rotateX(-90);
            componentMeshQuad.mtxPivot.scaleX(20);
            componentMeshQuad.mtxPivot.scaleY(20);
            floor.addComponent(componentMeshQuad);
            floor.addComponent(componentMaterialQuad);
            let sphere = new f.Node("Sphere");
            let componentMeshSphere = new f.ComponentMesh(meshSphere);
            let componentTransformSphere = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 1, 0)));
            let componentMaterialSphere = new f.ComponentMaterial(materialSphere);
            componentMeshSphere.mtxPivot.scale(new f.Vector3(0.5, 0.5, 0.5));
            sphere.addComponent(componentTransformSphere);
            sphere.addComponent(componentMeshSphere);
            sphere.addComponent(componentMaterialSphere);
            let cube = new f.Node("cube");
            let componentMeshCube = new f.ComponentMesh(meshCube);
            let componentTransformCube = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-4.1, 0.5, 0)));
            let componentMaterialCube = new f.ComponentMaterial(materialSphere);
            cube.addComponent(componentTransformCube);
            cube.addComponent(componentMeshCube);
            cube.addComponent(componentMaterialCube);
            this.sceneGraph.appendChild(floor);
            this.sceneGraph.appendChild(sphere);
            this.sceneGraph.appendChild(cube);
            this.portal_list.push(new PortalEngine.Portal("portal1"));
            this.portal_list[0].init(this.sceneGraph, this.player.getCamera(), new f.Vector3(-3, 0.49, 0), 90);
            this.sceneGraph.addChild(this.portal_list[0]);
            this.portal_list.push(new PortalEngine.Portal("portal2"));
            this.portal_list[1].init(this.sceneGraph, this.player.getCamera(), new f.Vector3(0, 0.49, -4), 0);
            this.sceneGraph.addChild(this.portal_list[1]);
            this.portal_list[0].connect(this.portal_list[1]);
        }
        update() {
            this.player.update();
        }
    }
    PortalEngine.Scene = Scene;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var ƒ = FudgeCore;
    class customCamera extends ƒ.ComponentCamera {
        init(portal) {
            this.portal = portal;
        }
        projectCentral(_aspect = this.aspectRatio, _fieldOfView = this.fieldOfView, _direction = this.direction, _near = 1, _far = 2000) {
            super.projectCentral();
            let cameraT_worldSpace = this.node.mtxWorld.clone;
            let portalT_worldSpace = this.portal.mtxWorld.clone;
            let inverseCameraT_worldSpace = f.Matrix4x4.INVERSION(cameraT_worldSpace);
            let portalNormal = new f.Vector3(0, 0, 1);
            portalNormal.transform(portalT_worldSpace, true);
            portalNormal.transform(inverseCameraT_worldSpace);
            let portalPosition = new f.Vector3(0, 0, 0);
            portalPosition.transform(portalT_worldSpace, true);
            portalPosition.transform(inverseCameraT_worldSpace);
            console.log("portal Position", portalPosition.x, portalPosition.y, portalPosition.z);
            portalNormal = f.Vector3.DIFFERENCE(portalNormal, portalPosition);
            console.log("normal Vector", portalNormal.x, portalNormal.y, portalNormal.z);
            ////Paramter möglicherweise suboptimal und muss angepasst werden
            let extraclip = 0.25;
            this.clipObliqueCP(f.Vector3.DIFFERENCE(portalPosition, f.Vector3.SCALE(portalNormal, extraclip)), portalNormal);
        }
        clipOblique(clipPoint, clipNormal) {
            function sgn(a) {
                if (a > 0)
                    return 1;
                if (a < 0)
                    return -1;
                return 0;
            }
            let matrix = this.mtxProjection.get();
            let clipPlaneX = clipNormal.x;
            let clipPlaneY = clipNormal.y;
            let clipPlaneZ = clipNormal.z;
            let clipPlaneW = f.Vector3.DOT(f.Vector3.SCALE(clipNormal, -1), clipPoint);
            console.log("w:", clipPlaneW);
            let qX = (sgn(clipPlaneX) + matrix[8]) / matrix[0];
            let qY = (sgn(clipPlaneY) + matrix[9]) / matrix[5];
            let qZ = -1;
            let qW = (1 + matrix[10]) / matrix[14];
            let scalar = 2 / (clipPlaneX * qX + clipPlaneY * qY + clipPlaneZ * qZ + clipPlaneW * qW);
            let cX = clipPlaneX * scalar;
            let cY = clipPlaneY * scalar;
            let cZ = clipPlaneZ * scalar;
            let cW = clipPlaneW * scalar;
            matrix[2] = cX;
            matrix[6] = cY;
            matrix[10] = cZ + 1;
            matrix[14] = cW;
            this.mtxProjection.set(matrix);
        }
        clipObliqueCP(clipPoint, clipNormal) {
            let projection = this.mtxProjection.get();
            let clipPlaneX = clipNormal.x;
            let clipPlaneY = clipNormal.y;
            let clipPlaneZ = clipNormal.z;
            let clipPlaneW = f.Vector3.DOT(f.Vector3.SCALE(clipNormal, -1), clipPoint);
            console.log("w:", clipPlaneW);
            let matrix = f.Matrix4x4.INVERSION(this.mtxProjection.clone).get();
            let vX = (clipPlaneX < 0.0) ? 1 : -1;
            let vY = (clipPlaneY < 0.0) ? 1 : -1;
            let vZ = 1;
            let vW = 1;
            let qX = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12] * vW;
            let qY = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13] * vW;
            let qZ = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14] * vW;
            let qW = matrix[3] * vX + matrix[7] * vY + matrix[11] * vZ + matrix[15] * vW;
            let scalar = 2 / (clipPlaneX * qX + clipPlaneY * qY + clipPlaneZ * qZ + clipPlaneW * qW);
            let cX = clipPlaneX * scalar;
            let cY = clipPlaneY * scalar;
            let cZ = clipPlaneZ * scalar;
            let cW = clipPlaneW * scalar;
            projection[2] = cX - projection[3];
            projection[6] = cY - projection[7];
            projection[10] = cZ - projection[11];
            projection[14] = cW - projection[15];
            this.mtxProjection.set(projection);
        }
    }
    PortalEngine.customCamera = customCamera;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var ƒ = FudgeCore;
    class customViewport extends ƒ.Viewport {
        draw(_calculateTransforms = true) {
            if (!this.getBranch())
                return;
            ƒ.Render.resetFrameBuffer();
            if (!this.camera.isActive)
                return;
            if (this.adjustingFrames)
                this.adjustFrames();
            if (this.adjustingCamera)
                this.adjustCamera();
            if (_calculateTransforms)
                this.calculateTransforms();
            this.portal_list.forEach(portal => portal.update());
            ƒ.Render.clear(this.camera.clrBackground);
            ƒ.Render.draw(this.camera);
            this.context.imageSmoothingEnabled = false;
            this.context.drawImage(ƒ.Render.getCanvas(), this.rectSource.x, this.rectSource.y, this.rectSource.width, this.rectSource.height, this.rectDestination.x, this.rectDestination.y, this.rectDestination.width, this.rectDestination.height);
            this.getCanvas().getContext("2d").drawImage(this.context.canvas, 0, 0);
        }
        initialize(_name, _branch, _camera, _canvas) {
            super.initialize(_name, _branch, _camera, _canvas);
            this.context = document.createElement("canvas").getContext("2d");
            this.context.canvas.width = 2000;
            this.context.canvas.height = 1000;
        }
        setPortals(_portal_list) {
            this.portal_list = _portal_list;
        }
    }
    PortalEngine.customViewport = customViewport;
})(PortalEngine || (PortalEngine = {}));
var PortalEngine;
(function (PortalEngine) {
    var ƒ = FudgeCore;
    class PortalShader extends ƒ.Shader {
        static getCoat() {
            return ƒ.CoatTextured;
        }
        static getVertexShaderSource() {
            return `#version 300 es
          uniform mat4 u_projection;

          in vec3 a_position;

          out vec4 position;

          void main() {
              gl_Position = u_projection * vec4(a_position, 1.0);
              position = gl_Position;
          }`;
        }
        static getFragmentShaderSource() {
            return `#version 300 es
          precision mediump float;
          uniform sampler2D u_texture;
          uniform mat3 u_pivot;
          
          in vec4 position;

          out vec4 frag;
          
          void main() {
              vec2 uv = (position.xy / position.w);
              uv = vec2(uv.x, -uv.y);
              uv = 0.5 * uv + 0.5;
              frag = vec4(texture(u_texture, uv).rgb, 1);
          }`;
        }
    }
    PortalShader.iSubclass = ƒ.Shader.registerSubclass(PortalShader);
    PortalEngine.PortalShader = PortalShader;
})(PortalEngine || (PortalEngine = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9ydGFscmVuZGVyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vU291cmNlL01haW4udHMiLCIuLi9Tb3VyY2UvUmVmZXJlbmNlcy50cyIsIi4uL1NvdXJjZS9HYW1lL0ZyYW1lLnRzIiwiLi4vU291cmNlL0dhbWUvR2FtZS50cyIsIi4uL1NvdXJjZS9HYW1lL0dyYXBoaWNhbFVzZXJJbnRlcmZhY2UudHMiLCIuLi9Tb3VyY2UvR2FtZS9QbGF5ZXIudHMiLCIuLi9Tb3VyY2UvR2FtZS9Qb3J0YWwudHMiLCIuLi9Tb3VyY2UvR2FtZS9TY2VuZS50cyIsIi4uL1NvdXJjZS9HYW1lL2N1c3RvbUNhbWVyYS50cyIsIi4uL1NvdXJjZS9HYW1lL2N1c3RvbVZpZXdwb3J0LnRzIiwiLi4vU291cmNlL0dhbWUvcG9ydGFsU2hhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLFlBQVksQ0FVckI7QUFWRCxXQUFVLFlBQVk7SUFDcEIsSUFBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUE7SUFDOUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBaUIsT0FBTyxDQUFDLENBQUM7SUFFeEQsU0FBUyxPQUFPLENBQUMsTUFBYTtRQUM1QixJQUFJLE1BQU0sR0FBUyxJQUFJLGFBQUEsSUFBSSxFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7QUFDSCxDQUFDLEVBVlMsWUFBWSxLQUFaLFlBQVksUUFVckI7QUNWRCxrREFBa0Q7QUFDbEQsSUFBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBRXJCLElBQVUsWUFBWSxDQUVyQjtBQUZELFdBQVUsWUFBWTtJQUNwQixDQUFDLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFD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QUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3BGLElBQUksRUFBRSxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckYsSUFBSSxFQUFFLEdBQVcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVyRixJQUFJLE1BQU0sR0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFHakcsSUFBSSxFQUFFLEdBQVcsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUNyQyxJQUFJLEVBQUUsR0FBVyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3JDLElBQUksRUFBRSxHQUFXLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDckMsSUFBSSxFQUFFLEdBQVcsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUVyQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVyQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQ047SUF4R1kseUJBQVksZUF3R3hCLENBQUE7QUFDTCxDQUFDLEVBNUdTLFlBQVksS0FBWixZQUFZLFFBNEdyQjtBQzVHRCxJQUFVLFlBQVksQ0EyQ3JCO0FBM0NELFdBQVUsWUFBWTtJQUNsQixJQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7SUFFckIsTUFBYSxjQUFlLFNBQVEsQ0FBQyxDQUFDLFFBQVE7UUFJbkMsSUFBSSxDQUFDLHVCQUFnQyxJQUFJO1lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixPQUFPO1lBQ1gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQ3JCLE9BQU87WUFDWCxJQUFJLElBQUksQ0FBQyxlQUFlO2dCQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsZUFBZTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLElBQUksb0JBQW9CO2dCQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFDbkYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQzFHLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVNLFVBQVUsQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLE9BQTBCLEVBQUUsT0FBMEI7WUFDcEcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QyxDQUFDO1FBRU0sVUFBVSxDQUFDLFlBQTJCO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLENBQUM7S0FDSjtJQXZDWSwyQkFBYyxpQkF1QzFCLENBQUE7QUFDTCxDQUFDLEVBM0NTLFlBQVksS0FBWixZQUFZLFFBMkNyQjtBQzNDRCxJQUFVLFlBQVksQ0EwQ25CO0FBMUNILFdBQVUsWUFBWTtJQUNsQixJQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7SUFFckIsTUFBc0IsWUFBYSxTQUFRLENBQUMsQ0FBQyxNQUFNO1FBRzFDLE1BQU0sQ0FBQyxPQUFPO1lBQ25CLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUN4QixDQUFDO1FBRU0sTUFBTSxDQUFDLHFCQUFxQjtZQUNqQyxPQUFPOzs7Ozs7Ozs7O1lBVUgsQ0FBQztRQUNQLENBQUM7UUFFTSxNQUFNLENBQUMsdUJBQXVCO1lBQ25DLE9BQU87Ozs7Ozs7Ozs7Ozs7O1lBY0gsQ0FBQztRQUNQLENBQUM7O0lBcENzQixzQkFBUyxHQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFEL0QseUJBQVksZUFzQ2pDLENBQUE7QUFDSCxDQUFDLEVBMUNPLFlBQVksS0FBWixZQUFZLFFBMENuQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBQb3J0YWxFbmdpbmUge1xyXG4gIGltcG9ydCBmID0gRnVkZ2VDb3JlO1xyXG4gIGYuRGVidWcuaW5mbyhcIk1haW4gUHJvZ3JhbSBUZW1wbGF0ZSBydW5uaW5nIVwiKVxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCA8RXZlbnRMaXN0ZW5lcj5zdGFydHVwKTtcclxuXHJcbiAgZnVuY3Rpb24gc3RhcnR1cChfZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBsZXQgZW5naW5lOiBHYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIGVuZ2luZS5pbml0KCk7XHJcbiAgICBlbmdpbmUuc3RhcnRMb29wKCk7XHJcbiAgfVxyXG59IiwiLy8vPHJlZmVyZW5jZSB0eXBlcz1cIi4uLy4uL0NvcmUvQnVpbGQvRnVkZ2VDb3JlXCIvPlxyXG5pbXBvcnQgZiA9IEZ1ZGdlQ29yZTtcclxuXHJcbm5hbWVzcGFjZSBQb3J0YWxFbmdpbmUge1xyXG4gIGYuU2VyaWFsaXplci5yZWdpc3Rlck5hbWVzcGFjZShQb3J0YWxFbmdpbmUpO1xyXG59IiwibmFtZXNwYWNlIFBvcnRhbEVuZ2luZSB7XHJcbiAgICBpbXBvcnQgZiA9IEZ1ZGdlQ29yZTtcclxuICAgIGV4cG9ydCBjbGFzcyBGcmFtZSBleHRlbmRzIGYuTm9kZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtYXRlcmlhbDogZi5NYXRlcmlhbCA9IG5ldyBmLk1hdGVyaWFsKFwibXRyVGV4dHVyZVwiLCBmLlNoYWRlckZsYXQsIG5ldyBmLkNvYXRUZXh0dXJlZChuZXcgZi5Db2xvcigxLDEsMSwxKSkpO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoXCJGcmFtZVwiKTtcclxuICAgICAgICAgICAgbGV0IG5vZGVfY3Vib2lkX2xlZnQgOiBmLk5vZGUgPSBuZXcgZi5Ob2RlKFwiY3Vib2lkX2xlZnRcIik7XHJcbiAgICAgICAgICAgIGxldCBub2RlX2N1Ym9pZF9yaWdodCA6IGYuTm9kZSA9IG5ldyBmLk5vZGUoXCJjdWJvaWRfcmlnaHRcIik7XHJcbiAgICAgICAgICAgIGxldCBub2RlX2N1Ym9pZF9ib3R0b20gOiBmLk5vZGUgPSBuZXcgZi5Ob2RlKFwiY3Vib2lkX2JvdHRvbVwiKTtcclxuICAgICAgICAgICAgbGV0IG5vZGVfY3Vib2lkX3RvcCA6IGYuTm9kZSA9IG5ldyBmLk5vZGUoXCJjdWJvaWRfdG9wXCIpO1xyXG4gICAgICAgICAgICBsZXQgbWVzaF9jdWJvaWRfbGVmdCA6IGYuQ29tcG9uZW50TWVzaCA9IG5ldyBmLkNvbXBvbmVudE1lc2gobmV3IGYuTWVzaEN1YmUoKSk7XHJcbiAgICAgICAgICAgIGxldCBtZXNoX2N1Ym9pZF9yaWdodCA6IGYuQ29tcG9uZW50TWVzaCA9IG5ldyBmLkNvbXBvbmVudE1lc2gobmV3IGYuTWVzaEN1YmUoKSk7XHJcbiAgICAgICAgICAgIGxldCBtZXNoX2N1Ym9pZF9ib3R0b20gOiBmLkNvbXBvbmVudE1lc2ggPSBuZXcgZi5Db21wb25lbnRNZXNoKG5ldyBmLk1lc2hDdWJlKCkpO1xyXG4gICAgICAgICAgICBsZXQgbWVzaF9jdWJvaWRfdG9wIDogZi5Db21wb25lbnRNZXNoID0gbmV3IGYuQ29tcG9uZW50TWVzaChuZXcgZi5NZXNoQ3ViZSgpKTtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybV9jdWJvaWRfbGVmdCA6IGYuQ29tcG9uZW50VHJhbnNmb3JtID0gbmV3IGYuQ29tcG9uZW50VHJhbnNmb3JtKCk7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1fY3Vib2lkX3JpZ2h0IDogZi5Db21wb25lbnRUcmFuc2Zvcm0gPSBuZXcgZi5Db21wb25lbnRUcmFuc2Zvcm0oKTtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybV9jdWJvaWRfYm90dG9tIDogZi5Db21wb25lbnRUcmFuc2Zvcm0gPSBuZXcgZi5Db21wb25lbnRUcmFuc2Zvcm0oKTtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybV9jdWJvaWRfdG9wIDogZi5Db21wb25lbnRUcmFuc2Zvcm0gPSBuZXcgZi5Db21wb25lbnRUcmFuc2Zvcm0oKTtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsX2N1Ym9pZF9sZWZ0OiBmLkNvbXBvbmVudE1hdGVyaWFsID0gbmV3IGYuQ29tcG9uZW50TWF0ZXJpYWwodGhpcy5tYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbF9jdWJvaWRfcmlnaHQ6IGYuQ29tcG9uZW50TWF0ZXJpYWwgPSBuZXcgZi5Db21wb25lbnRNYXRlcmlhbCh0aGlzLm1hdGVyaWFsKTtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsX2N1Ym9pZF9ib3R0b206IGYuQ29tcG9uZW50TWF0ZXJpYWwgPSBuZXcgZi5Db21wb25lbnRNYXRlcmlhbCh0aGlzLm1hdGVyaWFsKTtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsX2N1Ym9pZF90b3A6IGYuQ29tcG9uZW50TWF0ZXJpYWwgPSBuZXcgZi5Db21wb25lbnRNYXRlcmlhbCh0aGlzLm1hdGVyaWFsKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtX2N1Ym9pZF9sZWZ0Lm10eExvY2FsLnRyYW5zbGF0ZVgoLTAuNzUpO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1fY3Vib2lkX3JpZ2h0Lm10eExvY2FsLnRyYW5zbGF0ZVgoMC43NSk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybV9jdWJvaWRfbGVmdC5tdHhMb2NhbC5zY2FsZVkoMik7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybV9jdWJvaWRfcmlnaHQubXR4TG9jYWwuc2NhbGVaKDAuNSk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybV9jdWJvaWRfbGVmdC5tdHhMb2NhbC5zY2FsZVooMC41KTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtX2N1Ym9pZF9yaWdodC5tdHhMb2NhbC5zY2FsZVkoMik7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybV9jdWJvaWRfbGVmdC5tdHhMb2NhbC5zY2FsZVgoMC41KTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtX2N1Ym9pZF9yaWdodC5tdHhMb2NhbC5zY2FsZVgoMC41KTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtX2N1Ym9pZF9ib3R0b20ubXR4TG9jYWwudHJhbnNsYXRlWSgtMC43NSk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybV9jdWJvaWRfdG9wLm10eExvY2FsLnRyYW5zbGF0ZVkoMC43NSk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybV9jdWJvaWRfYm90dG9tLm10eExvY2FsLnNjYWxlWSgwLjUpO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1fY3Vib2lkX3RvcC5tdHhMb2NhbC5zY2FsZVkoMC41KTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtX2N1Ym9pZF9ib3R0b20ubXR4TG9jYWwuc2NhbGVaKDAuNSk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybV9jdWJvaWRfdG9wLm10eExvY2FsLnNjYWxlWigwLjUpO1xyXG4gICAgICAgICAgICBub2RlX2N1Ym9pZF9sZWZ0LmFkZENvbXBvbmVudChtZXNoX2N1Ym9pZF9sZWZ0KTtcclxuICAgICAgICAgICAgbm9kZV9jdWJvaWRfbGVmdC5hZGRDb21wb25lbnQodHJhbnNmb3JtX2N1Ym9pZF9sZWZ0KTtcclxuICAgICAgICAgICAgbm9kZV9jdWJvaWRfbGVmdC5hZGRDb21wb25lbnQobWF0ZXJpYWxfY3Vib2lkX2xlZnQpO1xyXG4gICAgICAgICAgICBub2RlX2N1Ym9pZF9yaWdodC5hZGRDb21wb25lbnQobWVzaF9jdWJvaWRfcmlnaHQpO1xyXG4gICAgICAgICAgICBub2RlX2N1Ym9pZF9yaWdodC5hZGRDb21wb25lbnQodHJhbnNmb3JtX2N1Ym9pZF9yaWdodCk7XHJcbiAgICAgICAgICAgIG5vZGVfY3Vib2lkX3JpZ2h0LmFkZENvbXBvbmVudChtYXRlcmlhbF9jdWJvaWRfcmlnaHQpO1xyXG4gICAgICAgICAgICBub2RlX2N1Ym9pZF9ib3R0b20uYWRkQ29tcG9uZW50KG1lc2hfY3Vib2lkX2JvdHRvbSk7XHJcbiAgICAgICAgICAgIG5vZGVfY3Vib2lkX2JvdHRvbS5hZGRDb21wb25lbnQodHJhbnNmb3JtX2N1Ym9pZF9ib3R0b20pO1xyXG4gICAgICAgICAgICBub2RlX2N1Ym9pZF9ib3R0b20uYWRkQ29tcG9uZW50KG1hdGVyaWFsX2N1Ym9pZF9ib3R0b20pO1xyXG4gICAgICAgICAgICBub2RlX2N1Ym9pZF90b3AuYWRkQ29tcG9uZW50KG1lc2hfY3Vib2lkX3RvcCk7XHJcbiAgICAgICAgICAgIG5vZGVfY3Vib2lkX3RvcC5hZGRDb21wb25lbnQodHJhbnNmb3JtX2N1Ym9pZF90b3ApO1xyXG4gICAgICAgICAgICBub2RlX2N1Ym9pZF90b3AuYWRkQ29tcG9uZW50KG1hdGVyaWFsX2N1Ym9pZF90b3ApO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKG5vZGVfY3Vib2lkX2xlZnQpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKG5vZGVfY3Vib2lkX3JpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChub2RlX2N1Ym9pZF9ib3R0b20pO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKG5vZGVfY3Vib2lkX3RvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFBvcnRhbEVuZ2luZSB7XHJcbiAgICBpbXBvcnQgZiA9IEZ1ZGdlQ29yZTtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlTGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzY2VuZTogU2NlbmU7XHJcbiAgICAgICAgcHJpdmF0ZSBnYW1lVmlld3BvcnQ6IGN1c3RvbVZpZXdwb3J0O1xyXG5cclxuICAgICAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpO1xyXG4gICAgICAgICAgICBHcmFwaGljYWxVc2VySW50ZXJmYWNlLmdldEluc3RhbmNlKCkuYWRkTWFpbkNhbnZhcygpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVWaWV3cG9ydCA9IG5ldyBjdXN0b21WaWV3cG9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVWaWV3cG9ydC5pbml0aWFsaXplKFwidmlld3BvcnRcIiwgdGhpcy5zY2VuZS5nZXRTY2VuZUdyYXBoKCksIHRoaXMuc2NlbmUuZ2V0UGxheWVyKCkuZ2V0Q2FtZXJhKCksIEdyYXBoaWNhbFVzZXJJbnRlcmZhY2UuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lQ2FudmFzKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVWaWV3cG9ydC5zZXRQb3J0YWxzKHRoaXMuc2NlbmUuZ2V0UG9ydGFscygpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXIgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICBmLkxvb3AuYWRkRXZlbnRMaXN0ZW5lcihmLkVWRU5ULkxPT1BfRlJBTUUsIHRoaXMudXBkYXRlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgaW5pdGlhbGlzZWRcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGFydExvb3AoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGYuTG9vcC5zdGFydChmLkxPT1BfTU9ERS5USU1FX1JFQUwsIDMwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVWaWV3cG9ydC5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFBvcnRhbEVuZ2luZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR3JhcGhpY2FsVXNlckludGVyZmFjZSB7XHJcbiAgICAgICAgLy9TaW5nbGV0b25cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogR3JhcGhpY2FsVXNlckludGVyZmFjZTtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgZ2FtZUNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBjYW52YXNfbGlzdDogQXJyYXk8SFRNTENhbnZhc0VsZW1lbnQ+O1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc19saXN0ID0gbmV3IEFycmF5PEhUTUxDYW52YXNFbGVtZW50PigpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogR3JhcGhpY2FsVXNlckludGVyZmFjZSB7XHJcbiAgICAgICAgICAgIGlmICghR3JhcGhpY2FsVXNlckludGVyZmFjZS5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgR3JhcGhpY2FsVXNlckludGVyZmFjZS5pbnN0YW5jZSA9IG5ldyBHcmFwaGljYWxVc2VySW50ZXJmYWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEdyYXBoaWNhbFVzZXJJbnRlcmZhY2UuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkTWFpbkNhbnZhcygpOiB2b2lkIHtcclxuICAgICAgICAgICAgICAgIGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaWQgPSAnbWFpbkNhbnZhcyc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVDYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc19saXN0LnB1c2godGhpcy5nYW1lQ2FudmFzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRHYW1lQ2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtyZXR1cm4gdGhpcy5nYW1lQ2FudmFzfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFBvcnRhbEVuZ2luZSB7XHJcbiAgICBpbXBvcnQgZiA9IEZ1ZGdlQ29yZTtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBmLk5vZGUge1xyXG4gICAgICAgIHByaXZhdGUgcm90YXRvcjogZi5Ob2RlO1xyXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50Q2FtZXJhOiBmLkNvbXBvbmVudENhbWVyYTtcclxuICAgICAgICBwcml2YXRlIGNvbnRyb2xUcmFuc2xhdGlvblg6IGYuQ29udHJvbDtcclxuICAgICAgICBwcml2YXRlIGNvbnRyb2xUcmFuc2xhdGlvblk6IGYuQ29udHJvbDtcclxuICAgICAgICBwcml2YXRlIGNvbnRyb2xUcmFuc2xhdGlvblo6IGYuQ29udHJvbDtcclxuICAgICAgICBwcml2YXRlIGNvbnRyb2xSb3RhdGVZOiBmLkNvbnRyb2w7XHJcbiAgICAgICAgcHJpdmF0ZSBjb250cm9sUm90YXRlWDogZi5Db250cm9sO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoXCJQbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Q2FtZXJhID0gbmV3IGYuQ29tcG9uZW50Q2FtZXJhKCk7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRvciA9IG5ldyBmLk5vZGUoXCJyb3RhdG9yXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0b3IuYWRkQ29tcG9uZW50KG5ldyBmLkNvbXBvbmVudFRyYW5zZm9ybSgpKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnJvdGF0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0b3IuYWRkQ29tcG9uZW50KHRoaXMuY29tcG9uZW50Q2FtZXJhKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnQobmV3IGYuQ29tcG9uZW50VHJhbnNmb3JtKGYuTWF0cml4NHg0Lk1VTFRJUExJQ0FUSU9OKGYuTWF0cml4NHg0LlJPVEFUSU9OX1koMTgwKSwgZi5NYXRyaXg0eDQuVFJBTlNMQVRJT04obmV3IGYuVmVjdG9yMygwLDAuNSwwKSkpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFRyYW5zbGF0aW9uWCA9IG5ldyBmLkNvbnRyb2woXCJUcmFuc2xhdGlvblhcIiwgNywgZi5DT05UUk9MX1RZUEUuUFJPUE9SVElPTkFMKTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sVHJhbnNsYXRpb25ZID0gbmV3IGYuQ29udHJvbChcIlRyYW5zbGF0aW9uWVwiLCA1LCBmLkNPTlRST0xfVFlQRS5QUk9QT1JUSU9OQUwpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xUcmFuc2xhdGlvblogPSBuZXcgZi5Db250cm9sKFwiVHJhbnNsYXRpb25aXCIsIDcsIGYuQ09OVFJPTF9UWVBFLlBST1BPUlRJT05BTCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFJvdGF0ZVkgPSBuZXcgZi5Db250cm9sKFwiUm90YXRlWVwiLCAxNTAsIGYuQ09OVFJPTF9UWVBFLlBST1BPUlRJT05BTCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFJvdGF0ZVggPSBuZXcgZi5Db250cm9sKFwiUm90YXRlWFwiLCAxNTAsIGYuQ09OVFJPTF9UWVBFLlBST1BPUlRJT05BTCk7IFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbWVyYVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBkZWx0YVRpbWU6IG51bWJlciA9IGYuTG9vcC50aW1lRnJhbWVSZWFsIC8gMzAwMDtcclxuICAgICAgICAgICAgbGV0IHRyYW5zbGF0aW9uWDogbnVtYmVyID0gKFxyXG4gICAgICAgICAgICAgICAgZi5LZXlib2FyZC5tYXBUb1ZhbHVlKDEsIDAsIFtmLktFWUJPQVJEX0NPREUuQV0pXHJcbiAgICAgICAgICAgICAgICArIGYuS2V5Ym9hcmQubWFwVG9WYWx1ZSgtMSwgMCwgW2YuS0VZQk9BUkRfQ09ERS5EXSkpO1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRpb25ZOiBudW1iZXIgPSAoXHJcbiAgICAgICAgICAgICAgICBmLktleWJvYXJkLm1hcFRvVmFsdWUoMSwgMCwgW2YuS0VZQk9BUkRfQ09ERS5TUEFDRV0pXHJcbiAgICAgICAgICAgICAgICArIGYuS2V5Ym9hcmQubWFwVG9WYWx1ZSgtMSwgMCwgW2YuS0VZQk9BUkRfQ09ERS5TSElGVF9MRUZUXSkpO1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRpb25aOiBudW1iZXIgPSAoXHJcbiAgICAgICAgICAgICAgICBmLktleWJvYXJkLm1hcFRvVmFsdWUoMSwgMCwgW2YuS0VZQk9BUkRfQ09ERS5XXSlcclxuICAgICAgICAgICAgICAgICsgZi5LZXlib2FyZC5tYXBUb1ZhbHVlKC0xLCAwLCBbZi5LRVlCT0FSRF9DT0RFLlNdKSk7XHJcbiAgICAgICAgICAgIGxldCByb3RhdGVZOiBudW1iZXIgPSAoXHJcbiAgICAgICAgICAgICAgICBmLktleWJvYXJkLm1hcFRvVmFsdWUoMSwgMCwgW2YuS0VZQk9BUkRfQ09ERS5BUlJPV19MRUZUXSlcclxuICAgICAgICAgICAgICAgICsgZi5LZXlib2FyZC5tYXBUb1ZhbHVlKC0xLCAwLCBbZi5LRVlCT0FSRF9DT0RFLkFSUk9XX1JJR0hUXSkpO1xyXG4gICAgICAgICAgICBsZXQgcm90YXRlWDogbnVtYmVyID0gKFxyXG4gICAgICAgICAgICAgICAgZi5LZXlib2FyZC5tYXBUb1ZhbHVlKDEsIDAsIFtmLktFWUJPQVJEX0NPREUuQVJST1dfRE9XTl0pXHJcbiAgICAgICAgICAgICAgICArIGYuS2V5Ym9hcmQubWFwVG9WYWx1ZSgtMSwgMCwgW2YuS0VZQk9BUkRfQ09ERS5BUlJPV19VUF0pKTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sVHJhbnNsYXRpb25YLnNldElucHV0KHRyYW5zbGF0aW9uWCAqIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFRyYW5zbGF0aW9uWS5zZXRJbnB1dCh0cmFuc2xhdGlvblkgKiBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xUcmFuc2xhdGlvblouc2V0SW5wdXQodHJhbnNsYXRpb25aICogZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sUm90YXRlWS5zZXRJbnB1dChyb3RhdGVZICogZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sUm90YXRlWC5zZXRJbnB1dChyb3RhdGVYICogZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5tdHhMb2NhbC50cmFuc2xhdGVYKHRoaXMuY29udHJvbFRyYW5zbGF0aW9uWC5nZXRPdXRwdXQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMubXR4TG9jYWwudHJhbnNsYXRlWSh0aGlzLmNvbnRyb2xUcmFuc2xhdGlvblkuZ2V0T3V0cHV0KCkpO1xyXG4gICAgICAgICAgICB0aGlzLm10eExvY2FsLnRyYW5zbGF0ZVoodGhpcy5jb250cm9sVHJhbnNsYXRpb25aLmdldE91dHB1dCgpKTtcclxuICAgICAgICAgICAgdGhpcy5tdHhMb2NhbC5yb3RhdGVZKHRoaXMuY29udHJvbFJvdGF0ZVkuZ2V0T3V0cHV0KCkpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0b3IubXR4TG9jYWwucm90YXRlWCh0aGlzLmNvbnRyb2xSb3RhdGVYLmdldE91dHB1dCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDYW1lcmEoKTogZi5Db21wb25lbnRDYW1lcmEge3JldHVybiB0aGlzLmNvbXBvbmVudENhbWVyYTt9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgUG9ydGFsRW5naW5lIHtcclxuICAgIGltcG9ydCBmID0gRnVkZ2VDb3JlO1xyXG4gICAgZXhwb3J0IGNsYXNzIFBvcnRhbCBleHRlbmRzIGYuTm9kZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0ZWRQb3J0YWw6IFBvcnRhbDtcclxuICAgICAgICBwcml2YXRlIHZpZXdwb3J0UG9ydGFsOiBmLlZpZXdwb3J0O1xyXG4gICAgICAgIHByaXZhdGUgdGV4dHVyZVBvcnRhbDogZi5UZXh0dXJlQ2FudmFzO1xyXG4gICAgICAgIHByaXZhdGUgY2FtZXJhUG9ydGFsOiBjdXN0b21DYW1lcmE7XHJcbiAgICAgICAgcHJpdmF0ZSBjYW1lcmE6IGYuQ29tcG9uZW50Q2FtZXJhO1xyXG4gICAgICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgc2NlbmVHcmFwaDogZi5HcmFwaDtcclxuXHJcbiAgICAgICAgcHVibGljIGluaXQoc2NlbmVHcmFwaDogZi5HcmFwaCwgY2FtZXJhOiBmLkNvbXBvbmVudENhbWVyYSwgdHJhbnNsYXRpb246IGYuVmVjdG9yMywgcm90YXRpb246IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUdyYXBoID0gc2NlbmVHcmFwaDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpZHRoID0gNDAwO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudChuZXcgZi5Db21wb25lbnRNZXNoKG5ldyBmLk1lc2hRdWFkKCkpKTsgXHJcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbDogZi5NYXRlcmlhbCA9IG5ldyBmLk1hdGVyaWFsKFwibXRyVGV4dHVyZVwiLCBmLlNoYWRlckZsYXQsIG5ldyBmLkNvYXRUZXh0dXJlZChuZXcgZi5Db2xvcigxLDAuMiwwLjgsMSkpKTtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudE1hdGVyaWFsID0gbmV3IGYuQ29tcG9uZW50TWF0ZXJpYWwobWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudChjb21wb25lbnRNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KG5ldyBmLkNvbXBvbmVudFRyYW5zZm9ybSgpKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0UG9zaXRpb24odHJhbnNsYXRpb24sIG5ldyBmLlZlY3RvcjMoMCxyb3RhdGlvbiwwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQobmV3IEZyYW1lKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBvcnRhbCBpbml0aWFsaXNhdGlvbiBmaW5pc2hlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0UG9zaXRpb24odHJhbnNsYXRpb246IGYuVmVjdG9yMywgcm90YXRpb246IGYuVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm10eExvY2FsLnJvdGF0ZShyb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMubXR4TG9jYWwudHJhbnNsYXRlKHRyYW5zbGF0aW9uLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdChwb3J0YWxGb3JDb25uZWN0aW9uOiBQb3J0YWwpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0V2l0aFBvcnRhbChwb3J0YWxGb3JDb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgcG9ydGFsRm9yQ29ubmVjdGlvbi5jb25uZWN0V2l0aFBvcnRhbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmFQb3J0YWwuaW5pdChwb3J0YWxGb3JDb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgcG9ydGFsRm9yQ29ubmVjdGlvbi5jYW1lcmFQb3J0YWwuaW5pdCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdFdpdGhQb3J0YWwocG9ydGFsRm9yQ29ubmVjdGlvbjogUG9ydGFsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vc2V0dXAgcG9ydGFsIE1hdGVyaWFsXHJcbiAgICAgICAgICAgIGxldCBjcmMyUG9ydGFsOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgY3JjMlBvcnRhbC5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgICAgICBjcmMyUG9ydGFsLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodFxyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVQb3J0YWwgPSBuZXcgZi5UZXh0dXJlQ2FudmFzKFwiUG9ydGFsXCIsIGNyYzJQb3J0YWwpO1xyXG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWxQb3J0YWw6IGYuTWF0ZXJpYWwgPSBuZXcgZi5NYXRlcmlhbChcIlBvcnRhbFwiLCBQb3J0YWxTaGFkZXIsIG5ldyBmLkNvYXRUZXh0dXJlZChudWxsLCB0aGlzLnRleHR1cmVQb3J0YWwpKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoZi5Db21wb25lbnRNYXRlcmlhbCkubWF0ZXJpYWwgPSBtYXRlcmlhbFBvcnRhbDtcclxuICAgICAgICAgICAgLy9zZXR1cCBQb3J0YWwgQ2FtZXJhXHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhUG9ydGFsID0gbmV3IGN1c3RvbUNhbWVyYSgpO1xyXG4gICAgICAgICAgICBsZXQgcG9ydGFsQ2FtZXJhTW91bnQ6IGYuTm9kZSA9IG5ldyBmLk5vZGUoXCJwb3J0YWwgY2FtZXJhIG1vdW50XCIpO1xyXG4gICAgICAgICAgICBwb3J0YWxDYW1lcmFNb3VudC5hZGRDb21wb25lbnQodGhpcy5jYW1lcmFQb3J0YWwpO1xyXG4gICAgICAgICAgICBwb3J0YWxDYW1lcmFNb3VudC5hZGRDb21wb25lbnQobmV3IGYuQ29tcG9uZW50VHJhbnNmb3JtKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lR3JhcGguYXBwZW5kQ2hpbGQocG9ydGFsQ2FtZXJhTW91bnQpO1xyXG4gICAgICAgICAgICAvL3NldHVwIENhbnZhcyB0byBSZW5kZXIgdG9cclxuICAgICAgICAgICAgbGV0IGNhbnZhc1BvcnRhbDogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhc1BvcnRhbCk7XHJcbiAgICAgICAgICAgIGNhbnZhc1BvcnRhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgY2FudmFzUG9ydGFsLndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgICAgICAgY2FudmFzUG9ydGFsLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgICAgICAvL3NldHVwIHBvcnRhbCB2aWV3cG9ydFxyXG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0UG9ydGFsID0gbmV3IGYuVmlld3BvcnQoKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3cG9ydFBvcnRhbC5pbml0aWFsaXplKFwiVGVzdFZpZXdwb3J0XCIsIHRoaXMuc2NlbmVHcmFwaCwgdGhpcy5jYW1lcmFQb3J0YWwsIGNhbnZhc1BvcnRhbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkUG9ydGFsID0gcG9ydGFsRm9yQ29ubmVjdGlvbjsgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbm5lY3RlZFBvcnRhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3J0YWxDYW1lcmEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnRQb3J0YWwuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSB0aGlzLnZpZXdwb3J0UG9ydGFsLmdldENhbnZhcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlUG9ydGFsLmNyYzIuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAwLCAwLCB0aGlzLnRleHR1cmVQb3J0YWwuY3JjMi5jYW52YXMud2lkdGgsIHRoaXMudGV4dHVyZVBvcnRhbC5jcmMyLmNhbnZhcy5oZWlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVQb3J0YWwucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVBvcnRhbENhbWVyYSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9zZXQgdHJhbnNsYXRpb24gb2YgY2FtZXJhXHJcbiAgICAgICAgICAgIGxldCBjYW1lcmFUX3dvcmxkU3BhY2U6IGYuTWF0cml4NHg0ID0gdGhpcy5jYW1lcmEubm9kZS5tdHhXb3JsZC5jbG9uZTtcclxuICAgICAgICAgICAgbGV0IGluUG9ydGFsX3dvcmxkU3BhY2U6IGYuTWF0cml4NHg0ID0gdGhpcy5tdHhXb3JsZC5jbG9uZTtcclxuICAgICAgICAgICAgbGV0IG91dFBvcnRhbF93b3JsZFNwYWNlOiBmLk1hdHJpeDR4NCAgPSB0aGlzLmNvbm5lY3RlZFBvcnRhbC5tdHhXb3JsZC5jbG9uZTtcclxuICAgICAgICAgICAgbGV0IGluUG9ydGFsVF93b3JsZFNwYWNlX2ludmVyc2U6IGYuTWF0cml4NHg0ID0gZi5NYXRyaXg0eDQuSU5WRVJTSU9OKGluUG9ydGFsX3dvcmxkU3BhY2UpO1xyXG4gICAgICAgICAgICBsZXQgY2FtZXJhVF9pblBvcnRhbFNwYWNlID0gZi5NYXRyaXg0eDQuTVVMVElQTElDQVRJT04oaW5Qb3J0YWxUX3dvcmxkU3BhY2VfaW52ZXJzZSwgY2FtZXJhVF93b3JsZFNwYWNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCByZWxhdGl2ZVBvc2l0aW9uOiBmLlZlY3RvcjMgPSBjYW1lcmFUX2luUG9ydGFsU3BhY2UudHJhbnNsYXRpb247XHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24udHJhbnNmb3JtKGYuTWF0cml4NHg0LlJPVEFUSU9OX1koMTgwKSk7XHJcbiAgICAgICAgICAgIHJlbGF0aXZlUG9zaXRpb24udHJhbnNmb3JtKG91dFBvcnRhbF93b3JsZFNwYWNlKTtcclxuICAgICAgICAgICAgLy9zZXQgcm90YXRpb24gb2YgY2FtZXJhXHJcbiAgICAgICAgICAgIGxldCByZWxhdGl2ZVJvdGF0aW9uOiBmLlZlY3RvcjMgPSBjYW1lcmFUX2luUG9ydGFsU3BhY2Uucm90YXRpb247XHJcbiAgICAgICAgICAgIHJlbGF0aXZlUm90YXRpb24uYWRkKG5ldyBmLlZlY3RvcjMoMCwxODAsMCkpO1xyXG4gICAgICAgICAgICByZWxhdGl2ZVJvdGF0aW9uLmFkZChvdXRQb3J0YWxfd29ybGRTcGFjZS5yb3RhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gbmV3IGYuTWF0cml4NHg0KCk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS50cmFuc2xhdGUocmVsYXRpdmVQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5yb3RhdGUocmVsYXRpdmVSb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhUG9ydGFsLm5vZGUuY21wVHJhbnNmb3JtLm10eExvY2FsLnNldCh0cmFuc2Zvcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBQb3J0YWxFbmdpbmUge1xyXG4gICAgaW1wb3J0IGYgPSBGdWRnZUNvcmU7XHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmUge1xyXG5cclxuICAgICAgICBwcml2YXRlIHNjZW5lR3JhcGg6IGYuR3JhcGg7XHJcbiAgICAgICAgcHJpdmF0ZSBwbGF5ZXI6IFBsYXllcjtcclxuICAgICAgICBwcml2YXRlIHBvcnRhbF9saXN0OiBBcnJheTxQb3J0YWw+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3J0YWxfbGlzdCA9IG5ldyBBcnJheTxQb3J0YWw+KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcigpXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVHcmFwaCA9IG5ldyBmLkdyYXBoKFwiU2NlbmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEdyYXBoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBnZXRTY2VuZUdyYXBoKCk6IGYuR3JhcGgge3JldHVybiB0aGlzLnNjZW5lR3JhcGg7fVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0UGxheWVyKCk6IFBsYXllciB7cmV0dXJuIHRoaXMucGxheWVyO31cclxuXHJcbiAgICAgICAgcHVibGljIGdldFBvcnRhbHMoKTogQXJyYXk8UG9ydGFsPiB7cmV0dXJuIHRoaXMucG9ydGFsX2xpc3Q7fVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRHcmFwaCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUdyYXBoLmFwcGVuZENoaWxkKHRoaXMucGxheWVyKTtcclxuICAgICAgICAgICAgbGV0IG1lc2hDdWJlOiBmLk1lc2hDdWJlID0gbmV3IGYuTWVzaEN1YmUoXCJtZXNoQ3ViZVwiKTtcclxuICAgICAgICAgICAgbGV0IG1lc2hRdWFkOiBmLk1lc2hRdWFkID0gbmV3IGYuTWVzaFF1YWQoXCJtZXNoUXVhZFwiKTtcclxuICAgICAgICAgICAgbGV0IG1lc2hTcGhlcmU6IGYuTWVzaFNwaGVyZSA9IG5ldyBmLk1lc2hTcGhlcmUoXCJtZXNoU3BoZXJlXCIsIDgsIDgpO1xyXG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWxRdWFkOiBmLk1hdGVyaWFsID0gbmV3IGYuTWF0ZXJpYWwoXCJtYXRlcmlhbEZsYXRcIiwgZi5TaGFkZXJGbGF0LCBuZXcgZi5Db2F0Q29sb3JlZChuZXcgZi5Db2xvcigwLjI5ODAzOTIxNTY4NjI3NDUsIDAuNDQzMTM3MjU0OTAxOTYwNzYsIDAuMjE5NjA3ODQzMTM3MjU0OSwgMSkpKTtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsU3BoZXJlOiBmLk1hdGVyaWFsID0gbmV3IGYuTWF0ZXJpYWwoXCJtYXRlcmlhbEZsYXRcIiwgZi5TaGFkZXJGbGF0LCBuZXcgZi5Db2F0Q29sb3JlZChuZXcgZi5Db2xvcigxLDAuMiwwLjEsMSkpKTtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudExpZ2h0QW1iaWFudDogZi5Db21wb25lbnRMaWdodCA9IG5ldyBmLkNvbXBvbmVudExpZ2h0KG5ldyBmLkxpZ2h0QW1iaWVudChuZXcgZi5Db2xvcigwLjMsIDAuMywgMC4zLCAxKSkpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TGlnaHREaXJlY3Rpb25hbDogZi5Db21wb25lbnRMaWdodCA9IG5ldyBmLkNvbXBvbmVudExpZ2h0KG5ldyBmLkxpZ2h0RGlyZWN0aW9uYWwobmV3IGYuQ29sb3IoMSwgMSwgMSwgMSkpKTtcclxuICAgICAgICAgICAgY29tcG9uZW50TGlnaHREaXJlY3Rpb25hbC5tdHhQaXZvdC5yb3RhdGVYKDEyMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVHcmFwaC5hZGRDb21wb25lbnQoY29tcG9uZW50TGlnaHRBbWJpYW50KTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUdyYXBoLmFkZENvbXBvbmVudChjb21wb25lbnRMaWdodERpcmVjdGlvbmFsKTtcclxuICAgICAgICAgICAgbGV0IGZsb29yOiBmLk5vZGUgPSBuZXcgZi5Ob2RlKFwiRmxvb3JcIik7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRNZXNoUXVhZDogZi5Db21wb25lbnRNZXNoID0gbmV3IGYuQ29tcG9uZW50TWVzaChtZXNoUXVhZCk7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRNYXRlcmlhbFF1YWQ6IGYuQ29tcG9uZW50TWF0ZXJpYWwgPSBuZXcgZi5Db21wb25lbnRNYXRlcmlhbChtYXRlcmlhbFF1YWQpO1xyXG4gICAgICAgICAgICBjb21wb25lbnRNZXNoUXVhZC5tdHhQaXZvdC5yb3RhdGVYKC05MCk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudE1lc2hRdWFkLm10eFBpdm90LnNjYWxlWCgyMCk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudE1lc2hRdWFkLm10eFBpdm90LnNjYWxlWSgyMCk7XHJcbiAgICAgICAgICAgIGZsb29yLmFkZENvbXBvbmVudChjb21wb25lbnRNZXNoUXVhZCk7XHJcbiAgICAgICAgICAgIGZsb29yLmFkZENvbXBvbmVudChjb21wb25lbnRNYXRlcmlhbFF1YWQpO1xyXG4gICAgICAgICAgICBsZXQgc3BoZXJlOiBmLk5vZGUgPSBuZXcgZi5Ob2RlKFwiU3BoZXJlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TWVzaFNwaGVyZTogZi5Db21wb25lbnRNZXNoID0gbmV3IGYuQ29tcG9uZW50TWVzaChtZXNoU3BoZXJlKTtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFRyYW5zZm9ybVNwaGVyZTogZi5Db21wb25lbnRUcmFuc2Zvcm0gPSBuZXcgZi5Db21wb25lbnRUcmFuc2Zvcm0oZi5NYXRyaXg0eDQuVFJBTlNMQVRJT04obmV3IGYuVmVjdG9yMygwLDEsMCkpKTtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudE1hdGVyaWFsU3BoZXJlOiBmLkNvbXBvbmVudE1hdGVyaWFsID0gbmV3IGYuQ29tcG9uZW50TWF0ZXJpYWwobWF0ZXJpYWxTcGhlcmUpO1xyXG4gICAgICAgICAgICBjb21wb25lbnRNZXNoU3BoZXJlLm10eFBpdm90LnNjYWxlKG5ldyBmLlZlY3RvcjMoMC41LDAuNSwwLjUpKTtcclxuICAgICAgICAgICAgc3BoZXJlLmFkZENvbXBvbmVudChjb21wb25lbnRUcmFuc2Zvcm1TcGhlcmUpO1xyXG4gICAgICAgICAgICBzcGhlcmUuYWRkQ29tcG9uZW50KGNvbXBvbmVudE1lc2hTcGhlcmUpO1xyXG4gICAgICAgICAgICBzcGhlcmUuYWRkQ29tcG9uZW50KGNvbXBvbmVudE1hdGVyaWFsU3BoZXJlKTtcclxuICAgICAgICAgICAgbGV0IGN1YmU6IGYuTm9kZSA9IG5ldyBmLk5vZGUoXCJjdWJlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TWVzaEN1YmU6IGYuQ29tcG9uZW50TWVzaCA9IG5ldyBmLkNvbXBvbmVudE1lc2gobWVzaEN1YmUpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50VHJhbnNmb3JtQ3ViZTogZi5Db21wb25lbnRUcmFuc2Zvcm0gPSBuZXcgZi5Db21wb25lbnRUcmFuc2Zvcm0oZi5NYXRyaXg0eDQuVFJBTlNMQVRJT04obmV3IGYuVmVjdG9yMygtNC4xLDAuNSwwKSkpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TWF0ZXJpYWxDdWJlOiBmLkNvbXBvbmVudE1hdGVyaWFsID0gbmV3IGYuQ29tcG9uZW50TWF0ZXJpYWwobWF0ZXJpYWxTcGhlcmUpO1xyXG4gICAgICAgICAgICBjdWJlLmFkZENvbXBvbmVudChjb21wb25lbnRUcmFuc2Zvcm1DdWJlKTtcclxuICAgICAgICAgICAgY3ViZS5hZGRDb21wb25lbnQoY29tcG9uZW50TWVzaEN1YmUpO1xyXG4gICAgICAgICAgICBjdWJlLmFkZENvbXBvbmVudChjb21wb25lbnRNYXRlcmlhbEN1YmUpOyBcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUdyYXBoLmFwcGVuZENoaWxkKGZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUdyYXBoLmFwcGVuZENoaWxkKHNwaGVyZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVHcmFwaC5hcHBlbmRDaGlsZChjdWJlKTsgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnBvcnRhbF9saXN0LnB1c2gobmV3IFBvcnRhbChcInBvcnRhbDFcIikpO1xyXG4gICAgICAgICAgICB0aGlzLnBvcnRhbF9saXN0WzBdLmluaXQodGhpcy5zY2VuZUdyYXBoLCB0aGlzLnBsYXllci5nZXRDYW1lcmEoKSwgbmV3IGYuVmVjdG9yMygtMywwLjQ5LDApLCA5MCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVHcmFwaC5hZGRDaGlsZCh0aGlzLnBvcnRhbF9saXN0WzBdKTtcclxuICAgICAgICAgICAgdGhpcy5wb3J0YWxfbGlzdC5wdXNoKG5ldyBQb3J0YWwoXCJwb3J0YWwyXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5wb3J0YWxfbGlzdFsxXS5pbml0KHRoaXMuc2NlbmVHcmFwaCwgdGhpcy5wbGF5ZXIuZ2V0Q2FtZXJhKCksIG5ldyBmLlZlY3RvcjMoMCwwLjQ5LC00KSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVHcmFwaC5hZGRDaGlsZCh0aGlzLnBvcnRhbF9saXN0WzFdKTtcclxuICAgICAgICAgICAgdGhpcy5wb3J0YWxfbGlzdFswXS5jb25uZWN0KHRoaXMucG9ydGFsX2xpc3RbMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFBvcnRhbEVuZ2luZSB7XHJcbiAgICBpbXBvcnQgxpIgPSBGdWRnZUNvcmU7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIGN1c3RvbUNhbWVyYSBleHRlbmRzIMaSLkNvbXBvbmVudENhbWVyYSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcG9ydGFsOiBQb3J0YWw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0KHBvcnRhbDogUG9ydGFsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucG9ydGFsID0gcG9ydGFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHByb2plY3RDZW50cmFsKF9hc3BlY3Q6IG51bWJlciA9IHRoaXMuYXNwZWN0UmF0aW8sIF9maWVsZE9mVmlldzogbnVtYmVyID0gdGhpcy5maWVsZE9mVmlldywgX2RpcmVjdGlvbjogZi5GSUVMRF9PRl9WSUVXID0gdGhpcy5kaXJlY3Rpb24sIF9uZWFyOiBudW1iZXIgPSAxLCBfZmFyOiBudW1iZXIgPSAyMDAwKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLnByb2plY3RDZW50cmFsKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2FtZXJhVF93b3JsZFNwYWNlOiBmLk1hdHJpeDR4NCA9IHRoaXMubm9kZS5tdHhXb3JsZC5jbG9uZTtcclxuICAgICAgICAgICAgbGV0IHBvcnRhbFRfd29ybGRTcGFjZTogZi5NYXRyaXg0eDQgPSB0aGlzLnBvcnRhbC5tdHhXb3JsZC5jbG9uZTtcclxuICAgICAgICAgICAgbGV0IGludmVyc2VDYW1lcmFUX3dvcmxkU3BhY2UgPSBmLk1hdHJpeDR4NC5JTlZFUlNJT04oY2FtZXJhVF93b3JsZFNwYWNlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwb3J0YWxOb3JtYWw6IGYuVmVjdG9yMyA9IG5ldyBmLlZlY3RvcjMoMCwwLDEpO1xyXG4gICAgICAgICAgICBwb3J0YWxOb3JtYWwudHJhbnNmb3JtKHBvcnRhbFRfd29ybGRTcGFjZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHBvcnRhbE5vcm1hbC50cmFuc2Zvcm0oaW52ZXJzZUNhbWVyYVRfd29ybGRTcGFjZSk7XHJcbiAgICAgICAgICAgIGxldCBwb3J0YWxQb3NpdGlvbjogZi5WZWN0b3IzID0gbmV3IGYuVmVjdG9yMygwLDAsMCk7XHJcbiAgICAgICAgICAgIHBvcnRhbFBvc2l0aW9uLnRyYW5zZm9ybShwb3J0YWxUX3dvcmxkU3BhY2UsIHRydWUpO1xyXG4gICAgICAgICAgICBwb3J0YWxQb3NpdGlvbi50cmFuc2Zvcm0oaW52ZXJzZUNhbWVyYVRfd29ybGRTcGFjZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBvcnRhbCBQb3NpdGlvblwiLCBwb3J0YWxQb3NpdGlvbi54LCBwb3J0YWxQb3NpdGlvbi55LCBwb3J0YWxQb3NpdGlvbi56KVxyXG4gICAgICAgICAgICBwb3J0YWxOb3JtYWwgPSBmLlZlY3RvcjMuRElGRkVSRU5DRShwb3J0YWxOb3JtYWwscG9ydGFsUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vcm1hbCBWZWN0b3JcIiwgcG9ydGFsTm9ybWFsLngsIHBvcnRhbE5vcm1hbC55LCBwb3J0YWxOb3JtYWwueilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vLy9QYXJhbXRlciBtw7ZnbGljaGVyd2Vpc2Ugc3Vib3B0aW1hbCB1bmQgbXVzcyBhbmdlcGFzc3Qgd2VyZGVuXHJcbiAgICAgICAgICAgIGxldCBleHRyYWNsaXA6IG51bWJlciA9IDAuMjU7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpcE9ibGlxdWVDUChmLlZlY3RvcjMuRElGRkVSRU5DRShwb3J0YWxQb3NpdGlvbiwgZi5WZWN0b3IzLlNDQUxFKHBvcnRhbE5vcm1hbCwgZXh0cmFjbGlwKSksIHBvcnRhbE5vcm1hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xpcE9ibGlxdWUoY2xpcFBvaW50OiBmLlZlY3RvcjMsIGNsaXBOb3JtYWw6IGYuVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZ24oYTogbnVtYmVyKTogbnVtYmVye1xyXG4gICAgICAgICAgICAgICAgaWYgKGEgPiAwKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIGlmIChhIDwgMCkgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtYXRyaXg6IEZsb2F0MzJBcnJheSA9IHRoaXMubXR4UHJvamVjdGlvbi5nZXQoKTtcclxuICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjbGlwUGxhbmVYOiBudW1iZXIgPSBjbGlwTm9ybWFsLng7XHJcbiAgICAgICAgICAgIGxldCBjbGlwUGxhbmVZOiBudW1iZXIgPSBjbGlwTm9ybWFsLnk7XHJcbiAgICAgICAgICAgIGxldCBjbGlwUGxhbmVaOiBudW1iZXIgPSBjbGlwTm9ybWFsLno7XHJcbiAgICAgICAgICAgIGxldCBjbGlwUGxhbmVXOiBudW1iZXIgPSBmLlZlY3RvcjMuRE9UKGYuVmVjdG9yMy5TQ0FMRShjbGlwTm9ybWFsLCAtMSksIGNsaXBQb2ludCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInc6XCIsIGNsaXBQbGFuZVcpO1xyXG4gICAgICBcclxuICAgICAgICAgICAgbGV0IHFYOiBudW1iZXIgPSAoc2duKGNsaXBQbGFuZVgpICsgbWF0cml4WzhdKSAvIG1hdHJpeFswXTtcclxuICAgICAgICAgICAgbGV0IHFZOiBudW1iZXIgPSAoc2duKGNsaXBQbGFuZVkpICsgbWF0cml4WzldKSAvIG1hdHJpeFs1XTtcclxuICAgICAgICAgICAgbGV0IHFaOiBudW1iZXIgPSAtMTtcclxuICAgICAgICAgICAgbGV0IHFXOiBudW1iZXIgPSAoMSArIG1hdHJpeFsxMF0pIC8gbWF0cml4WzE0XTtcclxuICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzY2FsYXI6IG51bWJlciA9IDIgLyAoY2xpcFBsYW5lWCAqIHFYICsgY2xpcFBsYW5lWSAqIHFZICsgY2xpcFBsYW5lWiAqIHFaICsgY2xpcFBsYW5lVyAqIHFXKTsgXHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgICAgICAgICAgbGV0IGNYOiBudW1iZXIgPSBjbGlwUGxhbmVYICogc2NhbGFyO1xyXG4gICAgICAgICAgICBsZXQgY1k6IG51bWJlciA9IGNsaXBQbGFuZVkgKiBzY2FsYXI7XHJcbiAgICAgICAgICAgIGxldCBjWjogbnVtYmVyID0gY2xpcFBsYW5lWiAqIHNjYWxhcjtcclxuICAgICAgICAgICAgbGV0IGNXOiBudW1iZXIgPSBjbGlwUGxhbmVXICogc2NhbGFyO1xyXG4gICAgICBcclxuICAgICAgICAgICAgbWF0cml4WzJdID0gY1g7XHJcbiAgICAgICAgICAgIG1hdHJpeFs2XSA9IGNZO1xyXG4gICAgICAgICAgICBtYXRyaXhbMTBdID0gY1ogKyAxO1xyXG4gICAgICAgICAgICBtYXRyaXhbMTRdID0gY1c7XHJcbiAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm10eFByb2plY3Rpb24uc2V0KG1hdHJpeCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcHVibGljIGNsaXBPYmxpcXVlQ1AoY2xpcFBvaW50OiBmLlZlY3RvcjMsIGNsaXBOb3JtYWw6IGYuVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdGlvbjogRmxvYXQzMkFycmF5ID0gdGhpcy5tdHhQcm9qZWN0aW9uLmdldCgpO1xyXG4gICAgICBcclxuICAgICAgICAgICAgbGV0IGNsaXBQbGFuZVg6IG51bWJlciA9IGNsaXBOb3JtYWwueDtcclxuICAgICAgICAgICAgbGV0IGNsaXBQbGFuZVk6IG51bWJlciA9IGNsaXBOb3JtYWwueTtcclxuICAgICAgICAgICAgbGV0IGNsaXBQbGFuZVo6IG51bWJlciA9IGNsaXBOb3JtYWwuejtcclxuICAgICAgICAgICAgbGV0IGNsaXBQbGFuZVc6IG51bWJlciA9IGYuVmVjdG9yMy5ET1QoZi5WZWN0b3IzLlNDQUxFKGNsaXBOb3JtYWwsIC0xKSwgY2xpcFBvaW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidzpcIiwgY2xpcFBsYW5lVyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWF0cml4OiBGbG9hdDMyQXJyYXkgPSBmLk1hdHJpeDR4NC5JTlZFUlNJT04odGhpcy5tdHhQcm9qZWN0aW9uLmNsb25lKS5nZXQoKTtcclxuICAgICAgICAgICAgbGV0IHZYOiBudW1iZXIgPSAoY2xpcFBsYW5lWCA8IDAuMCkgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGxldCB2WTogbnVtYmVyID0gKGNsaXBQbGFuZVkgPCAwLjApID8gMSA6IC0xO1xyXG4gICAgICAgICAgICBsZXQgdlo6IG51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGxldCB2VzogbnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgICAgIGxldCBxWDogbnVtYmVyID0gbWF0cml4WzBdICogdlggKyBtYXRyaXhbNF0gKiB2WSArIG1hdHJpeFs4XSAqIHZaICsgbWF0cml4WzEyXSAqIHZXO1xyXG4gICAgICAgICAgICBsZXQgcVk6IG51bWJlciA9IG1hdHJpeFsxXSAqIHZYICsgbWF0cml4WzVdICogdlkgKyBtYXRyaXhbOV0gKiB2WiArIG1hdHJpeFsxM10gKiB2VztcclxuICAgICAgICAgICAgbGV0IHFaOiBudW1iZXIgPSBtYXRyaXhbMl0gKiB2WCArIG1hdHJpeFs2XSAqIHZZICsgbWF0cml4WzEwXSAqIHZaICsgbWF0cml4WzE0XSAqIHZXO1xyXG4gICAgICAgICAgICBsZXQgcVc6IG51bWJlciA9IG1hdHJpeFszXSAqIHZYICsgbWF0cml4WzddICogdlkgKyBtYXRyaXhbMTFdICogdlogKyBtYXRyaXhbMTVdICogdlc7XHJcbiAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2NhbGFyOiBudW1iZXIgPSAyIC8gKGNsaXBQbGFuZVggKiBxWCArIGNsaXBQbGFuZVkgKiBxWSArIGNsaXBQbGFuZVogKiBxWiArIGNsaXBQbGFuZVcgKiBxVyk7IFxyXG4gICAgICBcclxuICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjWDogbnVtYmVyID0gY2xpcFBsYW5lWCAqIHNjYWxhcjtcclxuICAgICAgICAgICAgbGV0IGNZOiBudW1iZXIgPSBjbGlwUGxhbmVZICogc2NhbGFyO1xyXG4gICAgICAgICAgICBsZXQgY1o6IG51bWJlciA9IGNsaXBQbGFuZVogKiBzY2FsYXI7XHJcbiAgICAgICAgICAgIGxldCBjVzogbnVtYmVyID0gY2xpcFBsYW5lVyAqIHNjYWxhcjtcclxuICAgICAgXHJcbiAgICAgICAgICAgIHByb2plY3Rpb25bMl0gPSBjWCAtIHByb2plY3Rpb25bM107XHJcbiAgICAgICAgICAgIHByb2plY3Rpb25bNl0gPSBjWSAtIHByb2plY3Rpb25bN107XHJcbiAgICAgICAgICAgIHByb2plY3Rpb25bMTBdID0gY1ogLSBwcm9qZWN0aW9uWzExXTtcclxuICAgICAgICAgICAgcHJvamVjdGlvblsxNF0gPSBjVyAtIHByb2plY3Rpb25bMTVdO1xyXG4gICAgICBcclxuICAgICAgICAgICAgdGhpcy5tdHhQcm9qZWN0aW9uLnNldChwcm9qZWN0aW9uKTtcclxuICAgICAgICAgIH1cclxuICAgIH0gIFxyXG59IiwibmFtZXNwYWNlIFBvcnRhbEVuZ2luZSB7XHJcbiAgICBpbXBvcnQgxpIgPSBGdWRnZUNvcmU7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIGN1c3RvbVZpZXdwb3J0IGV4dGVuZHMgxpIuVmlld3BvcnQge1xyXG4gICAgICAgIHByaXZhdGUgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgICAgIHByaXZhdGUgcG9ydGFsX2xpc3Q6IEFycmF5PFBvcnRhbD47XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGRyYXcoX2NhbGN1bGF0ZVRyYW5zZm9ybXM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRCcmFuY2goKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgxpIuUmVuZGVyLnJlc2V0RnJhbWVCdWZmZXIoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbWVyYS5pc0FjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWRqdXN0aW5nRnJhbWVzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RGcmFtZXMoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWRqdXN0aW5nQ2FtZXJhKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYW1lcmEoKTtcclxuICAgICAgICAgICAgaWYgKF9jYWxjdWxhdGVUcmFuc2Zvcm1zKVxyXG4gICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlVHJhbnNmb3JtcygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wb3J0YWxfbGlzdC5mb3JFYWNoKHBvcnRhbCA9PiBwb3J0YWwudXBkYXRlKCkpO1xyXG4gICAgICAgICAgICDGki5SZW5kZXIuY2xlYXIodGhpcy5jYW1lcmEuY2xyQmFja2dyb3VuZCk7XHJcbiAgICAgICAgICAgIMaSLlJlbmRlci5kcmF3KHRoaXMuY2FtZXJhKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgxpIuUmVuZGVyLmdldENhbnZhcygpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN0U291cmNlLngsIHRoaXMucmVjdFNvdXJjZS55LCB0aGlzLnJlY3RTb3VyY2Uud2lkdGgsIHRoaXMucmVjdFNvdXJjZS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3REZXN0aW5hdGlvbi54LCB0aGlzLnJlY3REZXN0aW5hdGlvbi55LCB0aGlzLnJlY3REZXN0aW5hdGlvbi53aWR0aCwgdGhpcy5yZWN0RGVzdGluYXRpb24uaGVpZ2h0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FudmFzKCkuZ2V0Q29udGV4dChcIjJkXCIpLmRyYXdJbWFnZSh0aGlzLmNvbnRleHQuY2FudmFzLCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKF9uYW1lOiBzdHJpbmcsIF9icmFuY2g6IMaSLk5vZGUsIF9jYW1lcmE6IMaSLkNvbXBvbmVudENhbWVyYSwgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShfbmFtZSwgX2JyYW5jaCwgX2NhbWVyYSwgX2NhbnZhcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gMjAwMDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSAxMDAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldFBvcnRhbHMoX3BvcnRhbF9saXN0OiBBcnJheTxQb3J0YWw+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucG9ydGFsX2xpc3QgPSBfcG9ydGFsX2xpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFBvcnRhbEVuZ2luZSB7XHJcbiAgICBpbXBvcnQgxpIgPSBGdWRnZUNvcmU7XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvcnRhbFNoYWRlciBleHRlbmRzIMaSLlNoYWRlciB7XHJcbiAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaVN1YmNsYXNzOiBudW1iZXIgPSDGki5TaGFkZXIucmVnaXN0ZXJTdWJjbGFzcyhQb3J0YWxTaGFkZXIpO1xyXG4gIFxyXG4gICAgICBwdWJsaWMgc3RhdGljIGdldENvYXQoKTogdHlwZW9mIMaSLkNvYXQge1xyXG4gICAgICAgIHJldHVybiDGki5Db2F0VGV4dHVyZWQ7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgcHVibGljIHN0YXRpYyBnZXRWZXJ0ZXhTaGFkZXJTb3VyY2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCN2ZXJzaW9uIDMwMCBlc1xyXG4gICAgICAgICAgdW5pZm9ybSBtYXQ0IHVfcHJvamVjdGlvbjtcclxuXHJcbiAgICAgICAgICBpbiB2ZWMzIGFfcG9zaXRpb247XHJcblxyXG4gICAgICAgICAgb3V0IHZlYzQgcG9zaXRpb247XHJcblxyXG4gICAgICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdV9wcm9qZWN0aW9uICogdmVjNChhX3Bvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uID0gZ2xfUG9zaXRpb247XHJcbiAgICAgICAgICB9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHVibGljIHN0YXRpYyBnZXRGcmFnbWVudFNoYWRlclNvdXJjZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgI3ZlcnNpb24gMzAwIGVzXHJcbiAgICAgICAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuICAgICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZTtcclxuICAgICAgICAgIHVuaWZvcm0gbWF0MyB1X3Bpdm90O1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpbiB2ZWM0IHBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgIG91dCB2ZWM0IGZyYWc7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgICAgICB2ZWMyIHV2ID0gKHBvc2l0aW9uLnh5IC8gcG9zaXRpb24udyk7XHJcbiAgICAgICAgICAgICAgdXYgPSB2ZWMyKHV2LngsIC11di55KTtcclxuICAgICAgICAgICAgICB1diA9IDAuNSAqIHV2ICsgMC41O1xyXG4gICAgICAgICAgICAgIGZyYWcgPSB2ZWM0KHRleHR1cmUodV90ZXh0dXJlLCB1dikucmdiLCAxKTtcclxuICAgICAgICAgIH1gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSJdfQ==
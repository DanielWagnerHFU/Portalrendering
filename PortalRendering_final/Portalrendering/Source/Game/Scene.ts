namespace PortalEngine {
    import f = FudgeCore;
    export class Scene {

        private sceneGraph: f.Graph;
        private player: Player;
        private portal_list: Array<Portal>;

        constructor() {
            this.portal_list = new Array<Portal>();
            this.player = new Player()
            this.sceneGraph = new f.Graph("Scene");
            this.initGraph();
        }
        
        public getSceneGraph(): f.Graph {return this.sceneGraph;}

        public getPlayer(): Player {return this.player;}

        public getPortals(): Array<Portal> {return this.portal_list;}

        private initGraph(): void {
            this.sceneGraph.appendChild(this.player);
            let meshCube: f.MeshCube = new f.MeshCube("meshCube");
            let meshQuad: f.MeshQuad = new f.MeshQuad("meshQuad");
            let meshSphere: f.MeshSphere = new f.MeshSphere("meshSphere", 8, 8);
            let materialQuad: f.Material = new f.Material("materialFlat", f.ShaderFlat, new f.CoatColored(new f.Color(0.2980392156862745, 0.44313725490196076, 0.2196078431372549, 1)));
            let materialSphere: f.Material = new f.Material("materialFlat", f.ShaderFlat, new f.CoatColored(new f.Color(1,0.2,0.1,1)));
            let componentLightAmbiant: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(new f.Color(0.3, 0.3, 0.3, 1)));
            let componentLightDirectional: f.ComponentLight = new f.ComponentLight(new f.LightDirectional(new f.Color(1, 1, 1, 1)));
            componentLightDirectional.mtxPivot.rotateX(120);
            this.sceneGraph.addComponent(componentLightAmbiant);
            this.sceneGraph.addComponent(componentLightDirectional);
            let floor: f.Node = new f.Node("Floor");
            let componentMeshQuad: f.ComponentMesh = new f.ComponentMesh(meshQuad);
            let componentMaterialQuad: f.ComponentMaterial = new f.ComponentMaterial(materialQuad);
            componentMeshQuad.mtxPivot.rotateX(-90);
            componentMeshQuad.mtxPivot.scaleX(20);
            componentMeshQuad.mtxPivot.scaleY(20);
            floor.addComponent(componentMeshQuad);
            floor.addComponent(componentMaterialQuad);
            let sphere: f.Node = new f.Node("Sphere");
            let componentMeshSphere: f.ComponentMesh = new f.ComponentMesh(meshSphere);
            let componentTransformSphere: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0,1,0)));
            let componentMaterialSphere: f.ComponentMaterial = new f.ComponentMaterial(materialSphere);
            componentMeshSphere.mtxPivot.scale(new f.Vector3(0.5,0.5,0.5));
            sphere.addComponent(componentTransformSphere);
            sphere.addComponent(componentMeshSphere);
            sphere.addComponent(componentMaterialSphere);
            let cube: f.Node = new f.Node("cube");
            let componentMeshCube: f.ComponentMesh = new f.ComponentMesh(meshCube);
            let componentTransformCube: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-4.1,0.5,0)));
            let componentMaterialCube: f.ComponentMaterial = new f.ComponentMaterial(materialSphere);
            cube.addComponent(componentTransformCube);
            cube.addComponent(componentMeshCube);
            cube.addComponent(componentMaterialCube); 
            this.sceneGraph.appendChild(floor);
            this.sceneGraph.appendChild(sphere);
            this.sceneGraph.appendChild(cube);      


            this.portal_list.push(new Portal("portal1"));
            this.portal_list[0].init(this.sceneGraph, this.player.getCamera(), new f.Vector3(-3,0.49,0), 90);
            this.sceneGraph.addChild(this.portal_list[0]);
            this.portal_list.push(new Portal("portal2"));
            this.portal_list[1].init(this.sceneGraph, this.player.getCamera(), new f.Vector3(0,0.49,-4), 0);
            this.sceneGraph.addChild(this.portal_list[1]);
            this.portal_list[0].connect(this.portal_list[1]);
        }

        public update(): void {
            this.player.update();
        }
    }
}
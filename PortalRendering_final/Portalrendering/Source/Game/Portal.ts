namespace PortalEngine {
    import f = FudgeCore;
    export class Portal extends f.Node {
        private connectedPortal: Portal;
        private viewportPortal: f.Viewport;
        private texturePortal: f.TextureCanvas;
        private cameraPortal: customCamera;
        private camera: f.ComponentCamera;
        private height: number;
        private width: number;
        private sceneGraph: f.Graph;

        public init(sceneGraph: f.Graph, camera: f.ComponentCamera, translation: f.Vector3, rotation: number): void {
            this.camera = camera;
            this.sceneGraph = sceneGraph;
            this.height = this.width = 400;
            this.addComponent(new f.ComponentMesh(new f.MeshQuad())); 
            let material: f.Material = new f.Material("mtrTexture", f.ShaderFlat, new f.CoatTextured(new f.Color(1,0.2,0.8,1)));
            let componentMaterial = new f.ComponentMaterial(material);
            this.addComponent(componentMaterial);
            this.addComponent(new f.ComponentTransform());
            this.initPosition(translation, new f.Vector3(0,rotation,0));
            this.appendChild(new Frame());
            console.log("portal initialisation finished");
        }

        public initPosition(translation: f.Vector3, rotation: f.Vector3): void {
            this.mtxLocal.rotate(rotation);
            this.mtxLocal.translate(translation, false);
        }

        public connect(portalForConnection: Portal): void {
            this.connectWithPortal(portalForConnection);
            portalForConnection.connectWithPortal(this);
            this.cameraPortal.init(portalForConnection);
            portalForConnection.cameraPortal.init(this);
        }

        private connectWithPortal(portalForConnection: Portal): void {
            //setup portal Material
            let crc2Portal: CanvasRenderingContext2D = document.createElement("canvas").getContext("2d");
            crc2Portal.canvas.width = this.width;
            crc2Portal.canvas.height = this.height
            this.texturePortal = new f.TextureCanvas("Portal", crc2Portal);
            let materialPortal: f.Material = new f.Material("Portal", PortalShader, new f.CoatTextured(null, this.texturePortal));
            this.getComponent(f.ComponentMaterial).material = materialPortal;
            //setup Portal Camera
            this.cameraPortal = new customCamera();
            let portalCameraMount: f.Node = new f.Node("portal camera mount");
            portalCameraMount.addComponent(this.cameraPortal);
            portalCameraMount.addComponent(new f.ComponentTransform());
            this.sceneGraph.appendChild(portalCameraMount);
            //setup Canvas to Render to
            let canvasPortal: HTMLCanvasElement = document.createElement("canvas");
            document.body.appendChild(canvasPortal);
            canvasPortal.style.visibility = "hidden";
            canvasPortal.width = this.width;
            canvasPortal.height = this.height;
            //setup portal viewport
            this.viewportPortal = new f.Viewport();
            this.viewportPortal.initialize("TestViewport", this.sceneGraph, this.cameraPortal, canvasPortal);
            this.connectedPortal = portalForConnection;       
        }

        public update(): void {
            if(this.connectedPortal) {
                this.updatePortalCamera();
                this.viewportPortal.draw();
                let canvas: HTMLCanvasElement = this.viewportPortal.getCanvas();
                this.texturePortal.crc2.drawImage(
                    canvas, 0, 0, canvas.width, canvas.height, 0, 0, this.texturePortal.crc2.canvas.width, this.texturePortal.crc2.canvas.height
                );
                this.texturePortal.refresh();
            }
        }

        private updatePortalCamera(): void {
            //set translation of camera
            let cameraT_worldSpace: f.Matrix4x4 = this.camera.node.mtxWorld.clone;
            let inPortal_worldSpace: f.Matrix4x4 = this.mtxWorld.clone;
            let outPortal_worldSpace: f.Matrix4x4  = this.connectedPortal.mtxWorld.clone;
            let inPortalT_worldSpace_inverse: f.Matrix4x4 = f.Matrix4x4.INVERSION(inPortal_worldSpace);
            let cameraT_inPortalSpace = f.Matrix4x4.MULTIPLICATION(inPortalT_worldSpace_inverse, cameraT_worldSpace);
            
            let relativePosition: f.Vector3 = cameraT_inPortalSpace.translation;
            relativePosition.transform(f.Matrix4x4.ROTATION_Y(180));
            relativePosition.transform(outPortal_worldSpace);
            //set rotation of camera
            let relativeRotation: f.Vector3 = cameraT_inPortalSpace.rotation;
            relativeRotation.add(new f.Vector3(0,180,0));
            relativeRotation.add(outPortal_worldSpace.rotation);

            let transform = new f.Matrix4x4();
            transform.translate(relativePosition);
            transform.rotate(relativeRotation);
            this.cameraPortal.node.cmpTransform.mtxLocal.set(transform);
        }
    }
}
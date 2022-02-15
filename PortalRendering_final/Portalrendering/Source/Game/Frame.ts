namespace PortalEngine {
    import f = FudgeCore;
    export class Frame extends f.Node {
        private material: f.Material = new f.Material("mtrTexture", f.ShaderFlat, new f.CoatTextured(new f.Color(1,1,1,1)));

        constructor() {
            super("Frame");
            let node_cuboid_left : f.Node = new f.Node("cuboid_left");
            let node_cuboid_right : f.Node = new f.Node("cuboid_right");
            let node_cuboid_bottom : f.Node = new f.Node("cuboid_bottom");
            let node_cuboid_top : f.Node = new f.Node("cuboid_top");
            let mesh_cuboid_left : f.ComponentMesh = new f.ComponentMesh(new f.MeshCube());
            let mesh_cuboid_right : f.ComponentMesh = new f.ComponentMesh(new f.MeshCube());
            let mesh_cuboid_bottom : f.ComponentMesh = new f.ComponentMesh(new f.MeshCube());
            let mesh_cuboid_top : f.ComponentMesh = new f.ComponentMesh(new f.MeshCube());
            let transform_cuboid_left : f.ComponentTransform = new f.ComponentTransform();
            let transform_cuboid_right : f.ComponentTransform = new f.ComponentTransform();
            let transform_cuboid_bottom : f.ComponentTransform = new f.ComponentTransform();
            let transform_cuboid_top : f.ComponentTransform = new f.ComponentTransform();
            let material_cuboid_left: f.ComponentMaterial = new f.ComponentMaterial(this.material);
            let material_cuboid_right: f.ComponentMaterial = new f.ComponentMaterial(this.material);
            let material_cuboid_bottom: f.ComponentMaterial = new f.ComponentMaterial(this.material);
            let material_cuboid_top: f.ComponentMaterial = new f.ComponentMaterial(this.material);
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
}
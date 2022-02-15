namespace PortalEngine {
    import f = FudgeCore;
    export class Player extends f.Node {
        private rotator: f.Node;
        private componentCamera: f.ComponentCamera;
        private controlTranslationX: f.Control;
        private controlTranslationY: f.Control;
        private controlTranslationZ: f.Control;
        private controlRotateY: f.Control;
        private controlRotateX: f.Control;

        constructor() {
            super("Player");
            this.componentCamera = new f.ComponentCamera();
            this.rotator = new f.Node("rotator");
            this.rotator.addComponent(new f.ComponentTransform());
            this.addChild(this.rotator);
            this.rotator.addComponent(this.componentCamera);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.MULTIPLICATION(f.Matrix4x4.ROTATION_Y(180), f.Matrix4x4.TRANSLATION(new f.Vector3(0,0.5,0)))));
            this.controlTranslationX = new f.Control("TranslationX", 7, f.CONTROL_TYPE.PROPORTIONAL);
            this.controlTranslationY = new f.Control("TranslationY", 5, f.CONTROL_TYPE.PROPORTIONAL);
            this.controlTranslationZ = new f.Control("TranslationZ", 7, f.CONTROL_TYPE.PROPORTIONAL);
            this.controlRotateY = new f.Control("RotateY", 150, f.CONTROL_TYPE.PROPORTIONAL);
            this.controlRotateX = new f.Control("RotateX", 150, f.CONTROL_TYPE.PROPORTIONAL); 
            console.log("camera");
        }

        public update(): void {
            let deltaTime: number = f.Loop.timeFrameReal / 3000;
            let translationX: number = (
                f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D]));
            let translationY: number = (
                f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.SPACE])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.SHIFT_LEFT]));
            let translationZ: number = (
                f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S]));
            let rotateY: number = (
                f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.ARROW_LEFT])
                + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.ARROW_RIGHT]));
            let rotateX: number = (
                f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.ARROW_DOWN])
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

        public getCamera(): f.ComponentCamera {return this.componentCamera;}
    }
}
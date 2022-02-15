namespace PortalEngine {
    import ƒ = FudgeCore;

    export class customViewport extends ƒ.Viewport {
        private context: CanvasRenderingContext2D;
        private portal_list: Array<Portal>;
        
        public draw(_calculateTransforms: boolean = true): void {
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
            this.context.drawImage(
                ƒ.Render.getCanvas(),
                this.rectSource.x, this.rectSource.y, this.rectSource.width, this.rectSource.height,
                this.rectDestination.x, this.rectDestination.y, this.rectDestination.width, this.rectDestination.height
            );
            this.getCanvas().getContext("2d").drawImage(this.context.canvas, 0, 0);
        }

        public initialize(_name: string, _branch: ƒ.Node, _camera: ƒ.ComponentCamera, _canvas: HTMLCanvasElement): void {
            super.initialize(_name, _branch, _camera, _canvas);
            this.context = document.createElement("canvas").getContext("2d");
            this.context.canvas.width = 2000;
            this.context.canvas.height = 1000;
        }

        public setPortals(_portal_list: Array<Portal>): void {
            this.portal_list = _portal_list;
        }
    }
}
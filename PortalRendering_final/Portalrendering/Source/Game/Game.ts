namespace PortalEngine {
    import f = FudgeCore;

    export class Game {

        private updateListener: EventListener;
        private scene: Scene;
        private gameViewport: customViewport;

        public init(): void {
            this.scene = new Scene();
            GraphicalUserInterface.getInstance().addMainCanvas();
            this.gameViewport = new customViewport();
            this.gameViewport.initialize("viewport", this.scene.getSceneGraph(), this.scene.getPlayer().getCamera(), GraphicalUserInterface.getInstance().getGameCanvas());
            this.gameViewport.setPortals(this.scene.getPortals());

            this.updateListener = this.update.bind(this);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.updateListener);
            console.log("game initialised")
        }

        public startLoop(): void {
            f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
        }

        private update(): void {
            this.scene.update();
            this.gameViewport.draw();
        }
    }
}
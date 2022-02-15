namespace PortalEngine {
    export class GraphicalUserInterface {
        //Singleton
        private static instance: GraphicalUserInterface;
    
        private gameCanvas: HTMLCanvasElement;
        private canvas_list: Array<HTMLCanvasElement>;

        private constructor() {
            this.canvas_list = new Array<HTMLCanvasElement>();
        }
    
        public static getInstance(): GraphicalUserInterface {
            if (!GraphicalUserInterface.instance) {
                GraphicalUserInterface.instance = new GraphicalUserInterface();
            }
            return GraphicalUserInterface.instance;
        }

        public addMainCanvas(): void {
                let canvas: HTMLCanvasElement = document.createElement('canvas');
                canvas.id = 'mainCanvas';
                document.body.appendChild(canvas);
                this.gameCanvas = canvas;
                this.canvas_list.push(this.gameCanvas);
        }

        public getGameCanvas(): HTMLCanvasElement {return this.gameCanvas}
    }
}
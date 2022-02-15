/// <reference types="../../core/build/fudgecore" />
declare namespace PortalEngine {
}
import f = FudgeCore;
declare namespace PortalEngine {
}
declare namespace PortalEngine {
    import f = FudgeCore;
    class Frame extends f.Node {
        private material;
        constructor();
    }
}
declare namespace PortalEngine {
    class Game {
        private updateListener;
        private scene;
        private gameViewport;
        init(): void;
        startLoop(): void;
        private update;
    }
}
declare namespace PortalEngine {
    class GraphicalUserInterface {
        private static instance;
        private gameCanvas;
        private canvas_list;
        private constructor();
        static getInstance(): GraphicalUserInterface;
        addMainCanvas(): void;
        getGameCanvas(): HTMLCanvasElement;
    }
}
declare namespace PortalEngine {
    import f = FudgeCore;
    class Player extends f.Node {
        private rotator;
        private componentCamera;
        private controlTranslationX;
        private controlTranslationY;
        private controlTranslationZ;
        private controlRotateY;
        private controlRotateX;
        constructor();
        update(): void;
        getCamera(): f.ComponentCamera;
    }
}
declare namespace PortalEngine {
    import f = FudgeCore;
    class Portal extends f.Node {
        private connectedPortal;
        private viewportPortal;
        private texturePortal;
        private cameraPortal;
        private camera;
        private height;
        private width;
        private sceneGraph;
        init(sceneGraph: f.Graph, camera: f.ComponentCamera, translation: f.Vector3, rotation: number): void;
        initPosition(translation: f.Vector3, rotation: f.Vector3): void;
        connect(portalForConnection: Portal): void;
        private connectWithPortal;
        update(): void;
        private updatePortalCamera;
    }
}
declare namespace PortalEngine {
    import f = FudgeCore;
    class Scene {
        private sceneGraph;
        private player;
        private portal_list;
        constructor();
        getSceneGraph(): f.Graph;
        getPlayer(): Player;
        getPortals(): Array<Portal>;
        private initGraph;
        update(): void;
    }
}
declare namespace PortalEngine {
    import ƒ = FudgeCore;
    class customCamera extends ƒ.ComponentCamera {
        private portal;
        init(portal: Portal): void;
        projectCentral(_aspect?: number, _fieldOfView?: number, _direction?: f.FIELD_OF_VIEW, _near?: number, _far?: number): void;
        clipOblique(clipPoint: f.Vector3, clipNormal: f.Vector3): void;
        clipObliqueCP(clipPoint: f.Vector3, clipNormal: f.Vector3): void;
    }
}
declare namespace PortalEngine {
    import ƒ = FudgeCore;
    class customViewport extends ƒ.Viewport {
        private context;
        private portal_list;
        draw(_calculateTransforms?: boolean): void;
        initialize(_name: string, _branch: ƒ.Node, _camera: ƒ.ComponentCamera, _canvas: HTMLCanvasElement): void;
        setPortals(_portal_list: Array<Portal>): void;
    }
}
declare namespace PortalEngine {
    import ƒ = FudgeCore;
    abstract class PortalShader extends ƒ.Shader {
        static readonly iSubclass: number;
        static getCoat(): typeof ƒ.Coat;
        static getVertexShaderSource(): string;
        static getFragmentShaderSource(): string;
    }
}

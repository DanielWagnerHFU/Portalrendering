namespace PortalEngine {
    import ƒ = FudgeCore;

    export class customCamera extends ƒ.ComponentCamera {

        private portal: Portal;

        public init(portal: Portal): void {
            this.portal = portal;
        }

        public projectCentral(_aspect: number = this.aspectRatio, _fieldOfView: number = this.fieldOfView, _direction: f.FIELD_OF_VIEW = this.direction, _near: number = 1, _far: number = 2000): void {
            super.projectCentral();

            let cameraT_worldSpace: f.Matrix4x4 = this.node.mtxWorld.clone;
            let portalT_worldSpace: f.Matrix4x4 = this.portal.mtxWorld.clone;
            let inverseCameraT_worldSpace = f.Matrix4x4.INVERSION(cameraT_worldSpace);

            let portalNormal: f.Vector3 = new f.Vector3(0,0,1);
            portalNormal.transform(portalT_worldSpace, true);
            portalNormal.transform(inverseCameraT_worldSpace);
            let portalPosition: f.Vector3 = new f.Vector3(0,0,0);
            portalPosition.transform(portalT_worldSpace, true);
            portalPosition.transform(inverseCameraT_worldSpace);

            console.log("portal Position", portalPosition.x, portalPosition.y, portalPosition.z)
            portalNormal = f.Vector3.DIFFERENCE(portalNormal,portalPosition);
            console.log("normal Vector", portalNormal.x, portalNormal.y, portalNormal.z)
            
            ////Paramter möglicherweise suboptimal und muss angepasst werden
            let extraclip: number = 0.25;
            this.clipObliqueCP(f.Vector3.DIFFERENCE(portalPosition, f.Vector3.SCALE(portalNormal, extraclip)), portalNormal);
        }

        public clipOblique(clipPoint: f.Vector3, clipNormal: f.Vector3): void {
            function sgn(a: number): number{
                if (a > 0) return 1;
                if (a < 0) return -1;
                return 0;
            }
            
            let matrix: Float32Array = this.mtxProjection.get();
      
            let clipPlaneX: number = clipNormal.x;
            let clipPlaneY: number = clipNormal.y;
            let clipPlaneZ: number = clipNormal.z;
            let clipPlaneW: number = f.Vector3.DOT(f.Vector3.SCALE(clipNormal, -1), clipPoint);

            console.log("w:", clipPlaneW);
      
            let qX: number = (sgn(clipPlaneX) + matrix[8]) / matrix[0];
            let qY: number = (sgn(clipPlaneY) + matrix[9]) / matrix[5];
            let qZ: number = -1;
            let qW: number = (1 + matrix[10]) / matrix[14];
      
            let scalar: number = 2 / (clipPlaneX * qX + clipPlaneY * qY + clipPlaneZ * qZ + clipPlaneW * qW); 
      
      
            let cX: number = clipPlaneX * scalar;
            let cY: number = clipPlaneY * scalar;
            let cZ: number = clipPlaneZ * scalar;
            let cW: number = clipPlaneW * scalar;
      
            matrix[2] = cX;
            matrix[6] = cY;
            matrix[10] = cZ + 1;
            matrix[14] = cW;
      
            this.mtxProjection.set(matrix);
          }

          public clipObliqueCP(clipPoint: f.Vector3, clipNormal: f.Vector3): void {
            let projection: Float32Array = this.mtxProjection.get();
      
            let clipPlaneX: number = clipNormal.x;
            let clipPlaneY: number = clipNormal.y;
            let clipPlaneZ: number = clipNormal.z;
            let clipPlaneW: number = f.Vector3.DOT(f.Vector3.SCALE(clipNormal, -1), clipPoint);

            console.log("w:", clipPlaneW);

            let matrix: Float32Array = f.Matrix4x4.INVERSION(this.mtxProjection.clone).get();
            let vX: number = (clipPlaneX < 0.0) ? 1 : -1;
            let vY: number = (clipPlaneY < 0.0) ? 1 : -1;
            let vZ: number = 1;
            let vW: number = 1;

            let qX: number = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12] * vW;
            let qY: number = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13] * vW;
            let qZ: number = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14] * vW;
            let qW: number = matrix[3] * vX + matrix[7] * vY + matrix[11] * vZ + matrix[15] * vW;
      
            let scalar: number = 2 / (clipPlaneX * qX + clipPlaneY * qY + clipPlaneZ * qZ + clipPlaneW * qW); 
      
      
            let cX: number = clipPlaneX * scalar;
            let cY: number = clipPlaneY * scalar;
            let cZ: number = clipPlaneZ * scalar;
            let cW: number = clipPlaneW * scalar;
      
            projection[2] = cX - projection[3];
            projection[6] = cY - projection[7];
            projection[10] = cZ - projection[11];
            projection[14] = cW - projection[15];
      
            this.mtxProjection.set(projection);
          }
    }  
}
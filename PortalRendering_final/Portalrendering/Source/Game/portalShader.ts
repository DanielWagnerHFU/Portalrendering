namespace PortalEngine {
    import ƒ = FudgeCore;

    export abstract class PortalShader extends ƒ.Shader {
      public static readonly iSubclass: number = ƒ.Shader.registerSubclass(PortalShader);
  
      public static getCoat(): typeof ƒ.Coat {
        return ƒ.CoatTextured;
      }
  
      public static getVertexShaderSource(): string {
        return `#version 300 es
          uniform mat4 u_projection;

          in vec3 a_position;

          out vec4 position;

          void main() {
              gl_Position = u_projection * vec4(a_position, 1.0);
              position = gl_Position;
          }`;
      }

      public static getFragmentShaderSource(): string {
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
  }
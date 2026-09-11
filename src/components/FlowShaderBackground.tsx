import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_speed;
  uniform float u_zoom;
  uniform float u_intensity;
  uniform float u_warp;
  uniform float u_contrast;
  uniform float u_brightness;
  uniform float u_saturation;
  uniform float u_hue;
  uniform float u_vignette;
  uniform float u_grain;

  #define PI 3.14159265359

  vec2 rotate(vec2 p, float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c) * p;
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotate(p * 2.03, 0.35);
      amplitude *= 0.5;
    }

    return value;
  }

  vec3 rgbToHsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;

    return vec3(
      abs(q.z + (q.w - q.y) / (6.0 * d + e)),
      d / (q.x + e),
      q.x
    );
  }

  vec3 hsvToRgb(vec3 c) {
    vec3 p = abs(fract(c.xxx + vec3(0.0, 1.0 / 3.0, 2.0 / 3.0)) * 6.0 - 3.0);
    return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
  }

  float luminance(vec3 color) {
    return dot(color, vec3(0.2126, 0.7152, 0.0722));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centered = uv - 0.5;
    centered.x *= u_resolution.x / u_resolution.y;

    float time = u_time * (0.16 + u_speed * 0.012);
    vec2 p = centered * (1.25 + u_zoom * 0.012);

    float flowA = fbm(p * 1.45 + vec2(time * 0.22, -time * 0.16));
    vec2 flow = vec2(
      fbm(p * 1.7 + flowA * 1.4 + vec2(2.1, 0.0)),
      fbm(p * 1.7 + flowA * 1.4 + vec2(0.0, 3.7))
    ) - 0.5;

    p += flow * (0.24 + u_warp * 0.009);

    float field = fbm(p * 1.7 + vec2(time * 0.1, -time * 0.08));
    float ribbons = sin(
      (p.x + field * 0.75) * 6.0 +
      sin(p.y * 4.0 + time) * 1.2
    );

    float band = smoothstep(-0.35, 0.75, ribbons);
    float glow = smoothstep(0.1, 0.9, field);

    vec3 deep = vec3(0.102, 0.078, 0.137);
    vec3 rose = vec3(0.718, 0.365, 0.412);
    vec3 blush = vec3(0.918, 0.804, 0.761);
    vec3 cream = vec3(1.0, 0.961, 0.922);

    vec3 color = mix(deep, rose, smoothstep(0.13, 0.82, field));
    color = mix(color, blush, band * 0.48 + glow * 0.12);
    color = mix(color, cream, smoothstep(0.7, 1.0, band * glow) * 0.16);

    color *= 0.78 + u_intensity * 0.006;
    color += vec3(0.04, 0.018, 0.03) * glow;

    float contrast = 0.78 + u_contrast * 0.008;
    color = (color - 0.5) * contrast + 0.5;
    color += (u_brightness - 50.0) * 0.004;

    vec3 hsv = rgbToHsv(max(color, vec3(0.0)));
    hsv.x = fract(hsv.x + u_hue / 360.0);
    hsv.y *= 0.75 + u_saturation * 0.005;
    color = hsvToRgb(hsv);

    float distanceFromCenter = length(centered);
    float vignette = 1.0 - smoothstep(0.25, 0.95, distanceFromCenter) * u_vignette * 0.01;
    color *= vignette;

    float grain = (hash21(gl_FragCoord.xy + u_time) - 0.5) * u_grain * 0.0017;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create WebGL shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!program) {
    throw new Error("Unable to create WebGL program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown program error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

export function FlowShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance"
    });

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    let program: WebGLProgram;

    try {
      program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    } catch {
      canvas.style.display = "none";
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const uniformLocations = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      speed: gl.getUniformLocation(program, "u_speed"),
      zoom: gl.getUniformLocation(program, "u_zoom"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
      warp: gl.getUniformLocation(program, "u_warp"),
      contrast: gl.getUniformLocation(program, "u_contrast"),
      brightness: gl.getUniformLocation(program, "u_brightness"),
      saturation: gl.getUniformLocation(program, "u_saturation"),
      hue: gl.getUniformLocation(program, "u_hue"),
      vignette: gl.getUniformLocation(program, "u_vignette"),
      grain: gl.getUniformLocation(program, "u_grain")
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrame = 0;
    let startTime = performance.now();
    let lastTime = startTime;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      gl.viewport(0, 0, width, height);
    };

    const render = (now: number) => {
      const elapsed = reducedMotion ? 0 : (now - startTime) / 1000;
      lastTime = now;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(
        uniformLocations.resolution,
        canvas.width,
        canvas.height
      );
      gl.uniform1f(uniformLocations.time, elapsed);
      gl.uniform1f(uniformLocations.speed, 40);
      gl.uniform1f(uniformLocations.zoom, 50);
      gl.uniform1f(uniformLocations.intensity, 55);
      gl.uniform1f(uniformLocations.warp, 0);
      gl.uniform1f(uniformLocations.contrast, 45);
      gl.uniform1f(uniformLocations.brightness, 50);
      gl.uniform1f(uniformLocations.saturation, 50);
      gl.uniform1f(uniformLocations.hue, 0);
      gl.uniform1f(uniformLocations.vignette, 0);
      gl.uniform1f(uniformLocations.grain, 12);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animationFrame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (!animationFrame) {
        startTime += performance.now() - lastTime;
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        lastTime = performance.now();
        start();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="flow-canvas"
      aria-hidden="true"
    />
  );
}
// src/components/ParticleBackground.tsx

import React, { useEffect, useRef } from "react";

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const CANVAS = canvasRef.current;
    if (!CANVAS) return;

    const CTX = CANVAS.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;
    const XO = W / 2;
    const YO = H / 2;
    const NUM_PARTICLES = 400;
    const MAX_Z = 2;
    const MAX_R = 1;
    const Z_SPD = 1;
    const PARTICLES: Particle[] = [];

    class Particle {
      pos: Vector;
      vel: Vector;
      fill: string;
      stroke: string;

      constructor(x: number, y: number, z: number) {
        this.pos = new Vector(x, y, z);
        const X_VEL = 0,
          Y_VEL = 0,
          Z_VEL = -Z_SPD;
        this.vel = new Vector(X_VEL, Y_VEL, Z_VEL);
        this.vel.scale(0.005);
        this.fill = "rgba(165,55,253,1)";
        this.stroke = this.fill;
      }

      update() {
        this.pos.add(this.vel);
      }

      render() {
        const PIXEL = to2d(this.pos);
        const X = PIXEL[0];
        const Y = PIXEL[1];
        const R = ((MAX_Z - this.pos.z) / MAX_Z) * MAX_R;

        if (X < 0 || X > W || Y < 0 || Y > H) this.pos.z = MAX_Z;

        this.update();
        CTX!.beginPath();
        CTX!.fillStyle = this.fill;
        CTX!.strokeStyle = this.stroke;
        CTX!.arc(X, PIXEL[1], R, 0, Math.PI * 2);
        CTX!.fill();
        CTX!.stroke();
        CTX!.closePath();
      }
    }

    class Vector {
      x: number;
      y: number;
      z: number;

      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      add(v: Vector) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      }

      scale(n: number) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
      }
    }

    function to2d(v: Vector) {
      const X_COORD = v.x - XO;
      const Y_COORD = v.y - YO;
      const PX = X_COORD / v.z;
      const PY = Y_COORD / v.z;
      return [PX + XO, PY + YO];
    }

    function render() {
      for (let i = 0; i < PARTICLES.length; i++) {
        PARTICLES[i].render();
      }
    }

    function loop() {
      requestAnimationFrame(loop);
      CTX!.fillStyle = "rgba(0,0,0,0.15)";
      CTX!.fillRect(0, 0, W, H);
      render();
    }

    function createParticles() {
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const X = Math.random() * W,
          Y = Math.random() * H,
          Z = Math.random() * MAX_Z;
        PARTICLES.push(new Particle(X, Y, Z));
      }
    }

    function init() {
      if (CANVAS) {
        CANVAS.width = W;
        CANVAS.height = H;
        createParticles();
        loop();
      }
    }

    init();

    // Temizlik fonksiyonu
    return () => {
      CTX?.clearRect(0, 0, W, H);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ParticleBackground;

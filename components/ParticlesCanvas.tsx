
import React, { useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const ParticlesCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particlesArray: Particle[];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Configuration for the particle system
        const config = {
            particleColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(30, 64, 175, 0.4)',
            lineColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(30, 64, 175, 0.15)',
            particleSpeed: 0.3, // Max speed
            connectDistance: 120,
        };

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                if(!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            const numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2.5 + 1; // slightly larger particles
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const directionX = (Math.random() * config.particleSpeed * 2) - config.particleSpeed;
                const directionY = (Math.random() * config.particleSpeed * 2) - config.particleSpeed;
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size, config.particleColor));
            }
        }

        function animate() {
            if(!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        }
        
        function connect() {
            if(!ctx) return;
            const connectDistanceSq = config.connectDistance * config.connectDistance;
            
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distanceSq = dx * dx + dy * dy;
                                      
                    if (distanceSq < connectDistanceSq) {
                        const opacityValue = 1 - (distanceSq / connectDistanceSq);
                        const finalColor = config.lineColor.substring(0, config.lineColor.lastIndexOf(',')) + `, ${opacityValue > 0 ? opacityValue.toFixed(2) : 0})`;
                        
                        ctx.strokeStyle = finalColor;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }


        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        init();
        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default ParticlesCanvas;

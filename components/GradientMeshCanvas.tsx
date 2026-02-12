
import React, { useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const GradientMeshCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        const lightColors = [
            { r: 249, g: 115, b: 22 },  // orange-primary
            { r: 245, g: 158, b: 11 },  // amber-primary
            { r: 6, g: 182, b: 212 },   // cyan-accent
            { r: 139, g: 92, b: 246 }   // purple-accent
        ];
        
        const darkColors = [
            { r: 30, g: 64, b: 175 },   // deep-blue
            { r: 139, g: 92, b: 246 },  // purple-accent
            { r: 6, g: 182, b: 212 },   // cyan-accent
            { r: 16, g: 185, b: 129 }   // emerald-accent
        ];

        const colors = theme === 'dark' ? darkColors : lightColors;
        const blurAmount = theme === 'dark' ? 100 : 120;
        const opacity = theme === 'dark' ? 0.35 : 0.6;

        class Blob {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: { r: number, g: number, b: number };

            constructor(color: { r: number, g: number, b: number }) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = (Math.random() * 0.4 + 0.3) * Math.min(canvas.width, canvas.height);
                this.color = color;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) this.vx *= -1;
                if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) this.vy *= -1;
            }

            draw(context: CanvasRenderingContext2D) {
                const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`);
                gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
                
                context.beginPath();
                context.fillStyle = gradient;
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fill();
            }
        }

        let blobs: Blob[] = [];

        function init() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            blobs = colors.map(color => new Blob(color));
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = `blur(${blurAmount}px)`;
            
            blobs.forEach(blob => {
                blob.update();
                blob.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        const handleResize = () => {
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

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

export default GradientMeshCanvas;

(function() {
    'use strict';
    
    // Only initialize if we have the hero section
    const heroSection = document.querySelector('.hero.section');
    if (!heroSection) return;
    
    // Check for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    
    // Create canvas container
    const container = document.createElement('div');
    container.className = 'webgl-hero-container';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '0';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none'; // let clicks pass through to text
    
    // Ensure hero has relative positioning
    heroSection.style.position = 'relative';
    
    // Insert behind content but inside hero
    heroSection.insertBefore(container, heroSection.firstChild);
    
    // Hide the existing video/image background to let WebGL shine
    const oldMedia = document.querySelector('.hero-media');
    if (oldMedia) {
        oldMedia.style.opacity = '0';
        oldMedia.style.visibility = 'hidden';
    }

    // Three.js setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 1500 : 4000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // ZERB Brand Colors: Copper/Orange (#C4734A) and subtle whites
    const colorPrimary = new THREE.Color('#C4734A');
    const colorSecondary = new THREE.Color('#F5F0EB');
    
    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Spread particles over a large area
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i+1] = (Math.random() - 0.5) * 100;
        posArray[i+2] = (Math.random() - 0.5) * 50;
        
        // Mix colors
        const mixedColor = colorPrimary.clone().lerp(colorSecondary, Math.random());
        colorsArray[i] = mixedColor.r;
        colorsArray[i+1] = mixedColor.g;
        colorsArray[i+2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Custom Shader Material for glowing particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    
    // Gyroscope Parallax for Mobile
    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ requires permission
        document.body.addEventListener('click', function requestGyro() {
            DeviceOrientationEvent.requestPermission().then(state => {
                if(state === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                }
            }).catch(console.error);
            document.body.removeEventListener('click', requestGyro);
        }, {once:true});
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
    }
    
    function handleOrientation(event) {
        if (!event.gamma || !event.beta) return;
        // gamma is left-to-right tilt in degrees, where right is positive
        // beta is front-to-back tilt in degrees, where front is positive
        mouseX = event.gamma * 10;
        mouseY = (event.beta - 45) * 10; // offset beta so holding at 45deg is neutral
    }

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });
    
    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation Loop
    const clock = new THREE.Clock();
    
    const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate entire particle system slowly
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        
        // Easing mouse movement
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        
        // Render
        renderer.render(scene, camera);
        
        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };
    
    tick();
})();

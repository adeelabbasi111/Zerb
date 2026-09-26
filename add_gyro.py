with open('js/webgl-hero.js', 'r', encoding='utf-8') as f:
    js = f.read()

if 'DeviceOrientationEvent' not in js:
    gyro_code = '''
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
'''
    js = js.replace('document.addEventListener(\'mousemove\',', gyro_code + '\n    document.addEventListener(\'mousemove\',')
    with open('js/webgl-hero.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Added Gyroscope Parallax")

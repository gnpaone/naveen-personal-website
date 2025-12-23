import * as THREE from 'three';
import React from 'react';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Scene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: new THREE.Vector3(0, 0, 0),
            thr: 15,
            totPoints: 2500,
            delta: .1,
            colors: [
                new THREE.Color(0xd0efff),
                new THREE.Color(0x187bcd),
                new THREE.Color(0x1b677e)
            ],
            mouse: {
                x: 0,
                y: 0
            },
            cameraStartingPos: new THREE.Vector3(-100, 0, 350),
            cameraEndPos: new THREE.Vector3(130, 0, 80),
            animationStartTime: null,
            clicked: false,
            cameraDirection: 1,
            cameraStillMoving: false,
            currentShape: 0
        };
    }

    _setMaxPoints = (n) => {
        this.setState({ totPoints: n });
    }

    _setThreshold = (thr) => {
        this.setState({ thr: thr });
    }

    _setDelts = (delta) => {
        this.setState({ delta: delta });
    }

    _setColors = (colors) => {
        this.setState({ colors: colors });
    }

    _easeOutExpo = (x) => {
        return 1 - Math.pow(1 - x, 4);
    }

    _bezier = (t) => {
        return t * t * (3 - 2 * t);
    }

    _updateCameraPosition = () => {

        var start_x = this.state.cameraDirection === 1 ? this.state.cameraStartingPos.x : this.state.cameraEndPos.x;
        var end_x = this.state.cameraDirection === 1 ? this.state.cameraEndPos.x : this.state.cameraStartingPos.x;
        var start_z = this.state.cameraDirection === 1 ? this.state.cameraStartingPos.z : this.state.cameraEndPos.z;
        var end_z = this.state.cameraDirection === 1 ? this.state.cameraEndPos.z : this.state.cameraStartingPos.z;

        var progress_x = Math.round((((this.camera.position.x - start_x) / (end_x - start_x)) + Number.EPSILON) * 100) / 100;
        var progress_z = Math.round((((this.camera.position.z - start_z) / (end_z - start_z)) + Number.EPSILON) * 100) / 100;
        if (progress_x !== 1) {
            var amount_x = this._easeOutExpo((this.clock.elapsedTime - this.state.startTime) * 2.5);
            var interpolated_x = start_x + amount_x * (end_x - start_x);
            this.camera.position.setX(interpolated_x)
        }
        if (progress_z !== 1) {
            var amount_z = this._easeOutExpo((this.clock.elapsedTime - this.state.startTime) * 2.5);
            var interpolated_z = start_z + amount_z * (end_z - start_z);
            this.camera.position.setZ(interpolated_z)
        }

        if (progress_z === 1 && progress_x === 1)
            this.setState({ cameraStillMoving: false });
    }

    createCanvas = (document, container) => {
        var canvas = document.createElement("canvas");
        canvas.className = "scene";
        canvas.container = document.getElementById(container);
        canvas.container.appendChild(canvas);

        return canvas;
    }

    rendererSetup = (canvas) => {
        var width = canvas.offsetWidth,
            height = canvas.offsetHeight;
        var renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height, false);

        return renderer;
    }

    raycasterSetup = (threshold) => {
        var raycaster = new THREE.Raycaster();
        raycaster.params.Points.threshold = threshold;

        return raycaster;
    }

    cameraSetup = (fov, width, height, near, far, x_pos, y_pos, z_pos) => {
        var camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
        camera.position.set(x_pos, y_pos, z_pos);

        camera.lookAt(this.state.origin);

        return camera;
    }

    getEuclideanFromSpherical = (theta, phi) => {
        var coords = Object();
        coords.x = Math.cos(theta) * Math.cos(phi);
        coords.y = Math.sin(phi);
        coords.z = Math.sin(theta) * Math.cos(phi);

        return coords;
    }

    movePoint = (p) => {
        var d = this.getEuclideanFromSpherical(p.vec.theta, p.vec.phi);

        //updating position, delta = distance step for each iteration
        p.vec.x += d.x * this.state.delta * p.dir;
        p.vec.y += d.y * this.state.delta * p.dir;
        p.vec.z += d.z * this.state.delta * p.dir;

        this.attributePositions.array[p.idx * 3] = p.vec.x;
        this.attributePositions.array[p.idx * 3 + 1] = p.vec.y;
        this.attributePositions.array[p.idx * 3 + 2] = p.vec.z;

        //if points go over threshold, invert direction
        if (Math.abs(p.initial.x - p.vec.x) > this.state.thr
            || Math.abs(p.initial.y - p.vec.y) > this.state.thr
            || Math.abs(p.initial.z - p.vec.z) > this.state.thr) {
            p.dir = -p.dir;
        }
    }

    rotate = (x, y, angle) => {
        var res = {
            x: 0,
            y: 0
        };
        var r_x = x * Math.cos(angle) - y * Math.sin(angle);
        var r_y = x * Math.sin(angle) + y * Math.cos(angle);

        res.x = r_x;
        res.y = r_y;

        return res;
    }

    updateParticles = () => {
        const positions = this.attributePositions.array;

        // Lorenz state
        let lx = 0.1, ly = 0, lz = 0;
        let lx2 = -0.1, ly2 = 0, lz2 = 0; // Walker 2 for symmetry
        const ldt = 0.006, lsigma = 10, lrho = 28, lbeta = 8 / 3;

        for (let i = 0; i < this.state.totPoints; i++) {
            const vector = this.particles[i];
            vector.theta = Math.random() * Math.PI * 2;
            vector.phi = (1 - Math.sqrt(Math.random())) * Math.PI / 2 * (Math.random() > .5 ? 1 : -1);

            if (this.state.currentShape === 0) {
                // Sphere
                const coords = this.getEuclideanFromSpherical(vector.theta, vector.phi);
                vector.x = coords.x;
                vector.y = coords.y;
                vector.z = coords.z;
                vector.multiplyScalar(100 + (Math.random() - 0.5) * 2);
            } else if (this.state.currentShape === 1) {
                // Double Helix
                const a = 0.7, b = 2;
                const symmetry = Math.random() > .5 ? 1 : -1;
                const x = Math.random();

                vector.z = x * a * Math.sin(vector.theta) * symmetry;
                vector.x = x * a * Math.cos(vector.theta) * symmetry;
                vector.y = b * vector.theta - 4;
                vector.multiplyScalar(100 + (Math.random() - 0.5) * 2);

            } else if (this.state.currentShape === 2) {
                // Mobius
                const u = (Math.random() * 2) - 1;
                vector.x = (1.25 + (u / 2) * Math.cos(vector.theta / 2)) * Math.cos(vector.theta);
                vector.y = (1.25 + (u / 2) * Math.cos(vector.theta / 2)) * Math.sin(vector.theta);
                vector.z = (u / 2) * Math.sin(vector.theta / 2);
                vector.multiplyScalar(100 + (Math.random() - 0.5) * 2);

            } else if (this.state.currentShape === 3) {
                // Galaxy Spiral
                const spin = i % 3;
                const radius = (i / this.state.totPoints) * 100 + 30;
                const spinAngle = radius * 0.1;
                const branchAngle = (Math.PI * 2 * spin) / 3;

                const x = Math.cos(branchAngle + spinAngle) * radius;
                const y = Math.sin(branchAngle + spinAngle) * radius;
                const z = (Math.random() - 0.5) * 10;

                const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 10;
                const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 10;
                const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 10;

                vector.x = x + randomX;
                vector.y = y + randomY;
                vector.z = z + randomZ;
                vector.multiplyScalar(1.2);
            } else if (this.state.currentShape === 4) {
                // Lorenz Attractor (Dual Walker for Symmetry)
                // Walker 1 (Even indices)
                if (i % 2 === 0) {
                    let dx = lsigma * (ly - lx) * ldt;
                    let dy = (lx * (lrho - lz) - ly) * ldt;
                    let dz = (lx * ly - lbeta * lz) * ldt;
                    lx += dx; ly += dy; lz += dz;
                    vector.x = lx * 8;
                    vector.y = ly * 8;
                    vector.z = (lz - 25) * 8;
                } else {
                    // Walker 2 (Odd indices) - Starts symmetric
                    let dx = lsigma * (ly2 - lx2) * ldt;
                    let dy = (lx2 * (lrho - lz2) - ly2) * ldt;
                    let dz = (lx2 * ly2 - lbeta * lz2) * ldt;
                    lx2 += dx; ly2 += dy; lz2 += dz;
                    vector.x = lx2 * 8;
                    vector.y = ly2 * 8;
                    vector.z = (lz2 - 25) * 8;
                }
            } else if (this.state.currentShape === 5) {
                // Klein Bottle
                const u = vector.theta;
                const v = Math.random() * Math.PI * 2;
                const r = 40;

                const cosU2 = Math.cos(u / 2);
                const sinU2 = Math.sin(u / 2);
                const sinV = Math.sin(v);
                const cosV = Math.cos(v);
                const sin2V = Math.sin(2 * v);

                const temp = (r + cosU2 * sinV - sinU2 * sin2V / 2);
                vector.x = temp * Math.cos(u);
                vector.y = temp * Math.sin(u);
                vector.z = sinU2 * sinV + cosU2 * sin2V;
                vector.z *= 40;
                vector.multiplyScalar(3);
            }

            positions[i * 3] = vector.x;
            positions[i * 3 + 1] = vector.y;
            positions[i * 3 + 2] = vector.z;
        }

        this.toMove.forEach(p => {
            p.initial.copy(p.vec);
        });

        this.attributePositions.needsUpdate = true;
        this.createSegments();
    }

    createSegments = () => {
        if (this.segments) {
            this.group.remove(this.segments);
            if (this.segments.geometry) this.segments.geometry.dispose();
        }

        this.segmentsGeometry = new THREE.BufferGeometry();
        this.segmentsVertices = [];

        const segmentsPosArray = [];
        const segmentsColorArray = [];

        for (let i = 0; i < this.particles.length - 1; i++) {
            var v = this.particles[i];
            for (var j = 0; j < this.particles.length - 1; j++) {
                if (i !== j && v.distanceTo(this.particles[j]) < 13) {
                    this.segmentsVertices.push(v);
                    this.segmentsVertices.push(this.particles[j]);

                    segmentsPosArray.push(v.x, v.y, v.z);
                    segmentsPosArray.push(this.particles[j].x, this.particles[j].y, this.particles[j].z);

                    var c = this.state.colors[v.color];
                    segmentsColorArray.push(c.r, c.g, c.b);
                    segmentsColorArray.push(c.r, c.g, c.b);
                }
            }
        }

        this.segmentsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(segmentsPosArray, 3).setUsage(THREE.DynamicDrawUsage));
        this.segmentsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(segmentsColorArray, 3));

        this.segments = new THREE.LineSegments(this.segmentsGeometry, this.segmentsMat);

        // Sync transforms with the point cloud (this.wrap)
        if (this.wrap) {
            this.segments.position.copy(this.wrap.position);
            this.segments.rotation.copy(this.wrap.rotation);
        } else {
            this.segments.translateX(150);
        }

        this.group.add(this.segments);
    }

    handleContextMenu = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            currentShape: (prevState.currentShape + 1) % 6
        }), () => {
            this.updateParticles();
        });
    }

    componentDidMount = () => {
        this.canvas = this.createCanvas(document, 'home');

        this.toMove = [];

        this.renderer = this.rendererSetup(this.canvas);
        this.scene = new THREE.Scene();

        this.raycaster = this.raycasterSetup(6);
        this.camera = this.cameraSetup(50, this.canvas.offsetWidth, this.canvas.offsetHeight, .1, 2000, this.state.cameraStartingPos.x, this.state.cameraStartingPos.y, this.state.cameraStartingPos.z);

        this.group = new THREE.Group();
        this.scene.add(this.group);

        // create dots
        var loader = new THREE.TextureLoader();
        loader.setCrossOrigin("");
        var dotTexture = loader.load("dotTexture.png");
        dotTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

        this.particles = [];
        var positions = new Float32Array(this.state.totPoints * 3);
        var sizes = new Float32Array(this.state.totPoints);
        var colorsAttr = new Float32Array(this.state.totPoints * 3);

        for (var i = 0; i < this.state.totPoints; i++) {
            var vector = new THREE.Vector3();
            vector.color = Math.floor(Math.random() * this.state.colors.length);

            this.particles.push(vector);
            this.state.colors[vector.color].toArray(colorsAttr, i * 3);
            sizes[i] = 4;

            if (Math.random() > .5) {
                var dir = Math.random() > .5 ? 1 : -1;
                var p = {
                    initial: vector.clone(),
                    vec: vector,
                    idx: i,
                    dir: dir
                };
                this.toMove.push(p)
            }
        }

        // geometry buffers setup
        var bufferWrapGeom = new THREE.BufferGeometry();
        this.attributePositions = new THREE.BufferAttribute(positions, 3);
        bufferWrapGeom.setAttribute('position', this.attributePositions);
        this.attributeSizes = new THREE.BufferAttribute(sizes, 1);
        bufferWrapGeom.setAttribute('size', this.attributeSizes);
        this.attributeColors = new THREE.BufferAttribute(colorsAttr, 3);
        bufferWrapGeom.setAttribute('color', this.attributeColors);

        // Populate positions using the update function
        this.updateParticles();
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                dotTexture: {
                    value: dotTexture
                }
            },
            vertexShader: document.getElementById("wrapVertexShader").textContent,
            fragmentShader: document.getElementById("wrapFragmentShader").textContent,
            transparent: true,
            opacity: 0.6
        });
        this.wrap = new THREE.Points(bufferWrapGeom, shaderMaterial);
        this.wrap.translateX(150);

        this.scene.add(this.wrap);

        // create segments
        this.segmentsMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.275,
            vertexColors: true,
            transparent: true
        });

        this.createSegments();

        window.addEventListener("mousemove", this.mouseMovementHandler);
        window.addEventListener("resize", this.resizeHandler);
        this.canvas.addEventListener("contextmenu", this.handleContextMenu);
        document.getElementById("header-container").addEventListener("click", this.canvasClickHandler)
        this.canvas.addEventListener("click", this.canvasClickHandler)
        this.mouse = new THREE.Vector2(-100, -100);
        this.clock = new THREE.Clock();
        this.props.progressCallback(100);
        this.currHovered = [];
        this.prevHovered = [];
        this.start();
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    animate = () => {
        // Update segments positions
        const segPositions = this.segmentsGeometry.attributes.position.array;
        for (let k = 0; k < this.segmentsVertices.length; k++) {
            const v = this.segmentsVertices[k];
            segPositions[k * 3] = v.x;
            segPositions[k * 3 + 1] = v.y;
            segPositions[k * 3 + 2] = v.z;
        }
        this.segmentsGeometry.attributes.position.needsUpdate = true;
        // this.segmentsGeom.verticesNeedUpdate = true; // No longer needed

        this.wrap.rotation.z += .001;
        this.segments.rotation.z += .001;

        /*this.camera.position.x += ((this.state.mouse.x * 50) - this.camera.position.x) * .1;
        this.camera.position.y += (-(this.state.mouse.y * 50) - this.camera.position.y) * .1;
        this.camera.lookAt(this.state.origin);*/

        if (this.state.cameraStillMoving)
            this._updateCameraPosition();
        else if (!this.state.clicked) {
            this.wrap.rotation.x = ((this.state.mouse.x)) * .05;
            this.wrap.rotation.y = ((this.state.mouse.y)) * .05;
            this.segments.rotation.x = ((this.state.mouse.x)) * .05;
            this.segments.rotation.y = ((this.state.mouse.y)) * .05;
        }

        this.toMove.forEach(p => {
            this.movePoint(p);
        });

        // raycasting for dot hovering
        this.raycaster.setFromCamera(this.state.mouse, this.camera);
        var intersections = this.raycaster.intersectObjects([this.wrap], true);

        this.currHovered.forEach(i => {
            if (!intersections.some(x => x.index === i)) {
                this.currHovered.splice(this.currHovered.indexOf(i), 1);
                this.prevHovered.push(i.index);
            }
        });

        if (this.clock.getElapsedTime() >= 1) {
            if (intersections.length) {
                for (var i = 0; i < intersections.length; i++) {
                    var index = intersections[i].index;
                    if (this.currHovered.indexOf(index) === -1 && this.prevHovered.indexOf(index) === -1) {
                        var values = [[0, 1, 0.584], [1, 0.698, 0.16], [1, 0.45, 0.278]];
                        var color = Math.floor(Math.random() * values.length);
                        this.currHovered.push({ index: index, color: values[color] });
                    };
                }
            }
        }

        this.onDotHover();
        this.mouseOut();
        this.clock.getElapsedTime();
        this.attributeSizes.needsUpdate = true;
        this.attributePositions.needsUpdate = true;
        this.renderScene();
        this.frameId = requestAnimationFrame(this.animate);
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    }

    stop = () => {
        cancelAnimationFrame(this.frameId);
    }

    componentWillUnmount = () => {
        this.stop();
        window.removeEventListener("resize", this.resizeHandler);
        window.removeEventListener("mousemove", this.mouseMovementHandler);
        this.canvas.removeEventListener("contextmenu", this.handleContextMenu);
        document.getElementById("header-container").removeEventListener("click", this.canvasClickHandler);
        this.canvas.removeEventListener("click", this.canvasClickHandler);
    }

    // handlers
    mouseMovementHandler = (e) => {
        var canvasBounding = this.canvas.getBoundingClientRect();
        var x = ((e.clientX - canvasBounding.left) / this.canvas.offsetWidth) * 2 - 1;
        var y = -((e.clientY - canvasBounding.top) / this.canvas.offsetHeight) * 2 + 1;
        this.setState({
            mouse: {
                x: x,
                y: y
            }
        });
    }

    resizeHandler = (e) => {
        var width = this.canvas.offsetWidth;
        var height = this.canvas.container.offsetHeight;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvas.width = this.canvas.container.offsetWidth;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    onDotHover = () => {
        /*
            0, 1, 0.584 -> #00ff95
            1, 0.698, 0.16 -> #ffb229
            1, 0.45, 0.278 -> #ff7347
            0.278, 0.819, 1 -> #47d1ff
        */
        this.currHovered.forEach(x => {
            let r_val = x.color[0];
            let g_val = x.color[1];
            let b_val = x.color[2];
            //r
            //var distance = this.attributeColors.array[x*3] - r_val;
            this.attributeColors.array[x.index * 3] = r_val;

            //g
            //distance = this.attributeColors.array[(x*3) + 1] - g_val;
            this.attributeColors.array[(x.index * 3) + 1] = g_val;

            //b
            //distance = this.attributeColors.array[(x*3) + 2] - b_val;
            this.attributeColors.array[(x.index * 3) + 2] = b_val;
            this.attributeSizes.array[x.index] = 8;
        })
        this.attributeColors.needsUpdate = true;

    }

    mouseOut = () => {
        var step = 0.0035;

        this.prevHovered.forEach(x => {
            var done = 0;
            var original_color = this.state.colors[this.particles[x].color].toArray();
            this.attributeSizes.array[x] -= .05;
            if (this.attributeSizes.array[x] <= 4) {
                this.attributeSizes.array[x] = 4;
                done++;
            }
            for (var i = 0; i < 3; i++) {

                var sign = Math.sign(original_color[i] - this.attributeColors.array[(x * 3) + i]);
                this.attributeColors.array[(x * 3) + i] += sign * step;
                if ((sign >= 0 && this.attributeColors.array[(x * 3) + i] >= original_color[i])
                    || (sign <= 0 && this.attributeColors.array[(x * 3) + i] <= original_color[i])) {
                    this.attributeColors.array[(x * 3) + i] = original_color[i]
                    done++;
                }
            }
            if (done === 4) {
                this.prevHovered.splice(this.prevHovered.indexOf(x), 1);
            }
        })
    }

    canvasClickHandler = () => {
        if (!this.state.cameraStillMoving) {
            const nextClicked = !this.state.clicked;
            this.setState({
                clicked: nextClicked,
                cameraStillMoving: true,
                startTime: this.clock.elapsedTime,
                cameraDirection: nextClicked ? 1 : -1
            });
        }
    }

    render() {
        return null;
    }
}
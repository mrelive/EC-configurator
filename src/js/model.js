import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import FC from "./fc";
import { get as getConfig } from "./ConfigStorage";
import { CanvasRenderer } from "./utils/three/CanvasRenderer";

// generate mixer
export const mixerList = [
    { name: "Tricopter", pos: 0, model: "tricopter", image: "tri", motors: 3, servos: true },
    { name: "Quad +", pos: 1, model: "quad_x", image: "quad_p", motors: 4, servos: false },
    { name: "Quad X", pos: 2, model: "quad_x", image: "quad_x", motors: 4, servos: false },
    { name: "Bicopter", pos: 3, model: "custom", image: "bicopter", motors: 2, servos: true },
    { name: "Gimbal", pos: 4, model: "custom", image: "custom", motors: 0, servos: true },
    { name: "Y6", pos: 5, model: "y6", image: "y6", motors: 6, servos: false },
    { name: "Hex +", pos: 6, model: "hex_plus", image: "hex_p", motors: 6, servos: false },
    { name: "Flying Wing", pos: 7, model: "custom", image: "flying_wing", motors: 1, servos: true },
    { name: "Y4", pos: 8, model: "y4", image: "y4", motors: 4, servos: false },
    { name: "Hex X", pos: 9, model: "hex_x", image: "hex_x", motors: 6, servos: false },
    { name: "Octo X8", pos: 10, model: "custom", image: "octo_x8", motors: 8, servos: false },
    { name: "Octo Flat +", pos: 11, model: "custom", image: "octo_flat_p", motors: 8, servos: false },
    { name: "Octo Flat X", pos: 12, model: "custom", image: "octo_flat_x", motors: 8, servos: false },
    { name: "Airplane", pos: 13, model: "airplane", image: "airplane", motors: 1, servos: true },
    { name: "Heli 120", pos: 14, model: "custom", image: "custom", motors: 1, servos: true },
    { name: "Heli 90", pos: 15, model: "custom", image: "custom", motors: 0, servos: true },
    { name: "V-tail Quad", pos: 16, model: "quad_vtail", image: "vtail_quad", motors: 4, servos: false },
    { name: "Hex H", pos: 17, model: "custom", image: "custom", motors: 6, servos: false },
    { name: "PPM to SERVO", pos: 18, model: "custom", image: "custom", motors: 0, servos: true },
    { name: "Dualcopter", pos: 19, model: "custom", image: "custom", motors: 2, servos: true },
    { name: "Singlecopter", pos: 20, model: "custom", image: "custom", motors: 1, servos: true },
    { name: "A-tail Quad", pos: 21, model: "quad_atail", image: "atail_quad", motors: 4, servos: false },
    { name: "Custom", pos: 22, model: "custom", image: "custom", motors: 0, servos: false },
    { name: "Custom Airplane", pos: 23, model: "custom", image: "custom", motors: 1, servos: true },
    { name: "Custom Tricopter", pos: 24, model: "custom", image: "custom", motors: 3, servos: true },
    { name: "Quad X 1234", pos: 25, model: "quad_x", image: "quad_x_1234", motors: 4, servos: false },
    { name: "Octo X8 +", pos: 26, model: "custom", image: "custom", motors: 8, servos: false },
    //{ name: "Car", pos: 27, model: "car", image: "car", motors: 1, servos: true }, //  reserved for upcoming feature work
];

// 3D model
const Model = function (wrapper, canvas) {
    // Configure model detail level (1-10, where 1 is lowest detail and 10 is highest)
    this.detailTolerance = 10; // Default value, can be modified

    this.useWebGLRenderer = this.canUseWebGLRenderer();

    this.wrapper = wrapper;
    this.canvas = canvas;

    if (this.useWebGLRenderer) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas[0],
            alpha: true,
            antialias: true, // enable or disable antialiasing for performance
        });
    } else {
        console.log("Starting in low performance rendering mode");
        this.renderer = new CanvasRenderer({
            canvas: this.canvas[0],
            alpha: true,
        });
    }

    this.renderer.setSize(this.wrapper.width(), this.wrapper.height());

    // load the model including materials
    let model_file = mixerList[FC.MIXER_CONFIG.mixer - 1]?.model;

    // Temporary workaround for 'custom' model until akfreak's custom model is merged.
    if (model_file === "custom") {
        model_file = "fallback";
    }

    // Setup scene
    this.scene = new THREE.Scene();
    this.modelWrapper = new THREE.Object3D();

    // Stationary camera
    this.camera = new THREE.PerspectiveCamera(60, this.wrapper.width() / this.wrapper.height(), 1, 10000);
    // move camera away from the model
    this.camera.position.z = 125;

    // Setup lights - Cyberpunk Style
    // Dark ambient to make neon pop
    const ambientLight = new THREE.AmbientLight(0x202030); // Slightly brighter ambient
    this.scene.add(ambientLight);

    // Overhead cool white light
    const overheadLight = new THREE.DirectionalLight(0xddeeff, 1.2); // Increased intensity
    overheadLight.position.set(0, 1, 0);
    this.scene.add(overheadLight);

    // Fill light from the front-left to even out shadows
    const fillLight = new THREE.DirectionalLight(0xaaccff, 0.5);
    fillLight.position.set(-1, 0.5, 1);
    this.scene.add(fillLight);

    // Neon Pink (Magenta) Light - Left
    const neonPink = new THREE.PointLight(0xff00ff, 2.0, 500); // Increased intensity
    neonPink.position.set(-100, 50, 50);
    this.scene.add(neonPink);

    // Neon Cyan Light - Right
    const neonCyan = new THREE.PointLight(0x00ffff, 2.0, 500); // Increased intensity
    neonCyan.position.set(100, 50, 50);
    this.scene.add(neonCyan);

    // Neon Purple Underglow
    const neonPurple = new THREE.PointLight(0xaa00ff, 1.5, 300); // Increased intensity
    neonPurple.position.set(0, -50, 0);
    this.scene.add(neonPurple);
    this.scene.add(this.camera);
    this.scene.add(this.modelWrapper);

    this.loadGLTF(
        model_file,
        function (model) {
            if (!model) {
                console.warn(`Failed to load model: ${model_file}`);
                return;
            }

            this.model = model;

            // Apply canvas renderer optimizations if needed
            if (!this.useWebGLRenderer) {
                this.applyCanvasRendererOptimizations();
            }

            this.modelWrapper.add(model);
            this.scene.add(this.modelWrapper);

            this.render();
        }.bind(this),
    );
};

Model.prototype.loadGLTF = function (model_file, callback) {
    const loader = new GLTFLoader();

    const load = (extension) => {
        loader.load(
            `./resources/models/${model_file}.${extension}`,
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(25, 25, 25);
                callback(model);
            },
            (progress) => {
                // Optional: Handle loading progress
                if (progress.total > 0) {
                    const pct = Math.round((progress.loaded / progress.total) * 100);
                    if (pct !== this._lastPct) {
                        // throttle identical values
                        this._lastPct = pct;
                        console.log(`Loading progress: ${progress.loaded}/${progress.total} (${pct}%)`);
                    }
                } else {
                    console.log(`Loading progress: ${progress.loaded} bytes`);
                }
            },
            (error) => {
                if (extension === "glb") {
                    console.log(`Failed to load ${model_file}.glb, falling back to .gltf`);
                    // Try fallback to gltf
                    load("gltf");
                } else {
                    console.error(`Error loading model ${model_file}.${extension}:`, error);
                    // Fallback to a default model or show error to user
                    callback(null);
                }
            },
        );
    };

    // Try loading .glb first, then fallback to .gltf
    load("glb");
};

Model.prototype.optimizeGeometry = function (geometry) {
    if (!this.useWebGLRenderer) {
        this.optimizeGeometryForCanvas(geometry);
    }
};

Model.prototype.createModel = function (geometry, materials) {
    const model = new THREE.Mesh(geometry, materials);
    model.scale.set(25, 25, 25);
    return model;
};

Model.prototype.optimizeGeometryForCanvas = function (geometry) {
    // Aggressive geometry optimizations for Canvas renderer
    geometry.mergeVertices();

    const tolerance = this.detailTolerance; // Use the configurable tolerance
    const vertexMap = {};
    const uniqueVertices = [];
    const updatedFaces = [];

    geometry.vertices.forEach((vertex) => {
        // Round coordinates with configurable tolerance
        const key = [
            Math.round(vertex.x * tolerance) / tolerance,
            Math.round(vertex.y * tolerance) / tolerance,
            Math.round(vertex.z * tolerance) / tolerance,
        ].join(",");

        if (vertexMap[key] === undefined) {
            vertexMap[key] = uniqueVertices.length;
            uniqueVertices.push(vertex);
        }
    });

    // Update faces to use new vertex indices
    geometry.faces.forEach((face) => {
        const v1 = geometry.vertices[face.a];
        const v2 = geometry.vertices[face.b];
        const v3 = geometry.vertices[face.c];

        const key1 = [
            Math.round(v1.x * tolerance) / tolerance,
            Math.round(v1.y * tolerance) / tolerance,
            Math.round(v1.z * tolerance) / tolerance,
        ].join(",");
        const key2 = [
            Math.round(v2.x * tolerance) / tolerance,
            Math.round(v2.y * tolerance) / tolerance,
            Math.round(v2.z * tolerance) / tolerance,
        ].join(",");
        const key3 = [
            Math.round(v3.x * tolerance) / tolerance,
            Math.round(v3.y * tolerance) / tolerance,
            Math.round(v3.z * tolerance) / tolerance,
        ].join(",");

        // Only keep faces that have three different vertices
        if (
            vertexMap[key1] !== vertexMap[key2] &&
            vertexMap[key2] !== vertexMap[key3] &&
            vertexMap[key1] !== vertexMap[key3]
        ) {
            const newFace = face.clone();
            newFace.a = vertexMap[key1];
            newFace.b = vertexMap[key2];
            newFace.c = vertexMap[key3];
            updatedFaces.push(newFace);
        }
    });

    // Update geometry with simplified data
    geometry.vertices = uniqueVertices;
    geometry.faces = updatedFaces;

    geometry.computeBoundingSphere();
    geometry.computeFaceNormals();
};

Model.prototype.canUseWebGLRenderer = function () {
    // webgl capability detector
    // it would seem the webgl "enabling" through advanced settings will be ignored in the future
    // and webgl will be supported if gpu supports it by default (canary 40.0.2175.0), keep an eye on this one
    const detector_canvas = document.createElement("canvas");
    const isWebGLSupported =
        window.WebGLRenderingContext &&
        (detector_canvas.getContext("webgl") || detector_canvas.getContext("experimental-webgl"));
    const { useLegacyRenderingModel } = getConfig("useLegacyRenderingModel");
    return isWebGLSupported && !useLegacyRenderingModel;
};

Model.prototype.rotateTo = function (x, y, z) {
    if (!this.model) {
        return;
    }

    this.model.rotation.x = x;
    this.modelWrapper.rotation.y = y;
    this.model.rotation.z = z;

    this.render();
};

Model.prototype.rotateBy = function (x, y, z) {
    if (!this.model) {
        return;
    }

    this.model.rotateX(x);
    this.model.rotateY(y);
    this.model.rotateZ(z);

    this.render();
};

Model.prototype.render = function () {
    if (!this.model) {
        return;
    }

    if (!this.useWebGLRenderer) {
        this.applyCullingOptimizations();
    }

    this.updateMatrices();
    this.performRender();
};

Model.prototype.applyCullingOptimizations = function () {
    const modelForward = new THREE.Vector3(0, 0, 1);
    modelForward.applyQuaternion(this.model.quaternion);
    const dot = modelForward.dot(new THREE.Vector3(0, 0, 1));
    const cullBackFaces = dot > 0;

    if (this.model.material) {
        this.model.material.side = cullBackFaces ? THREE.FrontSide : THREE.DoubleSide;
    }
};

Model.prototype.updateMatrices = function () {
    this.model.updateMatrix();
    this.model.updateMatrixWorld();
    this.modelWrapper.updateMatrix();
    this.modelWrapper.updateMatrixWorld();
};

Model.prototype.performRender = function () {
    this.renderer.render(this.scene, this.camera);
};

// handle canvas resize
Model.prototype.resize = function () {
    this.renderer.setSize(this.wrapper.width(), this.wrapper.height());

    this.camera.aspect = this.wrapper.width() / this.wrapper.height();
    this.camera.updateProjectionMatrix();

    this.render();
};

Model.prototype.dispose = function () {
    if (this.renderer) {
        if (this.renderer.forceContextLoss) {
            this.renderer.forceContextLoss();
        }
        if (this.renderer.dispose) {
            this.renderer.dispose();
        }
        this.renderer = null;
    }
};

Model.prototype.applyCanvasRendererOptimizations = function () {
    // Scene optimizations
    this.scene.autoUpdate = true;

    // Camera optimizations
    this.camera.matrixAutoUpdate = false;
    this.camera.updateMatrix();
    this.camera.updateMatrixWorld();

    // Model and wrapper optimizations
    if (this.model) {
        this.model.matrixAutoUpdate = false;
        this.model.frustumCulled = false;
        this.model.renderOrder = 0;
    }

    this.modelWrapper.matrixAutoUpdate = false;
    this.modelWrapper.updateMatrix();
    this.modelWrapper.updateMatrixWorld();

    // Light optimizations
    this.scene.children.forEach((child) => {
        if (child.isLight) {
            child.matrixAutoUpdate = false;
            child.updateMatrix();
        }
    });
};

export default Model;

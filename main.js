import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/GLTFLoader.js';

// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer));

// Iluminación
const light = new THREE.PointLight(0xffffff, 0.15);
light.position.set(0, 0.08, 0.1);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Cargar el modelo GLTF con texturas
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    'models/sistema10.gltf', // Ruta al archivo GLTF
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Ajusta la escala del modelo
        model.position.set(0, 0, 0);    // Ajusta la posición del modelo
        scene.add(model);

        console.log('Modelo GLTF cargado correctamente.');
    },
    (xhr) => {
        // Muestra el progreso de la carga
        console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
    }
);

// Renderizado en bucle
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
});

import * as THREE from "./assets/vendor/three/three.module.js";
import { SVGLoader } from "./assets/vendor/three/SVGLoader.js";

const plaque = document.querySelector(".footer-signature");

if (plaque) {
  plaque.querySelectorAll("[data-signature-text]").forEach((element) => {
    [...element.dataset.signatureText].forEach((character, index) => {
      const letter = document.createElement("span");
      letter.textContent = character;
      if (character === "0") letter.className = "zero";
      letter.style.setProperty("--signature-index", index);
      element.append(letter);
    });
  });

  const canvas = plaque.querySelector("canvas");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(72, 72, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 7.2;
    scene.add(new THREE.HemisphereLight(0xffe4c7, 0x38251a, 1.5));
    const light = new THREE.DirectionalLight(0xffd09a, 3.5);
    light.position.set(-3, 4, 6);
    scene.add(light);

    const response = await fetch("assets/footer/mark.svg");
    const svg = new SVGLoader().parse(await response.text());
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0x744324, roughness: 0.56 });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 signatureWorldPosition;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nsignatureWorldPosition = position;");
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying vec3 signatureWorldPosition;")
        .replace(
          "#include <color_fragment>",
          "#include <color_fragment>\nfloat signatureGrain = sin(signatureWorldPosition.x * .31 + sin(signatureWorldPosition.y * .019) * 1.35 + sin(signatureWorldPosition.x * .033 + signatureWorldPosition.y * .011) * 1.8);\nfloat signatureFine = sin(signatureWorldPosition.x * .87 + sin(signatureWorldPosition.y * .037) * 1.2);\nfloat signatureFleck = sin(signatureWorldPosition.x * .17 + signatureWorldPosition.y * .21) * sin(signatureWorldPosition.x * .07 - signatureWorldPosition.y * .09);\ndiffuseColor.rgb *= .91 + signatureGrain * .045 + signatureFine * .018 + signatureFleck * .015;"
        );
    };
    for (const path of svg.paths) {
      for (const shape of SVGLoader.createShapes(path)) {
        group.add(new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 10, bevelEnabled: true, bevelThickness: 1.5, bevelSize: 1.3, bevelSegments: 3 }), material));
      }
    }
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    group.position.set(-center.x, -center.y, -center.z);
    const root = new THREE.Group();
    root.scale.setScalar(3.65 / Math.max(size.x, size.y));
    root.scale.y *= -1;
    root.add(group);
    scene.add(root);
    plaque.classList.add("is-3d-ready");

    let start = 0;
    let spinning = false;
    const play = () => { if (!reduced.matches) { start = performance.now(); spinning = true; } };
    plaque.addEventListener("pointerenter", play);
    plaque.addEventListener("focus", play);
    const tick = (now) => {
      if (spinning) {
        const progress = Math.min((now - start) / 3200, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        root.rotation.y = ease * Math.PI * 2;
        light.position.x = -3 + Math.sin(ease * Math.PI * 2) * 3;
        if (progress === 1) { root.rotation.y = 0; spinning = false; }
      }
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  } catch (error) {
    console.warn("Footer signature 3D fallback enabled", error);
  }
}

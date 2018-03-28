import DisplayObject from './DisplayObject';
import PerspectiveCamera from './PerspectiveCamera';
import Ray3 from './math/Ray3';
import Color from './Color';
import Light from './Light';
import PhongMaterial from './PhoneMaterial';

export function rayTraceRecursive(
    scene: DisplayObject,
    ray: Ray3,
    light: Light,
    maxReflect: number
) {
    const result = scene.intersect(ray);
    const material = result.geometry && result.geometry.material;

    if (material) {
        let color = material.sample(ray, result.position, result.normal, light);
        const { reflectiveness } = material as PhongMaterial;
        if (reflectiveness) {
            color = color.multiply(1 - reflectiveness);
        }

        if (reflectiveness > 0 && maxReflect > 0) {
            const r = result.normal
                .multiply(-2 * result.normal.dot(ray.direction))
                .add(ray.direction);
            ray = new Ray3(result.position, r);
            const reflectedColor = rayTraceRecursive(
                scene,
                ray,
                light,
                maxReflect - 1
            );
            color = color.add(reflectedColor.multiply(reflectiveness));
        }
        return color;
    } else {
        return Color.black;
    }
}

export function rayTraceReflection(
    canvas: { ctx: CanvasRenderingContext2D; width: number; height: number },
    scene: DisplayObject,
    light: Light,
    camera: PerspectiveCamera,
    maxReflect: number
) {
    scene.initialize();
    camera.initialize();

    const w = canvas.width;
    const h = canvas.height;

    const ctx = canvas.ctx!;
    const imageData = ctx.getImageData(0, 0, w, h);
    const pixels = imageData.data;

    let i = 0;
    for (let y = 0; y < h; y++) {
        const sy = 1 - y / h;
        for (let x = 0; x < w; x++) {
            const sx = x / w;
            const ray = camera.generateRay(sx, sy);
            const color = rayTraceRecursive(scene, ray, light, maxReflect);
            pixels[i++] = color.r * 255;
            pixels[i++] = color.g * 255;
            pixels[i++] = color.b * 255;
            pixels[i++] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

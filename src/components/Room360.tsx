import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HOTSPOTS } from "../config/site";

const R = 40; // hotspot radius — inside the 60-unit sky sphere

function sph(lon: number, lat: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}



/**
 * Equirectangular panorama viewer. The camera sits at the centre of a sphere
 * whose normals are flipped, so the photograph wraps around the viewer —
 * a full room for the cost of one image instead of megabytes of geometry.
 */
export default function Room360({ src }: { src: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const hotspotRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(74, el.clientWidth / el.clientHeight, 1, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(60, 60, 40);
    geometry.scale(-1, 1, 1); // turn the sphere inside out

    const texture = new THREE.TextureLoader().load(src, () => setReady(true));
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
    scene.add(mesh);

    // ── look controls ────────────────────────────────────────────────
    let lon = 0;
    let lat = 0;
    let dragging = false;
    let autoSpin = true;
    let px = 0;
    let py = 0;
    let plon = 0;
    let plat = 0;

    const down = (e: PointerEvent) => {
      dragging = true;
      autoSpin = false;
      px = e.clientX;
      py = e.clientY;
      plon = lon;
      plat = lat;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      lon = plon - (e.clientX - px) * 0.16;
      lat = THREE.MathUtils.clamp(plat + (e.clientY - py) * 0.16, -70, 70);
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    // ── render loop ──────────────────────────────────────────────────
    const points = HOTSPOTS.map((h) => {
      const vec = sph(h.lon, h.lat, R);
      return { vec, unit: vec.clone().normalize() };
    });
    const projected = new THREE.Vector3();
    const dir = new THREE.Vector3();

    // Eased look direction — the raw pointer delta is applied to a target and
    // the camera chases it, which is what makes dragging feel weighted rather
    // than twitchy.
    let viewLon = lon;
    let viewLat = lat;
    let frame = 0;

    const render = () => {
      frame = requestAnimationFrame(render);
      if (autoSpin && !dragging) lon += 0.03;

      viewLon += (lon - viewLon) * 0.09;
      viewLat += (lat - viewLat) * 0.09;

      camera.lookAt(sph(viewLon, viewLat, 1));
      renderer.render(scene, camera);

      // Hotspots are positioned by writing transforms straight to the DOM.
      // Routing this through React state re-rendered the tree ~20x a second
      // and was the single biggest source of jank in this section.
      camera.getWorldDirection(dir);
      for (let i = 0; i < points.length; i++) {
        const el = hotspotRefs.current[i];
        if (!el) continue;
        const p = points[i];
        projected.copy(p.vec).project(camera);
        const visible =
          p.unit.dot(dir) > 0.12 && Math.abs(projected.x) < 0.92 && Math.abs(projected.y) < 0.9;
        el.style.opacity = visible ? "1" : "0";
        el.style.pointerEvents = visible ? "auto" : "none";
        if (visible) {
          el.style.left = `${(projected.x * 0.5 + 0.5) * 100}%`;
          el.style.top = `${(-projected.y * 0.5 + 0.5) * 100}%`;
        }
      }
    };
    render();

    const onResize = () => {
      if (!el.clientWidth) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      geometry.dispose();
      texture.dispose();
      (mesh.material as THREE.Material).dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [src]);

  return (
    <div className="absolute inset-0">
      <div ref={mount} className="h-full w-full cursor-grab touch-none active:cursor-grabbing" />

      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink">
          <span className="eyebrow animate-pulse !text-bone/50">Loading room…</span>
        </div>
      )}

      {HOTSPOTS.map((spot, i) => (
        <a
          key={spot.id}
          ref={(el) => {
            hotspotRefs.current[i] = el;
          }}
          href="/quote"
          aria-label={`${spot.label}, ${spot.price} — get a quote`}
          className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ${
            ready ? "" : "invisible"
          }`}
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay/50" />
            <span className="relative h-3 w-3 rounded-full bg-clay ring-4 ring-bone/30" />
          </span>
          <span className="pointer-events-none absolute left-10 top-1/2 w-max -translate-y-1/2 rounded-lg bg-bone/95 px-3 py-2 text-left opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <span className="block text-xs font-medium text-ink">{spot.label}</span>
            <span className="block font-mono text-[0.65rem] text-clay">{spot.price}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

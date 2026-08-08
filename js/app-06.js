
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';

(function(){
  const canvas = document.getElementById('nura-wave-canvas');
  if(!canvas || !window.WebGLRenderingContext) return;

  const Lerp  = (a,b,t)=>a+(b-a)*t;
  const clamp = (v,lo,hi)=>Math.max(lo,Math.min(hi,v));

  function hexToVec3(hex){
    const h = (hex||'#92A0AE').trim();
    const n = parseInt(h.replace('#',''),16) || 0x92A0AE;
    return new THREE.Vector3(((n>>16)&255)/255, ((n>>8)&255)/255, (n&255)/255);
  }
  function darkenHex(hex, amt){
    const h = (hex||'#92A0AE').trim();
    const n = parseInt(h.replace('#',''),16) || 0x92A0AE;
    const r = Math.round(((n>>16)&255)*amt), g = Math.round(((n>>8)&255)*amt), b = Math.round((n&255)*amt);
    return new THREE.Vector3(r/255,g/255,b/255);
  }
  function getUIColors(){
    const cs = getComputedStyle(document.documentElement);
    const accent2 = cs.getPropertyValue('--accent2') || '#92A0AE';
    return {
      high:   hexToVec3(accent2),
      low:    darkenHex(accent2, 0.09),
      atmo:   hexToVec3(accent2)
    };
  }

  // Tunables (colors are dynamic â€” pulled from the live UI theme)
  const opacity = 0.26, pointSize = 5.0, brightness = 0.55;
  const waveHeight = 3, flow = 1, scale = 0.275;
  const atmoCount = 220, atmoSize = 22, atmoSpeed = 1.0;
  const camStartY = 7, camStartZ = 16, camEndY = 1.4, camEndZ = 3.2;
  const lookStartZ = 2, lookEndZ = -6;
  const parallax = 1.0, pointerRadius = 7.0, pointerStrength = 0.7;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 0, 20);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 400);
  camera.position.set(0, camStartY, camStartZ);
  scene.add(camera);

  const group = new THREE.Group();
  scene.add(group);

  const uiColors = getUIColors();

  const SNOISE = `
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }`;

  const vertexShader = `
  uniform float uTime; uniform float uStream; uniform float uSize; uniform float uWaveHeight; uniform float uFlow; uniform float uScale;
  uniform vec3 uColLow; uniform vec3 uColHigh;
  uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
  varying float vFade; varying vec3 vColor;
  ${SNOISE}
  void main() {
    vec3 wp = vec3(position.x * 13.0, 0.0, position.z * 25.0);
    wp.x += position.y * 6.0;
    float zc = wp.z + uStream;
    float wn = snoise(vec3(wp.x * 0.08, zc * 0.08, uTime * 0.15 * uFlow)) * 2.0;
    wn += snoise(vec3(wp.x * 0.16, zc * 0.16, uTime * 0.3 * uFlow)) * 0.8;
    wp.y += wn * uWaveHeight;

    vec3 finalPos = wp * uScale;
    vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
    vec3 toP = modelPosition.xyz - uCursor;
    float cd = length(toP);
    float fall = smoothstep(uRepelRadius, 0.0, cd);
    modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
    vec4 mvPosition = viewMatrix * modelPosition;

    float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
    vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
    vFade = 1.0;

    gl_PointSize = uSize * (10.0 / -mvPosition.z);
    gl_PointSize = max(gl_PointSize, 1.5);
    gl_Position = projectionMatrix * mvPosition;
  }`;

  const fragmentShader = `
  uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
  varying float vFade; varying vec3 vColor;
  void main() {
    vec2 xy = gl_PointCoord - 0.5;
    float ll = length(xy);
    if (ll > 0.5) discard;
    float a = smoothstep(0.5, 0.1, ll);
    gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
  }`;

  const uniforms = {
    uTime:{value:0}, uStream:{value:0}, uAppear:{value:0},
    uColLow:{value:uiColors.low}, uColHigh:{value:uiColors.high},
    uOpacity:{value:opacity}, uSize:{value:pointSize}, uBrightness:{value:brightness},
    uWaveHeight:{value:waveHeight}, uFlow:{value:flow}, uScale:{value:scale},
    uCursor:{value:new THREE.Vector3()}, uRepelRadius:{value:pointerRadius},
    uRepelStrength:{value:pointerStrength}, uActivity:{value:0}
  };

  const geometry = new THREE.SphereGeometry(4.2, 140, 380);
  const material = new THREE.ShaderMaterial({
    vertexShader, fragmentShader, uniforms,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  group.add(points);

  // Ambient drifting motes
  const N = atmoCount;
  const positions = new Float32Array(N*3), sizes = new Float32Array(N), seeds = new Float32Array(N);
  for(let i=0;i<N;i++){
    positions[i*3]   = 2*Math.random()-1;
    positions[i*3+1] = 2*Math.random()-1;
    positions[i*3+2] = 2*Math.random()-1;
    sizes[i] = atmoSize * (0.4+Math.random());
    seeds[i] = Math.random();
  }
  const atmoGeo = new THREE.BufferGeometry();
  atmoGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  atmoGeo.setAttribute('size', new THREE.BufferAttribute(sizes,1));
  atmoGeo.setAttribute('seed', new THREE.BufferAttribute(seeds,1));

  const atmoUniforms = { uTime:{value:0}, uColor:{value:uiColors.atmo}, uRes:{value:new THREE.Vector2(window.innerWidth*devicePixelRatio, window.innerHeight*devicePixelRatio)} };
  const atmoVert = `
  attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
  varying float vA;
  vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
    p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
    p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
    return cos(p+vec3(1,2,4)); }
  void main(){
    vec3 v = position*4.0 + warp(position, uTime)*1.2;
    vec4 mv = modelViewMatrix * vec4(v, 1.0);
    float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
    vA = farF * nearF;
    gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
    gl_Position = projectionMatrix * mv;
  }`;
  const atmoFrag = `
  uniform vec3 uColor; varying float vA;
  void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
    float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.5); }`;

  const atmoMat = new THREE.ShaderMaterial({
    vertexShader:atmoVert, fragmentShader:atmoFrag, uniforms:atmoUniforms,
    transparent:true, blending:THREE.AdditiveBlending, depthWrite:false, depthTest:false
  });
  const motes = new THREE.Points(atmoGeo, atmoMat);
  motes.frustumCulled = false;
  scene.add(motes);

  // Bloom glow composer
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.6, 0.15));
  composer.addPass(new ShaderPass(GammaCorrectionShader));

  // Pointer state (mouse parallax + surface-parting ripple)
  const mouseTarget = {x:0,y:0}, mouse = {x:0,y:0};
  const POINTER = { world: new THREE.Vector3(), activity:0, active:false, lastMove: performance.now() };
  window.addEventListener('mousemove', (e)=>{
    mouseTarget.x = (e.clientX/window.innerWidth)*2-1;
    mouseTarget.y = -((e.clientY/window.innerHeight)*2-1);
    POINTER.active = true; POINTER.lastMove = performance.now();
  }, {passive:true});
  window.addEventListener('mouseout', ()=>{ POINTER.active = false; });

  const _ndc = new THREE.Vector3(), _dir = new THREE.Vector3(), _tgt = new THREE.Vector3();
  function updatePointerWorld(){
    _tgt.set(0,0,0);
    if(POINTER.active){
      _ndc.set(mouse.x, mouse.y, 0.5).unproject(camera);
      _dir.copy(_ndc).sub(camera.position).normalize();
      const dn = _dir.z;
      if(Math.abs(dn) > 1e-4){
        const tt = -camera.position.z/dn;
        if(tt>0 && Number.isFinite(tt)) _tgt.copy(camera.position).addScaledVector(_dir, tt);
      }
    }
    POINTER.world.lerp(_tgt, 0.12);
    const idle = (performance.now()-POINTER.lastMove)/1000;
    POINTER.activity += (((POINTER.active && idle<3)?1:0) - POINTER.activity) * 0.06;
  }

  let stream = 0, t0 = performance.now()/1000, appearStart = performance.now();
  const entranceDuration = 2600; // ms â€” one-time settle-in dive (no page scroll in this app)

  let lastColorCheck = 0;
  function updateColors(){
    const c = getUIColors();
    uniforms.uColLow.value.copy(c.low);
    uniforms.uColHigh.value.copy(c.high);
    atmoUniforms.uColor.value.copy(c.atmo);
  }

  let running = false, rafId = null;
  function frame(){
    if(!running) return;
    rafId = requestAnimationFrame(frame);

    const now = performance.now();
    if(now - lastColorCheck > 1200){ updateColors(); lastColorCheck = now; }

    const t = now/1000;
    const dt = Math.min(0.05, t - t0); t0 = t;
    uniforms.uTime.value = t;
    stream += dt * (flow*2.0) * 3.2;
    uniforms.uStream.value = stream;

    mouse.x = Lerp(mouse.x, mouseTarget.x, 0.06);
    mouse.y = Lerp(mouse.y, mouseTarget.y, 0.06);

    const ea = clamp((now-appearStart)/entranceDuration, 0, 1);
    const e = ea*ea*(3-2*ea);
    uniforms.uWaveHeight.value = waveHeight * (1 + e*0.4);

    const camY = Lerp(camStartY, camEndY, e);
    const camZ = Lerp(camStartZ, camEndZ, e);
    camera.position.set(mouse.x*parallax, camY + mouse.y*parallax*0.25, camZ);
    camera.lookAt(mouse.x*parallax*0.5, Lerp(0.0,0.5,e), Lerp(lookStartZ, lookEndZ, e));

    updatePointerWorld();
    uniforms.uCursor.value.copy(POINTER.world);
    uniforms.uActivity.value = POINTER.activity;

    const elapsed = (now - appearStart)/1000;
    uniforms.uAppear.value = clamp((elapsed-0.15)/1.2, 0, 1);

    atmoUniforms.uTime.value = t * atmoSpeed * 8.0;
    motes.position.copy(camera.position);

    composer.render();
  }
  function start(){
    if(running) return;
    running = true;
    appearStart = performance.now();
    t0 = performance.now()/1000;
    frame();
  }
  function stop(){
    running = false;
    if(rafId) cancelAnimationFrame(rafId);
  }

  function onResize(){
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(w,h,false);
    camera.aspect = w/h; camera.updateProjectionMatrix();
    composer.setSize(w,h);
    atmoUniforms.uRes.value.set(w*devicePixelRatio, h*devicePixelRatio);
  }
  window.addEventListener('resize', onResize, {passive:true});
  onResize();

  // Runs continuously across the whole app (visible in the negative space
  // behind panels/cards since the root background is now translucent).
  // Pause only when the tab is hidden, to save battery/GPU.
  start();
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden) stop(); else start();
  });
})();

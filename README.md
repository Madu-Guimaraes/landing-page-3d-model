# Lady's Bag - Landing Page 👜

![imagem-final]()

## Visão Geral 💡

**Lady's Bag** é uma landing page interativa e moderna, desenvolvida para destacar uma coleção de bolsas elegantes e versáteis. A página combina um design visualmente atraente com animações 3D sofisticadas, proporcionando uma experiência de navegação imersiva e envolvente para o usuário. O projeto foi criado com o objetivo de explorar e testar diversas bibliotecas, como Three.js e GSAP, ampliando o conhecimento sobre renderização 3D e animações dinâmicas no contexto web.

## Funcionalidades ⚙️

- Animações 3D: Integração de um modelo de bolsa 3D interativo, que reage ao scroll da página usando Three.js e GSAP.
- Interações Suaves: Animações suaves com rotação e movimento do modelo 3D, além de ajustes de escala para diferentes resoluções de tela.
- Galeria de Produtos: Exibição de bolsas com imagens e preços detalhados.
- Newsletter: Seção de inscrição para receber novidades diretamente por e-mail.

## Tecnologias Usadas 📌

- HTML5
- CSS3
- JavaScript
  - Three.js: Para renderização do modelo 3D da bolsa.
  - GSAP: Para animação suave do modelo 3D e interação com o scroll.
  - ScrollTrigger: Plugin do GSAP para animação de elementos baseada no scroll da página.

## Conceitos aprendidos 📖

### Three.js:
1. **Renderização 3D no navegador**:
   - O Three.js foi utilizado para criar uma cena 3D e renderizar o modelo diretamente no navegador.
   ```javascript
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   const renderer = new THREE.WebGLRenderer({ alpha: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   ```

2. **Importação e manipulação de modelos 3D**:
   - O modelo da bolsa foi importado e manipulado para se ajustar à cena.
   ```javascript
   const loader = new THREE.GLTFLoader();
   loader.load('path/to/model.glb', function(gltf) {
       const model = gltf.scene;
       model.scale.set(2, 2, 2);
       scene.add(model);
   });
   ```

3. **Câmera e iluminação**:
   - A câmera foi configurada para oferecer uma boa perspectiva, e uma luz ambiente foi adicionada para iluminar o modelo.
   ```javascript
   camera.position.z = 5;
   const ambientLight = new THREE.AmbientLight(0xffffff, 1);
   scene.add(ambientLight);
   ```

### GSAP (GreenSock Animation Platform):
1. **Animações suaves e precisas**:
   - GSAP foi usado para animar a rotação suave do modelo da bolsa.
   ```javascript
   gsap.to(model.rotation, { 
       y: Math.PI * 2, 
       duration: 3, 
       ease: "power1.inOut", 
       repeat: -1 
   });
   ```

2. **Integração com Three.js**:
   - As animações foram aplicadas diretamente no modelo 3D importado.
   ```javascript
   gsap.to(model.position, {
       x: 2,
       duration: 2,
       ease: "power1.out"
   });
   ```

3. **Timeline para controle de animações complexas**:
   - Foi criada uma `Timeline` para orquestrar diferentes animações.
   ```javascript
   const tl = gsap.timeline();
   tl.to(model.rotation, { x: Math.PI, duration: 1 });
   tl.to(model.position, { z: -2, duration: 2 });
   ```

### ScrollTrigger:
1. **Animação baseada em scroll**:
   - O ScrollTrigger foi usado para iniciar animações quando o usuário rola a página.
   ```javascript
   gsap.registerPlugin(ScrollTrigger);
   gsap.to(model.rotation, {
       y: Math.PI * 2,
       scrollTrigger: {
           trigger: ".trigger-element",
           start: "top center",
           end: "bottom top",
           scrub: true
       }
   });
   ```

2. **Sincronização de elementos com o scroll**:
   - Animações foram ativadas e sincronizadas conforme o modelo entra e sai de vista.
   ```javascript
   ScrollTrigger.create({
       trigger: ".another-section",
       start: "top bottom",
       onEnter: () => gsap.to(model.position, { x: 0, duration: 1 }),
       onLeave: () => gsap.to(model.position, { x: -3, duration: 1 })
   });
   ```

3. **Responsividade e personalização das animações**:
   - O comportamento foi ajustado para diferentes dispositivos, garantindo a responsividade.
   ```javascript
   ScrollTrigger.matchMedia({
       "(min-width: 768px)": function() {
           gsap.to(model.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 });
       },
       "(max-width: 767px)": function() {
           gsap.to(model.scale, { x: 1, y: 1, z: 1, duration: 1 });
       }
   });
   ```

## Link para o deploy 🌐

[Projeto Lady's Bag - Landing Page]()

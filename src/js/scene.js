// Cria uma cena Three.JS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("root-3d-bolsa").appendChild(renderer.domElement);

let object;

// Função para ajustar a escala e posição do modelo 3D com base na largura da tela
function ajustarEscalaEPosicao() {
    if (window.matchMedia("(max-width: 425px)").matches) {
        object.scale.set(8, 8, 8); // Escala final para telas pequenas
        object.position.set(0, -3.9, 0); // Posição final na seção "sobre" para telas pequenas
    }else if (window.matchMedia("(max-width: 768px)").matches) {
        object.scale.set(11, 11, 11); // Escala final para tablets
        object.position.set(0, -3, 0); // Posição final na seção "sobre" para tablets
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
        object.scale.set(15, 15, 15); // Escala final para desktops menores
        object.position.set(0, -3, 0); // Posição final na seção "sobre" para desktops menores
    } else {
        object.position.set(7, -3, 0); // Posição inicial da bolsa
        object.scale.set(14, 14, 14); // Tamanho inicial da bolsa
    }
}

// Carrega o modelo GLTF
const loader = new THREE.GLTFLoader();
loader.load(
    `src/public/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        console.log("Modelo carregado:", object);
        scene.add(object);

        // Inicializa a posição e a escala
        ajustarEscalaEPosicao(); // Ajusta a escala e a posição de acordo com a largura da tela

        // Registra o ScrollTrigger no GSAP
        gsap.registerPlugin(ScrollTrigger);

        // Animação da rotação da bolsa com base no scroll
        gsap.to(object.rotation, {
            y: Math.PI * 2, // Gira 360°
            scrollTrigger: {
                trigger: document.querySelector("#inicio"),
                start: "top top",
                endTrigger: document.querySelector("#inicio"),
                end: "top top", // Ajusta o final para antes de chegar na seção "sobre"
                scrub: 3,
            }
        });

        // Animação da posição e visibilidade com base no scroll
        gsap.to(object.position, {
            x: window.matchMedia("(min-width: 1025px)").matches ? -6 : 0, // Move para o canto esquerdo ou mantém centralizado
            y: window.matchMedia("(min-width: 1025px)").matches ? 2 : 0, // Ajuste vertical ou mantém no centro
            scrollTrigger: {
                trigger: document.querySelector("#inicio"),
                start: "top top",
                endTrigger: document.querySelector("#sobre"),
                end: "bottom center", // Ajusta o final para o final da seção "sobre"
                scrub: 3,
                onUpdate: (self) => {
                    const progress = self.progress;
                    object.rotation.y = progress * Math.PI * 2; // Gira 360° com base no progresso
                    if (!window.matchMedia("(max-width: 768px)").matches) {
                        const scaleAdjustment = window.matchMedia("(min-width: 1025px)").matches ? progress * 3 : 0;
                        object.scale.set(13 + scaleAdjustment, 13 + scaleAdjustment, 13 + scaleAdjustment); // Aumenta a escala
                    }
                },
                onComplete: () => {
                    ajustarEscalaEPosicaoNaSobre();
                    object.rotation.y = 0; // Parar a rotação e garantir que fique de frente
                }
            }
        });

        // Controle de visibilidade do modelo 3D ao se aproximar da seção "produtos"
        gsap.to(object, {
            scrollTrigger: {
                trigger: document.querySelector("#produtos"),
                start: "top center",
                end: "bottom center", 
                scrub: 1,
                onEnter: () => {
                    object.visible = false; // Esconde o modelo 3D
                },
                onLeaveBack: () => {
                    object.visible = true; // Mostra o modelo 3D novamente quando volta ao topo
                }
            }
        });

        // Lógica para esconder o modelo 3D quando a seção "sobre" aparecer e mostrá-lo novamente no "inicio"
        ScrollTrigger.create({
            trigger: document.querySelector("#sobre"),
            start: "top center", // Quando a seção "sobre" começar a aparecer
            end: "bottom center",
            onEnter: () => {
                if (window.matchMedia("(max-width: 1024px)").matches) {
                    object.visible = false; // Esconde o modelo 3D
                }
            },
            onLeaveBack: () => {
                object.visible = true; // Mostra o modelo 3D novamente quando voltar ao "inicio"
            }
        });
    },
    undefined,
    function (error) {
        console.error("Erro ao carregar o modelo:", error);
    }
);

// Função para ajustar escala e posição na seção "sobre"
function ajustarEscalaEPosicaoNaSobre() {
    if (window.matchMedia("(max-width: 425px)").matches) {
        object.scale.set(8, 8, 8); // Escala final para telas pequenas
        object.position.set(0, -2, 0); // Posição final na seção "sobre" para telas pequenas
    } else if (window.matchMedia("(max-width: 768px)").matches) {
        object.scale.set(11, 11, 11); // Escala final para tablets
        object.position.set(0, -3, 0); // Posição final na seção "sobre" para tablets
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
        object.scale.set(15, 15, 15); // Escala final para desktops menores
        object.position.set(0, -1, 0); // Posição final na seção "sobre" para desktops menores
    } else {
        object.scale.set(14, 14, 14); // Escala final para desktops maiores
        object.position.set(4, 0, 0); // Posição final na seção "sobre" para desktops maiores
    }
}

// Adiciona luzes à cena
const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(10, 10, 10);
scene.add(topLight);
const ambientLight = new THREE.AmbientLight(0xb65b29);
scene.add(ambientLight);

// Define a posição inicial da câmera
camera.position.set(0, 0, 10);

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Atualiza o aspecto da câmera e o tamanho do renderizador quando a janela é redimensionada
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ajustarEscalaEPosicao(); // Ajusta a escala e a posição novamente quando a tela é redimensionada
});
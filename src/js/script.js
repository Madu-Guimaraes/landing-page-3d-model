// script do botão de voltar para o topo
document.addEventListener("scroll", function () {
    const botaoVoltarTopo = document.getElementById("seta-voltar");
    const sobreSection = document.getElementById("sobre");
    const testemunhosSection = document.getElementById("testemunhos");

    const sobreSectionTop = sobreSection.getBoundingClientRect().top;
    const testemunhosSectionBottom = testemunhosSection.getBoundingClientRect().bottom;

    if (sobreSectionTop <= window.innerHeight && testemunhosSectionBottom > 0) {
        botaoVoltarTopo.parentElement.classList.add("mostrar");
    } else {
        botaoVoltarTopo.parentElement.classList.remove("mostrar");
    }
});

document.getElementById("seta-voltar").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    setTimeout(function () {
        document.getElementById("seta-voltar").parentElement.classList.remove("mostrar");
    }, 300);
});

//script para o botão de se inscrever na newsletter
const botaoCadastrar = document.querySelectorAll('.btn-cadastro-newsletter');

botaoCadastrar.forEach(botao => {
    botao.addEventListener('click', function() {
        const input = botao.previousElementSibling.previousElementSibling.previousElementSibling;
        const primeiroSpan = input.nextElementSibling;
        const segundoSpan = primeiroSpan.nextElementSibling;

        if (input.value) {
            primeiroSpan.style.display = 'inline'; 
            segundoSpan.style.display = 'none';
            input.classList.add("valido");
            input.classList.remove("invalido");
        } else {
            segundoSpan.style.display = 'inline';
            primeiroSpan.style.display = 'none';
            input.classList.add("invalido");
            input.classList.remove("valido");
        }
    });
});
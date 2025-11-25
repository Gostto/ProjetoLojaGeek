const produtos = [
    {
        nome: "Camiseta Metallica, And Justice For All",
        preco: 70,
        parcelamento: "3x de R$ 23,33",
        categoria: "camiseta",
        tamanho: ["P","M","G","GG"],
        img: "/src/blusas/blusametallicatras.png",
        link: "produto00.html"
    },
    {
        nome: "Camiseta Resident Evil",
        parcelamento: "3x de R$ 23,33",
        preco: 70,
        categoria: "camiseta",
        tamanho: ["P","M","G","GG"],
        img: "/src/blusas/blusaresidentevilfrente.png",
        link: "produto01.html"
    },
    {
        nome: "Camiseta Quarteto Fantastico",
        parcelamento: "3x de R$ 23,33",
        preco: 70,
        categoria: "camiseta",
        tamanho: ["P","M","G","GG"],
        img: "/src/blusas/blusa%20quarteto%20fant%C3%A1stico%20frente.png",
        link: "produto05.html"
    },
    {
        nome: "Camiseta Mikasa",
        parcelamento: "3x de R$ 23,33",
        preco: 70,
        categoria: "camiseta",
        tamanho: ["P","M","G","GG"],
        img: "/src/blusas/blusamikasafrente.png",
        link: "produto06.html"
    },
    {
        nome: "Moletom Batman",
        parcelamento: "3x de R$ 46,66",
        preco: 140,
        categoria: "moletom",
        tamanho: ["M","G","GG"],
        img: "/src/casacos/casaco%20batman%20frente.png",
        link: "produto07.html"
    },
    {
        nome: "Moletom Bucket Head",
        parcelamento: "3x de R$ 46,66",
        preco: 140,
        categoria: "moletom",
        tamanho: ["M","G","GG"],
        img: "/src/casacos/casaco%20bucket%20head%20frente.png",
        link: "produto08.html"
    },
    {
        nome: "Moletom Fnaf 2",
        parcelamento: "3x de R$ 46,66",
        preco: 140,
        categoria: "moletom",
        tamanho: ["M","G","GG"],
        img: "/src/casacos/casaco%20fnaf%202%20frente.png",
        link: "produto09.html"
    },
    {
        nome: "Moletom Tokyo Ghoul",
        parcelamento: "3x de R$ 46,66",
        preco: 140,
        categoria: "moletom",
        tamanho: ["M","G","GG"],
        img: "/src/casacos/casaco%20tokyo%20ghoul%20frente.png",
        link: "produto10.html"
    },

];

// renderizar produtos
function renderizar(lista) {
    const container = document.getElementById("listaProdutos");
    container.innerHTML = "";

    lista.forEach(p => {
        container.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card-produto text-decoration-none">
                <a href="${p.link}">
                    <img src="${p.img}" alt="${p.nome}">
                    <h5 class="mt-2">${p.nome}</h5>
                </a>
                    <p class="h5 text-danger fw-bold">R$ ${p.preco},00</p>
                    <p class="text-muted">ou ${p.parcelamento} sem juros</p>
                    <button class="btn btn-success w-100">Comprar</button>
                </div>
            </div>
        `;
    });
}

renderizar(produtos);

// FILTROS
document.getElementById("searchInput").addEventListener("input", filtrar);
document.querySelectorAll(".filtro-categoria").forEach(el => el.addEventListener("change", filtrar));
document.querySelectorAll(".filtro-tamanho").forEach(el => el.addEventListener("change", filtrar));
document.getElementById("precoRange").addEventListener("input", () => {
    document.getElementById("precoValor").innerText = "Até R$ " + document.getElementById("precoRange").value;
    filtrar();
});

function filtrar() {
    const busca = document.getElementById("searchInput").value.toLowerCase();
    const maxPreco = Number(document.getElementById("precoRange").value);

    const categoriasSelecionadas = [...document.querySelectorAll(".filtro-categoria:checked")].map(el => el.value);
    const tamanhosSelecionados = [...document.querySelectorAll(".filtro-tamanho:checked")].map(el => el.value);

    const filtrados = produtos.filter(p => {
        return (
            p.nome.toLowerCase().includes(busca) &&
            p.preco <= maxPreco &&
            (categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(p.categoria)) &&
            (tamanhosSelecionados.length === 0 || tamanhosSelecionados.some(t => p.tamanho.includes(t)))
        );
    });

    renderizar(filtrados);
}

const produtos = [
    {
        nome: "Tênis Naruto Cano Alto",
        preco: 220,
        parcelamento: "5x de R$ 44,00",
        categoria: "tenis",
        tamanho: ["38","39","40","41","42"],
        img: "https://static.zattini.com.br/produtos/tenis-cano-alto-anime-naruto-2-top/21/8B3-0373-221/8B3-0373-221_zoom1.jpg?ts=1694812939&ims=1088x",
        link: "produto00.html"
    },
    {
        nome: "Chinelo Naruto Uzumaki",
        preco: 220,
        parcelamento: "5x de R$ 44,00",
        categoria: "chinelo",
        tamanho: ["38","39","40","41","42"],
        img: "https://static.zattini.com.br/produtos/tenis-cano-alto-anime-naruto-2-top/21/8B3-0373-221/8B3-0373-221_zoom1.jpg?ts=1694812939&ims=1088x",
        link: "produto00.html"
    },
    {
        nome: "Crocs Naruto Uzumaki",
        preco: 220,
        parcelamento: "5x de R$ 44,00",
        categoria: "sandalia",
        tamanho: ["38","39","40","41","42"],
        img: "https://static.zattini.com.br/produtos/tenis-cano-alto-anime-naruto-2-top/21/8B3-0373-221/8B3-0373-221_zoom1.jpg?ts=1694812939&ims=1088x",
        link: "produto00.html"
    },
];

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

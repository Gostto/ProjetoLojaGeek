const produtos = [
    {
        nome: "Funko Pop! Iron Man - Edição Colecionador",
        preco: 89.9,
        parcelamento: "3x de R$ 29,97",
        categoria: "funko",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/81CnvOG8+YL._AC_SL1500_.jpg",
        link: "produto00.html"
    },
    {
        nome: "Action Figure Goku - Super Saiyajin",
        preco: 249.5,
        parcelamento: "5x de R$ 49,90",
        categoria: "action-figure",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/71MYx-HML9L._AC_UF894,1000_QL80_.jpg",
        link: "produto-colecao-goku.html"
    },
    {
        nome: "Estátua Link - The Legend of Zelda",
        preco: 399.0,
        parcelamento: "10x de R$ 39,90",
        categoria: "estatua",
        tamanho: ["Único"],
        img: "https://img.elo7.com.br/product/zoom/480250E/estatua-link-the-legend-of-zelda-tears-of-the-kingdom-breath-of-the-wild.jpg",
        link: "produto-colecao-link.html"
    }
];

function renderizar(lista) {
    const container = document.getElementById("listaProdutos");
    container.innerHTML = "";

    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    lista.forEach(p => {
        const precoParam = Number(p.preco).toFixed(2);
        const buyHref = `pagamento.html?produto=${encodeURIComponent(p.link)}&nome=${encodeURIComponent(p.nome)}&preco=${encodeURIComponent(precoParam)}`;
        container.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card-produto text-decoration-none">
                <a href="${p.link}">
                    <img src="${p.img}" alt="${p.nome}">
                    <h5 class="mt-2">${p.nome}</h5>
                </a>
                    <p class="h5 text-danger fw-bold">${formatter.format(p.preco)}</p>
                    <p class="text-muted">ou ${p.parcelamento} sem juros</p>
                    <a href="${buyHref}" class="btn btn-success w-100">Comprar</a>
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

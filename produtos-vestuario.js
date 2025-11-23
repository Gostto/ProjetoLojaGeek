const produtos = [
    {
        nome: "Camiseta IT, A Coisa",
        preco: 80,
        parcelamento: "3x de R$ 26,67",
        categoria: "camiseta",
        tamanho: ["P","M","G","GG"],
        img: "https://tfcprw.vtexassets.com/arquivos/ids/411739-1200-auto?v=638966406840770000&width=1200&height=auto&aspect=true",
        link: "produto00.html"
    },
    {
        nome: "Moletom Naruto The Best Ramen",
        parcelamento: "5x de R$ 32,00",
        preco: 160,
        categoria: "moletom",
        tamanho: ["M","G"],
        img: "https://tfcprw.vtexassets.com/arquivos/ids/393741-1200-auto?v=638761757200530000&width=1200&height=auto&aspect=true",
        link: "produto00.html"
    },
    {
        nome: "Meia Homem Aranha",
        parcelamento: "2x de R$ 30,00",
        preco: 60,
        categoria: "meia",
        tamanho: ["G","GG"],
        img: "https://tfcprw.vtexassets.com/arquivos/ids/400525-1200-auto?v=638823976461730000&width=1200&height=auto&aspect=true",
        link: "produto00.html"
    }
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

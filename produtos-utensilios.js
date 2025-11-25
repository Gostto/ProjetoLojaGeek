const produtos = [
    {
        nome: "Caneca Cerâmica - One Piece Luffy",
        preco: 39.9,
        parcelamento: "2x de R$ 19,95",
        categoria: "caneca",
        tamanho: ["Único"],
        img: "https://zonacriativa.vtexassets.com/arquivos/ids/278548-1200-auto?v=638974199244400000&width=1200&height=auto&aspect=true",
        link: "produto-utensilio-caneca.html"
    },
    {
        nome: "Copo Térmico 500ml - Game Over",
        preco: 79.9,
        parcelamento: "3x de R$ 26,63",
        categoria: "copo",
        tamanho: ["500ml"],
        img: "https://pimento.pt/wp-content/uploads/2023/09/CUP46_003_1614009456.jpg",
        link: "produto-utensilio-copo.html"
    },
    {
        nome: "Garrafa Inox - The Witcher",
        preco: 59.0,
        parcelamento: "2x de R$ 29,50",
        categoria: "garrafa",
        tamanho: ["750ml"],
        img: "https://cdn.awsli.com.br/800x800/1943/1943462/produto/18657418692e775aa24.jpg",
        link: "produto-utensilio-garrafa.html"
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

try {
    document.getElementById("searchInput").addEventListener("input", filtrar);
    document.querySelectorAll(".filtro-categoria").forEach(el => el.addEventListener("change", filtrar));
    document.querySelectorAll(".filtro-tamanho").forEach(el => el.addEventListener("change", filtrar));
    document.getElementById("precoRange").addEventListener("input", () => {
        document.getElementById("precoValor").innerText = "Até R$ " + document.getElementById("precoRange").value;
        filtrar();
    });
} catch (e) {
    // página pode não ter filtros
}

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

const produtos = [
    {
        nome: "Quadro Doom Eternal",
        preco: 60,
        parcelamento: "3x de R$ 20,00",
        categoria: "quadro",
        img: "https://www.quadrorama.com.br/imagens/quadro-decorativo/?quadro=2024/10/62-18.png",
        tamanho: ["Único"],
        link: "produto04.html"
    },
    {
        nome: "Poster Metal Gear Solid",
        preco: 30,
        parcelamento: "2x de R$ 15,00",
        categoria: "poster",
        img: "https://i.ebayimg.com/images/g/XF4AAOSwMQBlzmW6/s-l1600.webp",
        tamanho: ["Único"],
        link: "produto02.html"
    },
    {
        nome: "Almofada Super Mario",
        preco: 80,
        parcelamento: "2x de R$ 40,00",
        categoria: "almofada",
        img: "https://down-br.img.susercontent.com/file/sg-11134201-7rblx-loc2ruehnhw15d.webp",
        tamanho: ["Único"],
        link: "produto03.html"
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

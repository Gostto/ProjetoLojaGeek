const produtos = [
    {
        nome: "O Espetacular Homem Aranha - Volume 1",
        preco: 129,
        parcelamento: "12x de R$ 10,82",
        categoria: "hq",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/41ntXLwNZML._SY342_.jpg",
        link: "produto12.html"
    },
    {
        nome: "Coleção Clássica Marvel Vol. 4 - Vingadores Vol. 1",
        preco: 23,
        parcelamento: "2x de R$ 11,50",
        categoria: "hq",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/719-pB2m0ML._SY342_.jpg",
        link: "produto13.html"
    },
    {
        nome: "X-men - Dias de um futuro esquecido: 13",
        preco: 52,
        parcelamento: "3x de R$ 17,64",
        categoria: "hq",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/71sVLEvgHXL._SY342_.jpg",
        link: "produto14.html"
    },
    {
        nome: "Batman: a Piada Mortal",
        preco: 29,
        parcelamento: "3x de R$ 9,97",
        categoria: "hq",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/612NQUm0buL._SY342_.jpg",
        link: "produto15.html"
    },
    {
        nome: "Absolute Superman vol. 01",
        preco: 19,
        parcelamento: "2x de R$ 9,50",
        categoria: "hq",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/61ZAEI3IsEL._SY342_.jpg",
        link: "produto16.html"
    },
    {
        nome: "A Saga da Mulher-maravilha 04",
        preco: 39,
        parcelamento: "3x de R$ 13,00",
        categoria: "hq",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/714dojGK-uL._SY342_.jpg",
        link: "produto17.html"
    },
    {
        nome: "Tokyo Ghoul No vol 13",
        preco: 23,
        parcelamento: "2x de R$ 11,95",
        categoria: "manga",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/61SeajNHmTL._SY342_.jpg",
        link: "produto18.html"
    },
    {
        nome: "Haikyu!! Vol. 06",
        preco: 39,
        parcelamento: "3x de R$ 13,30",
        categoria: "manga",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/61Z-ZKZ-WsL._SY342_.jpg",
        link: "produto19.html"
    },
    {
        nome: "Solo Leveling 01",
        preco: 59,
        parcelamento: "3x de R$ 19,97",
        categoria: "manga",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/61EYZ1S4tCL._SY342_.jpg",
        link: "produto20.html"
    },
    {
        nome: "Jujutsu Kaisen: Batalha de Feiticeiros Vol. 4",
        preco: 35,
        parcelamento: "2x de R$ 17,50",
        categoria: "manga",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/71VS-OuXOjL._SY342_.jpg",
        link: "produto21.html"
    },
    {
        nome: "Fullmetal Alchemist - Especial - Vol. 1",
        preco: 39,
        parcelamento: "3x de R$ 13,00",
        categoria: "manga",
        tamanho: ["Único"],
        img: "https://m.media-amazon.com/images/I/61yvu+BbxvL._SY342_.jpg",
        link: "produto22.html"
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

// FILTROS
try {
    document.getElementById("searchInput").addEventListener("input", filtrar);
    document.querySelectorAll(".filtro-categoria").forEach(el => el.addEventListener("change", filtrar));
    document.querySelectorAll(".filtro-tamanho").forEach(el => el.addEventListener("change", filtrar));
    document.getElementById("precoRange").addEventListener("input", () => {
        document.getElementById("precoValor").innerText = "Até R$ " + document.getElementById("precoRange").value;
        filtrar();
    });
} catch (e) {
    // página pode não ter filtros; ignore
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

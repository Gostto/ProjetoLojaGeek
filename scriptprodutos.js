const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {

        // troca a imagem principal
        mainImage.src = thumb.src;

        // remove destaque anterior
        thumbs.forEach(t => t.classList.remove('active-thumb'));

        // adiciona destaque à clicada
        thumb.classList.add('active-thumb');
    });
});

// Script para o carrosel de imagens na página inicial do site
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// Script para mensagens animadas na parte superior do site
  const mensagens = [
    "💬 Aproveite nossas promoções!",
    "💳 Parcele em até 5x s/ juros",
    "❌ Zero Taxas Adicionais",
    "🚚 Frete grátis para todo Brasil",
    "🕒 Atendimento das 9h às 17h!",
    "📞 Ligue para (11) 1234-5678! (Sem Robôs)",
    
  ];

  const container = document.getElementById("messages");

  // Junta todas as mensagens em uma única linha
  container.innerHTML = mensagens.join("   ㅤㅤ•ㅤㅤ   "); // separadas por bolinha

  // Duplicar o conteúdo para evitar pausas no loop
  container.innerHTML += "   ㅤㅤ•ㅤㅤ   " + container.innerHTML;

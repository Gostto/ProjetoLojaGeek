function renderResults(lista) {
  const container = document.getElementById('searchResults');
  container.innerHTML = '';
  const countEl = document.getElementById('resultCount');
  if (!lista || lista.length === 0) {
    if (countEl) countEl.innerText = '0 resultados';
    container.innerHTML = '<p class="lead">Nenhum resultado encontrado.</p>';
    return;
  }

  if (countEl) countEl.innerText = lista.length + (lista.length === 1 ? ' resultado' : ' resultados');

  const row = document.createElement('div');
  row.className = 'row';
  lista.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3 mb-4';
    const favorites = JSON.parse(localStorage.getItem('favorites||[]') || '[]');
    const favOn = favorites.includes(p.link);
    col.innerHTML = `
      <div class="card-produto text-decoration-none position-relative">
        <button class="btn-fav btn btn-sm ${favOn ? 'btn-danger' : 'btn-outline-danger'}" data-link="${p.link}" style="position:absolute;right:8px;top:8px;z-index:2;">${favOn ? '❤' : '♡'}</button>
        <a href="${p.link}">
          <img src="${p.img}" alt="${p.nome}" style="width:100%;height:160px;object-fit:cover;">
          <h5 class="mt-2">${p.nome}</h5>
        </a>
        <div class="d-flex justify-content-between align-items-center">
          <span class="badge bg-secondary">${p.categoria || ''}</span>
          <span class="h5 text-danger mb-0">R$ ${p.preco},00</span>
        </div>
        <p class="text-muted small mb-2">${p.parcelamento || ''}</p>
        <button class="btn btn-success w-100">Comprar</button>
      </div>
    `;
    row.appendChild(col);
  });
  container.appendChild(row);

  // attach favorite handlers
  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const link = btn.getAttribute('data-link');
      let fav = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (fav.includes(link)) {
        fav = fav.filter(x => x !== link);
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-outline-danger');
        btn.innerText = '♡';
      } else {
        fav.push(link);
        btn.classList.add('btn-danger');
        btn.classList.remove('btn-outline-danger');
        btn.innerText = '❤';
      }
      localStorage.setItem('favorites', JSON.stringify(fav));
    });
  });
}

async function loadProductsFromFiles(files) {
  const results = [];
  for (const file of files) {
    try {
      const res = await fetch(file);
      if (!res.ok) continue;
      const txt = await res.text();
      const idx = txt.indexOf('const produtos');
      if (idx === -1) continue;
      const start = txt.indexOf('[', idx);
      if (start === -1) continue;
      // find matching closing bracket
      let i = start, depth = 0;
      for (; i < txt.length; i++) {
        const ch = txt[i];
        if (ch === '[') depth++;
        else if (ch === ']') { depth--; if (depth === 0) break; }
      }
      const arrayText = txt.substring(start, i + 1);
      try {
        const arr = Function('return ' + arrayText)();
        if (Array.isArray(arr)) results.push(...arr);
      } catch (errEval) {
        // ignore parse errors
        console.warn('Failed to eval array from', file, errEval);
      }
    } catch (err) {
      console.warn('Failed to load', file, err);
    }
  }
  return results;
}

async function doSearch(term) {
  let pool = [];
  if (typeof ALL_PRODUCTS !== 'undefined' && Array.isArray(ALL_PRODUCTS)) pool = pool.concat(ALL_PRODUCTS);
  // try to load additional product files dynamically
  const filesToTry = ['produtos-camisetas.js','produtos-moletom.js','produtos-vestuario.js','produtos-calcados.js'];
  const loaded = await loadProductsFromFiles(filesToTry);
  if (loaded && loaded.length) {
    pool = pool.concat(loaded);
  }

  if (!term) {
    renderResults([]);
    return;
  }
  const q = term.toLowerCase();
  const results = pool.filter(p => {
    return (
      (p.nome && p.nome.toLowerCase().includes(q)) ||
      (p.categoria && p.categoria.toLowerCase().includes(q))
    );
  });
  renderResults(results);
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';

  // header search bar (if present)
  const headerForm = document.querySelector('form.search-bar');
  if (headerForm) {
    const headerInput = headerForm.querySelector('.input-search');
    if (headerInput) headerInput.value = q;
    headerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (headerInput && headerInput.value) ? headerInput.value.trim() : '';
      if (v) window.location.href = 'search.html?q=' + encodeURIComponent(v);
    });
    const btn = headerForm.querySelector('.button-search');
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      const v = (headerForm.querySelector('.input-search') && headerForm.querySelector('.input-search').value) ? headerForm.querySelector('.input-search').value.trim() : '';
      if (v) window.location.href = 'search.html?q=' + encodeURIComponent(v);
    });
  }

  // page search input
  const pageInput = document.getElementById('pageSearchInput');
  if (pageInput) {
    pageInput.value = q;
    pageInput.addEventListener('input', (e) => doSearch(e.target.value));
  }

  const backBtn = document.getElementById('backBtn');
  if (backBtn) backBtn.addEventListener('click', () => { window.history.back(); });

  // perform search from q param
  doSearch(q);
});

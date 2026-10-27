(() => {
  const grid = document.querySelector('[data-catalog]');
  if (!grid) return;
  const cards = [...grid.children], search = document.querySelector('#search'), collection = document.querySelector('#collection'), sort = document.querySelector('#sort');
  const count = document.querySelector('#result-count'), more = document.querySelector('#more'), empty = document.querySelector('#empty');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  collection.value = [...collection.options].some(o => o.value === params.get('collection')) ? params.get('collection') : '';
  sort.value = ['title','author'].includes(params.get('sort')) ? params.get('sort') : 'title';
  let limit = 24;
  function render(reset = false) {
    if (reset) limit = 24;
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    const matching = cards.filter(card => terms.every(term => normalize(card.dataset.search).includes(term)) && (!collection.value || card.dataset.collection === collection.value));
    matching.sort((a,b) => a.dataset[sort.value].localeCompare(b.dataset[sort.value], 'pt-BR'));
    cards.forEach(card => { card.hidden = true; });
    matching.forEach((card,i) => { grid.append(card); card.hidden = i >= limit; });
    count.textContent = `${matching.length} ${matching.length === 1 ? 'livro encontrado' : 'livros encontrados'}`;
    empty.hidden = matching.length > 0;
    more.hidden = matching.length <= limit;
    const query = new URLSearchParams();
    if (search.value.trim()) query.set('q',search.value.trim());
    if (collection.value) query.set('collection',collection.value);
    if (sort.value !== 'title') query.set('sort',sort.value);
    if (location.protocol !== 'file:') history.replaceState(null,'',location.pathname + (query.size ? '?' + query : '') + location.hash);
  }
  search.addEventListener('input', () => render(true));
  collection.addEventListener('change', () => render(true));
  sort.addEventListener('change', () => render(true));
  document.querySelector('#clear').addEventListener('click', () => {search.value='';collection.value='';sort.value='title';render(true);search.focus();});
  more.addEventListener('click', () => {const next = limit;limit += 24;render();const visible=[...grid.children].filter(x=>!x.hidden);visible[next]?.querySelector('a').focus();});
  document.querySelector('#filters').hidden=false;
  render();
})();

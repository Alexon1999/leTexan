const smoothScroll = (to) => (e) => {
  e.preventDefault();
  e.stopPropagation();

  const href = e.target.hash || "#" + to; // '#projects'
  const offsetTop =
    document.querySelector(href)?.offsetTop - 60 ||
    document.querySelector(href)?.scrollTop - 60;

  // console.log({ href, offsetTop });

  window.scroll({
    top: offsetTop || 0,
    behavior: "smooth",
  });
};

function debounce(cb, delay, fn) {
  let timeoutId;
  return function (...args) {
    fn();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function isIntersecting(el_id) {
  const element = document.getElementById(el_id);
  const scrollTop_el = element?.offsetTop || element?.scrollTop || 0;
  // const height_el = element?.clientHeight || 0; // element a la moitié
  // const height_window = window.innerHeight;
  const window_scrollTop = document.documentElement.scrollTop;

  // console.log(scrollTop_el);
  // console.log(height_el);
  // console.log(height_window);
  // console.log(window_scrollTop);

  if (scrollTop_el - 150 < window_scrollTop) {
    // console.log("active", element);
    // console.log(scrollTop_el, window_scrollTop, element);
    return true;
  }

  return false;
}

function calculTotal(baskets = []) {
  const price = baskets.reduce((total, product) => {
    total += product.quantite * product.prix;
    return total;
  }, 0);

  return +price.toFixed(2);
}

function calculPrixProduitAvecQuantite(product) {
  return +(product.quantite * product.prix).toFixed(2);
}

function splitPrix(prix = 0.0, splitOn = ".", joinWith = "€") {
  return parseFloat(prix).toFixed(2).toString().split(splitOn).join(joinWith);
}

function getNombresArticles(baskets = []) {
  return baskets.reduce((total, product) => total + product.quantite, 0);
}

export {
  isIntersecting,
  debounce,
  smoothScroll,
  calculTotal,
  splitPrix,
  getNombresArticles,
  calculPrixProduitAvecQuantite,
};

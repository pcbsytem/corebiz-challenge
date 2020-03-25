import './assets/css/index.css';
const url = 'https://www.clickqi.com.br/api/dataentities/CG/search?_fields=productName,productRating,productListPrice,productBestPrice,productInstallments,productInstallmentsValue,productImage&_sort=productName%20DESC';


const initCarousel = () => {
  $('.carousel').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 459,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  });
}

const request = () => {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      setShopItem(res);
    })
}

const showStars = (rate) => {
  let stars = `
    <div class="star ${rate >= 10 && 'full'}"></div>
    <div class="star ${rate >= 20 && 'full'}"></div>
    <div class="star ${rate >= 30 && 'full'}"></div>
    <div class="star ${rate >= 40 && 'full'}"></div>
    <div class="star ${rate === 50 && 'full'}"></div>
  `;

  return stars;
}

const setShopItem = (productList) => {
  if (productList && !productList.length) {
    $('<h4>Nenhum item foi encontrado!</h4>').appendTo('.carousel');
    return;
  }

  productList.map(product => {
    $(`
      <div style="display: flex;justify-content: center;">
        <div class="item-shop">
          <div class="${product.productListPrice !== 0 && 'discount'}"></div>
          <img class="image" src="${product.productImage}" alt="produto">

          <div class="product">
            <p class="name">${product.productName}</p>

            <div class="stars">
              ${showStars(product.productRating)}
            </div>
          </div>

          <div class="old-price ${!currentValue(product.productListPrice) ? 'hide' : ''}">
            de R$ ${currentValue(product.productListPrice)}
          </div>
          <h4 class="best-price">
            por R$ ${currentValue(product.productBestPrice)}
          </h4>
          <div class="parcelas">
            ou em ${product.productInstallments}x de R$ ${currentValue(product.productInstallmentsValue)}
          </div>

          <button class="button">COMPRAR</button>
        </div>
      </div>
    `).appendTo('.carousel');
  });

  initCarousel();
}

const currentValue = (value) => {
  let current = '';
  let length = value.toString().length;
  let valueText = value.toString();

  if (!value) return '';

  if (length === 4) {
    current = `${valueText.substring(0, 2)},${valueText.substring(2, length)}`;
  }

  if (length === 5) {
    current = `${valueText.substring(0, 3)},${valueText.substring(2, length - 1)}`;
  }

  return current;
}

request();
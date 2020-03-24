const url = 'https://www.clickqi.com.br/api/dataentities/CG/search?_fields=productName,productRating,productListPrice,productBestPrice,productInstallments,productInstallmentsValue,productImage&_sort=productName%20DESC';


const initCarousel = () => {
  $('.carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  });
}

const request = () => {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res);
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
  productList.map(product => {
    $(`
        <div class="item-shop">
          <div class="image">
            <img src="${product.productImage}" alt="produto">
          </div>

          <div class="product">
            <p class="name">${product.productName}</p>

            <div class="stars">
              ${showStars(product.productRating)}
            </div>
          </div>

          <div style="color: #7A7A7A;text-decoration-line: line-through;"></div>
          <h4 class="value">por R$ ${currentValue(product.productBestPrice)}</h4>
          <div class="parcelas">ou em ${product.productInstallments}x de R$ ${currentValue(product.productInstallmentsValue)}</div>

          <button class="button">COMPRAR</button>
        </div>
      `).appendTo('.carousel');
  });

  initCarousel();
}

const currentValue = (value) => {
  let current = '';
  let length = value.toString().length;
  let valueText = value.toString();

  if (!value) return '444,00';

  if (length === 4) {
    current = `${valueText.substring(0, 2)},${valueText.substring(2, length)}`;
  }

  if (length === 5) {
    current = `${valueText.substring(0, 3)},${valueText.substring(2, length - 1)}`;
  }

  return current;
}

request();
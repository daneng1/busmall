'use strict';



// image constructor
function ProductImage(image, alt) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = image;
  this.alt = alt;
  this.flag = false;

  ProductImage.allImages.push(this);
}
// Creates our allImages property on the ProductImages constructor
var productsFromLocal = localStorage.getItem('products');
var productsAsArray = JSON.parse(productsFromLocal);

ProductImage.allImages = productsAsArray || [];

// creates the product image
if (ProductImage.allImages.length === 0) {
  new ProductImage('./images/bag.jpg', 'Bag');
  new ProductImage('./images/banana.jpg', 'Banana');
  new ProductImage('./images/bathroom.jpg', 'Bathroom');
  new ProductImage('./images/boots.jpg', 'Boots');
  new ProductImage('./images/breakfast.jpg', 'Breakfast');
  new ProductImage('./images/bubblegum.jpg', 'Bubblegum');
  new ProductImage('./images/chair.jpg', 'Chair');
  new ProductImage('./images/cthulhu.jpg', 'Cthulhu');
  new ProductImage('./images/dog-duck.jpg', 'Dog-duck');
  new ProductImage('./images/dragon.jpg', 'Dragon');
  new ProductImage('./images/pen.jpg', 'Pen');
  new ProductImage('./images/pet-sweep.jpg', 'Pet-sweep');
  new ProductImage('./images/scissors.jpg', 'Scissors');
  new ProductImage('./images/shark.jpg', 'Shark');
  new ProductImage('./images/sweep.png', 'Sweep');
  new ProductImage('./images/tauntaun.jpg', 'Tauntaun');
  new ProductImage('./images/unicorn.jpg', 'Unicorn');
  new ProductImage('./images/usb.gif', 'Usb');
  new ProductImage('./images/water-can.jpg', 'Water-can');
  new ProductImage('./images/wine-glass.jpg', 'Wine-glass');
}
// console.log(ProductImage.allImages);

var imageContainer = document.getElementById('image-container');
var leftImage = document.getElementById('left-image');
var centerImage = document.getElementById('center-image');
var rightImage = document.getElementById('right-image');
var resultButton = document.getElementById('resultButton');

// generates 3 random product images
function generateRandomImages() {
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  console.log(`Index #'s are ${leftIndex}, ${centerIndex}, ${rightIndex}`);
  while (ProductImage.allImages[leftIndex].flag === true) {
    leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (centerIndex === leftIndex || ProductImage.allImages[centerIndex].flag === true) {
    centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (rightIndex === leftIndex || ProductImage.allImages[rightIndex].flag === true || rightIndex === centerIndex || ProductImage.allImages[rightIndex].flag === true) {
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  console.log(ProductImage.allImages[leftIndex], ProductImage.allImages[centerIndex], ProductImage.allImages[rightIndex]);
  for (var i=0; i<ProductImage.allImages.length; i++) {
    ProductImage.allImages[i].flag = false;
  }
  ProductImage.allImages[leftIndex].flag = true;
  ProductImage.allImages[centerIndex].flag = true;
  ProductImage.allImages[rightIndex].flag = true;

  var leftProduct = ProductImage.allImages[leftIndex];
  var centerProduct = ProductImage.allImages[centerIndex];
  var rightProduct = ProductImage.allImages[rightIndex];

  return [leftProduct, centerProduct, rightProduct];
}

// render new images and ensure that there are no duplicates from last round
function renderImages(leftProduct, centerProduct, rightProduct) {

  leftImage.src = leftProduct.image;
  leftImage.alt = leftProduct.alt;
  leftProduct.timesShown++;

  centerImage.src = centerProduct.image;
  centerImage.alt = centerProduct.alt;
  centerProduct.timesShown++;

  rightImage.src = rightProduct.image;
  rightImage.alt = rightProduct.alt;
  rightProduct.timesShown++;
}

var randomImages = generateRandomImages();
renderImages(randomImages[0], randomImages[1], randomImages[2]);

var numberOfClicks = 0;
var numberOfRounds = 25;

// iterates the number of rounds and stops when limit reached
imageContainer.addEventListener('click', function (event) {
  console.log(event.target);
  for (var i=0; i < ProductImage.allImages.length; i++){
    if (event.target.alt === (ProductImage.allImages[i].alt)){
      ProductImage.allImages[i].timesClicked++;
      numberOfClicks++;
    }
  }
  if (numberOfClicks < numberOfRounds) {
    var randomProducts = generateRandomImages();
    renderImages(randomProducts[0], randomProducts[1], randomProducts[2]);
    // console.log(numberOfClicks);
  }
  else{
    imageContainer.style.display='none';
    resultButton.style.display='inline-block';
    var headerMain = document.getElementById('headerMain');
    headerMain.style.display='none';
    return resultButton;
  }
});

var votesByProduct = [];
var timesProductsAreShown = [];
var productLabels = [];

// displays chart after button click
resultButton.addEventListener('click', function (event) {
  console.log(event.target);
  event.preventDefault();

  for (var i=0; i < ProductImage.allImages.length; i++) {
    votesByProduct.push(ProductImage.allImages[i].timesClicked);
    timesProductsAreShown.push(ProductImage.allImages[i].timesShown);
    productLabels.push(ProductImage.allImages[i].alt);
  }
  console.log(`Votes are ${votesByProduct}`);
  console.log(`Shown are ${timesProductsAreShown}`);
  // console.log(productLabels);

  var productsAsString = JSON.stringify(ProductImage.allImages);
  console.log(productsAsString);
  localStorage.setItem('products', productsAsString);

  resultButton.style.display='none';
  var header = document.getElementById('header');
  var myChart = document.getElementById('myText');
  header.style.display='flex';
  myChart.style.display='flex';
  return header;
});

var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
  type: 'bar',
  responsive: true,
  maintainAspectRatio: false,
  data: {
    labels: productLabels,
    datasets: [{
      label: '# of Times Seen',
      data: timesProductsAreShown,
      backgroundColor:  new Array(20).fill('rgba(141, 28, 28, 01.0)'),
      borderColor: new Array(20).fill('rgba(88, 28, 28, 01.0)'),
      borderWidth: 1
    },
    {
      label: '# of Votes',
      data:  votesByProduct,
      backgroundColor: new Array(20).fill('rgba(49, 132, 190, 1.0)'),
      borderColor: new Array(20).fill('rgba(32, 100, 160, 1.0)'),
      borderWidth: 1
    }]
  },
  options: {
    animation: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


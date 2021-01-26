'use strict';



// image constructor
function ProductImage(image, alt) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = image;
  this.alt = alt;

  ProductImage.allImages.push(this);
}
// Creates our allImages property on the ProductImages constructor
ProductImage.allImages = [];

// creates the product image
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

console.log(ProductImage.allImages);

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

  while (centerIndex === leftIndex) {
    centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (rightIndex === leftIndex || rightIndex === centerIndex) {
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }

  var leftProduct = ProductImage.allImages[leftIndex];
  var centerProduct = ProductImage.allImages[centerIndex];
  var rightProduct = ProductImage.allImages[rightIndex];

  return [leftProduct, centerProduct, rightProduct];
}

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


imageContainer.addEventListener('click', function (event) {
  console.log(event.target);
  for (var i=0; i < ProductImage.allImages.length; i++){
    if (event.target.alt === (ProductImage.allImages[i].alt)){
      ProductImage.allImages[i].timesClicked++;
      numberOfClicks++;
      console.log(ProductImage.allImages[i].alt);
    }
  }
  if (numberOfClicks < numberOfRounds) {
    var randomProducts = generateRandomImages();
    renderImages(randomProducts[0], randomProducts[1], randomProducts[2]);
  }
  else{
    imageContainer.style.display='none';
    resultButton.style.display='inline-block';
    return resultButton;

  }
  var newImages = generateRandomImages();
  renderImages(newImages[0], newImages[1], newImages[2]);
});


resultButton.addEventListener('click', function (event) {
  console.log(event.target);

  // eslint-disable-next-line no-undef
  for (var i=0; i < ProductImage.allImages.length; i++) {
    var showResults = document.getElementById('myText');
    var resultsDiv = document.createElement('div');
    showResults.appendChild(resultsDiv);
    var resultsImage = document.createElement('img');
    resultsImage.src = ProductImage.allImages[i].image;
    resultsDiv.appendChild(resultsImage);
    var resultsInfo = document.createElement('div');
    var resultsList = document.createElement('p');
    resultsDiv.appendChild(resultsInfo);
    resultsInfo.appendChild(resultsList);
    resultsList.textContent = `${ProductImage.allImages[i].alt} had ${ProductImage.allImages[i].timesClicked} votes and was seen ${ProductImage.allImages[i].timesShown} times.`;

  }
  resultButton.style.display='none';
  var header = document.getElementById('header');
  header.style.display='flex';
  return header;

});
// console.log(ProductImage.allImages);
// console.log(ProductImage.allImages[i]);

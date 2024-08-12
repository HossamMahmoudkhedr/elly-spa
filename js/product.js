import { productsData } from '../data/productsData.js';
import { getParameterByName } from './helpers.js';

const productId = getParameterByName('id');

const mainImage = document.querySelector('.main-image');
const subImages = document.querySelector('.more-images');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');
const howToUse = document.getElementById('how-to-use');
const components = document.getElementById('components');
const numberOfRates = document.getElementById('number-of-rates');

const currentProduct = productsData.filter(
	(product) => productId == product.id
)[0];

const createMainImg = () => {
	const img = document.createElement('img');
	img.src =
		currentProduct.productImages[currentProduct.productImages.length - 1].link;
	mainImage.appendChild(img);
};

const activeSubImage = (e, img) => {
	const currentTarget = e.currentTarget;
	const images = document.querySelectorAll('.sub-image');
	images.forEach((image) => {
		image.classList.remove('selected');
	});
	mainImage.children[0].src = img.link;
	currentTarget.classList.add('selected');
};

const createSubImgs = () => {
	currentProduct.productImages.map((img, i) => {
		const div = document.createElement('div');
		const subImage = document.createElement('img');
		subImage.src = img.link;
		subImage.alt = img.name;
		div.classList.add('sub-image');
		div.appendChild(subImage);
		if (i === currentProduct.productImages.length - 1) {
			div.classList.add('selected');
		}
		div.onclick = (e) => {
			activeSubImage(e, img);
		};
		subImages.appendChild(div);
	});
};

const setProductName = () => {
	productName.innerText = currentProduct.name || '';
};
const setProductPrice = () => {
	productPrice.innerText = currentProduct.price || '';
};
const setProductDescription = () => {
	productDescription.innerText = currentProduct.description || '';
};
const setUsage = () => {
	howToUse.innerText = currentProduct.usage || '';
};
const setComponents = () => {
	components.innerText = currentProduct.components || '';
};
const setNumberOfRates = () => {
	numberOfRates.innerText = currentProduct.numberOfRates || '';
};

setProductName();
setProductPrice();
setNumberOfRates();
setProductDescription();
setUsage();
setComponents();
createMainImg();
createSubImgs();

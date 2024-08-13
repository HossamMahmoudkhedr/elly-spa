import { productsData } from '../data/productsData.js';
import {
	createMainImg,
	createSubImgs,
	getParameterByName,
	setData,
} from './helpers.js';

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

const productImages = currentProduct.productImages;

createMainImg(productImages);
createSubImgs(productImages);
setData(productName, currentProduct.name);
setData(productPrice, currentProduct.price);
setData(productDescription, currentProduct.description);
setData(howToUse, currentProduct.usage);
setData(components, currentProduct.components);
setData(numberOfRates, currentProduct.numberOfRates);

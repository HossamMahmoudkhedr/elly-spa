import { SliderImages } from '../data/sliderImages.js';
import { servicesData } from '../data/servicesData.js';
import { productsData } from '../data/productsData.js';
import { postsData } from '../data/postsData.js';

// Navbar Elements
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('close-menu');
const navbar = document.querySelector('.navbar');

// Form Elements
const termsAndConditionsCheckbox = document.getElementById(
	'terms_and_conditions'
);
const termsAndConditionsLabel = document.getElementById(
	'terms_and_conditions_label'
);
const styledCheckbox = document.querySelector('.styled-checkbox');

// Carousel Elements
const carouselInner = document.querySelector('.carousel-inner');
const carouselIndicators = document.querySelector('.carousel-indicators');

// Services Elements
const servicesContainer = document.querySelector('.services-container');

// Products Elements
const homePageProductsContainer = document.querySelector('.products-container');

// Posts Elements
const postsContainer = document.querySelector('.posts-container');

let windowWidth = window.innerWidth;

window.onresize = () => {
	windowWidth = window.innerWidth;
	if (postsContainer) setPosts();
};

const toggleCheckbox = () => {
	termsAndConditionsCheckbox.click();
	if (termsAndConditionsCheckbox.checked) {
		styledCheckbox.classList.add('active');
	} else {
		styledCheckbox.classList.remove('active');
	}
};

const toggleMenu = () => {
	navbar.classList.toggle('active');
};

const setCarouselImages = () => {
	let html = '';
	SliderImages.map((image, index) => {
		html += `
			<div class="carousel-item ${index === 0 ? 'active' : ''}">
					<img
					loading="lazy"
						src=${image.path}
						class="d-block w-100"
						alt="" />
				</div>
		`;
	});

	carouselInner.innerHTML += html;
};

const setCarouselIndicators = () => {
	let html = '';
	SliderImages.map((image, index) => {
		html += `
			<button
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide-to="${index}"
					class=${index === 0 ? 'active' : ''}
	${index === 0 ? 'aria-current="true"' : ''}
					aria-label="Slide ${index + 1}"></button>
		`;
	});
	carouselIndicators.innerHTML = html;
	const buttons = document.querySelectorAll('.carousel-indicators button');
	moveSlider(buttons);
};

const moveSlider = (buttons) => {
	let activeButton = 0;
	setInterval(() => {
		if (activeButton === buttons.length - 1) {
			activeButton = 0;
		} else {
			activeButton += 1;
		}
		if (carouselInner) {
			if (buttons) {
				buttons.forEach((button, index) => {
					if (index !== activeButton) {
						button.classList.remove('active');
					} else {
						button.classList.add('active');
						button.click();
					}
				});
			}
		}
	}, 3000);
	buttons.forEach((button, index) => {
		button.onclick = () => {
			activeButton = index;
		};
	});
};

const setServicesCards = () => {
	let html = '';
	servicesData.map((service) => {
		html += `
			<div class="service-card">
					<img
						src=${service.image}
						alt=${service.i18n} />
					<div>
						<h3 data-i18n=${service.i18n}>${service.name}</h3>
						<a
							href=${service.bookLink}
							data-i18n="book_now"
							class="circular-button circular-button-transparent fw-bold">
							احجز الان
						</a>
					</div>
				</div>
		`;
	});
	servicesContainer.innerHTML = html;
};

const setProducts = (cardsNo = 4) => {
	let html = '';
	productsData.slice(0, cardsNo).map((product) => {
		html += `
			<a href=${product.productLink} class="product-card">
						<div class="product-image">
							<img
								src=${product.image}
								alt=${product.i18n} />
						</div>
						<div class="product-details">
							<p data-i18n=${product.i18n}>${product.name}</p>
							<div class="d-flex gap-1 align-items-center">
								<p>${product.price}</p>
								<p data-i18n="rsa">ر.س</p>
							</div>
						</div>
					</a>
		`;
	});
	homePageProductsContainer.innerHTML = html;
};

const setPosts = () => {
	let html = '';
	postsData.map((post) => {
		html += `
			<a
							href=${post.postLink}
							class="post-card d-flex flex-row gap-3">
							<div class="w-50 overflow-hidden rounded-4">
								<img
									height="170px"
									width="100%"
									src=${post.image}
									alt="" />
							</div>
							<div class="d-flex flex-column gap-md-3 gap-2 justify-content-between">
								<div>
									<h4
										data-i18n=${post.i18nTitle}
										class="text-black">
										${post.title}
									</h4>
								</div>
								<div class="d-flex flex-column post-description gap-md-4 gap-2">
									<p data-i18n=${post.i18nDescription}>
										${
											windowWidth <= 768
												? post.description.substring(0, 20)
												: post.description.substring(0, 50)
										}...
									</p>
									<div class="d-flex flex-column flex-lg-row gap-md-3 gap-2 align-items-lg-center">
										<p data-i18n=${post.i18nTag}>${post.tag}</p>
										<p data-i18n=${post.i18nDate}>${post.date}</p>
									</div>
								</div>
							</div>
						</a>
		`;
	});
	postsContainer.innerHTML = html;
};

if (navbar) menu.addEventListener('click', toggleMenu);
if (navbar) closeMenu.addEventListener('click', toggleMenu);
if (styledCheckbox) styledCheckbox.addEventListener('click', toggleCheckbox);
if (termsAndConditionsLabel)
	termsAndConditionsLabel.addEventListener('click', toggleCheckbox);

if (carouselInner) {
	setCarouselImages();
}
if (carouselIndicators) setCarouselIndicators();
if (servicesContainer) setServicesCards();
if (homePageProductsContainer) setProducts();
if (postsContainer) setPosts();

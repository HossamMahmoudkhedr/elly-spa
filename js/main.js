import { SliderImages } from '../data/sliderImages.js';
import { servicesData } from '../data/servicesData.js';
import { productsData } from '../data/productsData.js';
import { postsData } from '../data/postsData.js';
import { productsTypes } from '../data/productsTypes.js';
import { getParameterByName } from './helpers.js';

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
const ProductsPageProductsContainer = document.querySelector(
	'.all-products-container'
);
const typesContainer = document.querySelector('.types-form');
const sizeBtns = document.querySelectorAll('.size-button');

// Posts Elements
const postsContainer = document.querySelector('.posts-container');

// Sidebar Elements
const sidebar = document.querySelector('.sidebar');
const filterIcon = document.getElementById('filter-icon');
const ItemTitle = document.querySelectorAll('.item-title');
const ItemContent = document.querySelectorAll('.item-content');
const arrowDown = document.querySelectorAll('.arrow-down-icon');
const closeFilter = document.querySelector('.close-filter');

// Services Elements
// const ServiceTypesContainer = document.querySelector('.service-types');

let windowWidth = window.innerWidth;

window.onresize = () => {
	windowWidth = window.innerWidth;
	if (postsContainer) setPosts();
};

const toggleCheckbox = (e) => {
	e.preventDefault();

	termsAndConditionsCheckbox.checked = !termsAndConditionsCheckbox.checked;
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
	const id = getParameterByName('id');
	let data = servicesData;
	if (id) {
		data = servicesData.filter((service) => service.id != id);
	}
	data.map((service) => {
		html += `
			<div class="service-card">
					<img
						src=${service.image}
						alt=${service.i18n} />
					<div>
						<h3 data-i18n=${service.i18n}>${service.name}</h3>
						<a
							href='./services.html?id=${service.id}'
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

const setProducts = (container, cardsNo = 4) => {
	let html = '';
	productsData.slice(0, cardsNo).map((product) => {
		html += `
			<div class="product-card">
						<div class="product-image position-relative overflow-hidden">
						${
							container === ProductsPageProductsContainer
								? `<button id=${product.id} class='add-to-favourites favourite'><svg width="22" height="22" viewBox="0 0 22 22" fill="inherit" xmlns="http://www.w3.org/2000/svg">
<path d="M18.4801 4.58332C17.5084 3.6091 16.2203 3.01448 14.8485 2.90689C13.4768 2.79931 12.1117 3.18583 11.0001 3.99666C9.83374 3.12916 8.38204 2.73579 6.93731 2.89577C5.49258 3.05576 4.16212 3.7572 3.21386 4.85886C2.2656 5.96051 1.76997 7.38055 1.82678 8.833C1.8836 10.2855 2.48863 11.6624 3.52005 12.6867L9.21255 18.3883C9.68923 18.8575 10.3312 19.1204 11.0001 19.1204C11.6689 19.1204 12.3109 18.8575 12.7876 18.3883L18.4801 12.6867C19.5503 11.6098 20.1511 10.1532 20.1511 8.63499C20.1511 7.11674 19.5503 5.66016 18.4801 4.58332ZM17.1876 11.4217L11.4951 17.1142C11.4303 17.1796 11.3532 17.2315 11.2682 17.2669C11.1832 17.3024 11.0921 17.3206 11.0001 17.3206C10.908 17.3206 10.8169 17.3024 10.7319 17.2669C10.6469 17.2315 10.5698 17.1796 10.5051 17.1142L4.81255 11.3942C4.09366 10.6593 3.69111 9.67217 3.69111 8.64416C3.69111 7.61615 4.09366 6.62901 4.81255 5.89416C5.54511 5.17089 6.53311 4.76534 7.56255 4.76534C8.59199 4.76534 9.57999 5.17089 10.3126 5.89416C10.3978 5.98007 10.4992 6.04827 10.6109 6.09481C10.7226 6.14134 10.8424 6.1653 10.9634 6.1653C11.0844 6.1653 11.2042 6.14134 11.3159 6.09481C11.4276 6.04827 11.529 5.98007 11.6142 5.89416C12.3468 5.17089 13.3348 4.76534 14.3642 4.76534C15.3937 4.76534 16.3817 5.17089 17.1142 5.89416C17.843 6.61938 18.2588 7.60116 18.2725 8.6292C18.2862 9.65724 17.8967 10.6498 17.1876 11.3942V11.4217Z" fill="white"/>
</svg>
</button>`
								: ''
						}
								<a href='./product.html?id=${product.id}'>
							<img
								src=${product.image}
								alt=${product.i18n} />
								</a>
								<button class="add-to-cart-btn px-2 position-absolute start-50 translate-middle-x circular-button circular-button-transparent" data-i18n="add_to_cart">اضف الى السلة</button>
						</div>
						<a href='./product.html?id=${product.id}' class="product-details">
							<p data-i18n=${product.i18n}>${product.name}</p>
							<div class="d-flex gap-1 align-items-center">
								<p>${product.price}</p>
								<p data-i18n="sar">ر.س</p>
							</div>
						</a>
					</div>
		`;
	});
	container.innerHTML = html;
};

const setPosts = () => {
	let html = '';
	postsData.slice(0, 3).map((post) => {
		html += `
			<a
							href=${post.postLink}
							class="post-card d-flex flex-row gap-3">
							<div class=" overflow-hidden rounded-4">
								<img
									height="100%"
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
									${post.tags
										.map(
											(tag) =>
												`<p data-i18n=${post.i18nTag} class=" d-none d-lg-block post-tag">${tag.name}</p>`
										)
										.join('')}
										<p data-i18n=${post.i18nTag} class=" d-block d-lg-none post-tag">${
			post.tags[0].name
		}</p>
										<p data-i18n=${post.i18nDate}>${post.date}</p>
									</div>
								</div>
							</div>
						</a>
		`;
	});
	postsContainer.innerHTML = html;
};

// Start Multi Range Implementation
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
	const [from, to] = getParsed(fromInput, toInput);
	fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
	if (from > to) {
		fromSlider.value = to;
		fromInput.value = to;
	} else {
		fromSlider.value = from;
	}
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
	const [from, to] = getParsed(fromInput, toInput);
	fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
	setToggleAccessible(toInput);
	if (from <= to) {
		toSlider.value = to;
		toInput.value = to;
	} else {
		toInput.value = from;
	}
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
	const [from, to] = getParsed(fromSlider, toSlider);
	fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
	if (from > to) {
		fromSlider.value = to;
		fromInput.value = to;
	} else {
		fromInput.value = from;
	}
}

function controlToSlider(fromSlider, toSlider, toInput) {
	const [from, to] = getParsed(fromSlider, toSlider);
	fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
	setToggleAccessible(toSlider);
	if (from <= to) {
		toSlider.value = to;
		toInput.value = to;
	} else {
		toInput.value = from;
		toSlider.value = from;
	}
}

function getParsed(currentFrom, currentTo) {
	const from = parseInt(currentFrom.value, 10);
	const to = parseInt(currentTo.value, 10);
	return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
	const rangeDistance = to.max - to.min;
	const fromPosition = from.value - to.min;
	const toPosition = to.value - to.min;
	controlSlider.style.background = `linear-gradient(
			to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
	const toSlider = document.querySelector('#toSlider');
	if (Number(currentTarget.value) <= 0) {
		toSlider.style.zIndex = 2;
	} else {
		toSlider.style.zIndex = 0;
	}
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
if (fromSlider && toSlider && fromInput && toInput) {
	fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
	setToggleAccessible(toSlider);

	fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
	toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
	fromInput.oninput = () =>
		controlFromInput(fromSlider, fromInput, toInput, toSlider);
	toInput.oninput = () =>
		controlToInput(toSlider, fromInput, toInput, toSlider);
}
// End Multi Range Implementation

const showItemContent = (index) => {
	ItemContent[index].classList.toggle('active');
	arrowDown[index].classList.toggle('active');
};

const setTypes = () => {
	let html = '';
	productsTypes.map((type) => {
		html += `
			<div
				class="d-flex align-items-center justify-content-between">
						<div class="type-checkbox d-flex gap-2 align-items-center">
							<input
							id=${type.id}
							name=${type.id}
							data-i18n=${type.namei18n}
							type="checkbox"
							hidden
							class="" />
							<div class="styled-checkbox mb-0">
								<span
									><svg
										width="12"
										height="8"
										viewBox="0 0 12 9"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M10.9142 0.292969C11.3047 0.683493 11.3047 1.31666 10.9142 1.70718L4.70711 8.20718C4.31658 8.5977 3.68342 8.5977 3.29289 8.20718L0.292893 5.20718C-0.0976311 4.81666 -0.0976311 4.18349 0.292893 3.79297C0.683417 3.40245 1.31658 3.40245 1.70711 3.79297L4 6.08586L9.5 0.292969C9.89052 -0.0975556 10.5237 -0.0975556 10.9142 0.292969Z"
											fill="white" />
									</svg>
								</span>
							</div>
							<label
								id=${type.id}
								for=${type.id}
								data-i18n=${type.namei18n}
								class="cursor-pointer"
								>${type.name}</label
							>
						</div>
						<span class="text-black-50">(${type.numberOfProducts})</span>
					</div>
		`;
	});
	typesContainer.innerHTML = html;
	const checkboxes = document.querySelectorAll('.type-checkbox');
	checkboxes.forEach((el) => {
		el.onclick = (e) => {
			e.currentTarget.children[0].checked =
				!e.currentTarget.children[0].checked;
			if (e.currentTarget.children[0].checked) {
				e.currentTarget.children[1].classList.add('active');
			} else {
				e.currentTarget.children[1].classList.remove('active');
			}
		};
	});
};

const toggleSidebar = () => {
	sidebar.classList.toggle('active');
};

const selectProductSize = (e) => {
	let currentTarget = e.currentTarget;
	sizeBtns.forEach((btn) => {
		btn.classList.remove('selected');
	});
	currentTarget.classList.add('selected');
};

// const setServicesTypes = () => {
// 	let html = '';
// 	servicesData[0].types.map((service) => {
// 		html += `
// 			<div class="service">
// 							<div class="service-info">
// 								<div>
// 									<h4>${service.name}</h4>
// 									<p>
// 										${service.description}
// 									</p>
// 									<div class="d-flex gap-3 align-items-center">
// 										<button
// 											class="circular-button circular-button-primary fw-normal fs-6 no-hover px-4">
// 											حجز
// 										</button>
// 										<div
// 											class="whatsapp-icon position-static"
// 											style="padding: 8px 12px 10px 12px">
// 											<a href=${service.bookLink}>
// 												<svg
// 													width="20"
// 													height="20"
// 													viewBox="0 0 32 32"
// 													fill="none"
// 													xmlns="http://www.w3.org/2000/svg">
// 													<path
// 														d="M25.4 6.54664C24.1776 5.31188 22.7216 4.33287 21.1169 3.66671C19.5121 3.00056 17.7908 2.66059 16.0533 2.66664C8.77334 2.66664 2.84 8.59998 2.84 15.88C2.84 18.2133 3.45334 20.48 4.6 22.48L2.73334 29.3333L9.73334 27.4933C11.6667 28.5466 13.84 29.1066 16.0533 29.1066C23.3333 29.1066 29.2667 23.1733 29.2667 15.8933C29.2667 12.36 27.8933 9.03998 25.4 6.54664ZM16.0533 26.8666C14.08 26.8666 12.1467 26.3333 10.4533 25.3333L10.0533 25.0933L5.89334 26.1866L7 22.1333L6.73334 21.72C5.637 19.9693 5.05486 17.9456 5.05334 15.88C5.05334 9.82664 9.98667 4.89331 16.04 4.89331C18.9733 4.89331 21.7333 6.03998 23.8 8.11998C24.8233 9.1386 25.6343 10.3502 26.1859 11.6845C26.7375 13.0189 27.0187 14.4495 27.0133 15.8933C27.04 21.9466 22.1067 26.8666 16.0533 26.8666ZM22.08 18.6533C21.7467 18.4933 20.12 17.6933 19.8267 17.5733C19.52 17.4666 19.3067 17.4133 19.08 17.7333C18.8533 18.0666 18.2267 18.8133 18.04 19.0266C17.8533 19.2533 17.6533 19.28 17.32 19.1066C16.9867 18.9466 15.92 18.5866 14.6667 17.4666C13.68 16.5866 13.0267 15.5066 12.8267 15.1733C12.64 14.84 12.8 14.6666 12.9733 14.4933C13.12 14.3466 13.3067 14.1066 13.4667 13.92C13.6267 13.7333 13.6933 13.5866 13.8 13.3733C13.9067 13.1466 13.8533 12.96 13.7733 12.8C13.6933 12.64 13.0267 11.0133 12.76 10.3466C12.4933 9.70665 12.2133 9.78664 12.0133 9.77331H11.3733C11.1467 9.77331 10.8 9.85331 10.4933 10.1866C10.2 10.52 9.34667 11.32 9.34667 12.9466C9.34667 14.5733 10.5333 16.1466 10.6933 16.36C10.8533 16.5866 13.0267 19.92 16.3333 21.3466C17.12 21.6933 17.7333 21.8933 18.2133 22.04C19 22.2933 19.72 22.2533 20.2933 22.1733C20.9333 22.08 22.2533 21.3733 22.52 20.6C22.8 19.8266 22.8 19.1733 22.7067 19.0266C22.6133 18.88 22.4133 18.8133 22.08 18.6533Z"
// 														fill="white" />
// 												</svg>
// 											</a>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 							<div class="service-image">
// 								<img
// 									src=${service.image}
// 									alt="" />
// 							</div>
// 						</div>
// 		`;
// 		ServiceTypesContainer.innerHTML = html;
// 	});
// };

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
if (homePageProductsContainer) setProducts(homePageProductsContainer);
if (ProductsPageProductsContainer)
	setProducts(ProductsPageProductsContainer, productsData.length);
if (postsContainer) setPosts();
if (ItemContent && ItemTitle) {
	ItemTitle.forEach((item, index) => {
		item.onclick = () => {
			showItemContent(index);
		};
	});
}
if (typesContainer) setTypes();
if (filterIcon) filterIcon.addEventListener('click', toggleSidebar);
if (closeFilter) closeFilter.addEventListener('click', toggleSidebar);
if (sizeBtns) {
	sizeBtns.forEach((btn) => btn.addEventListener('click', selectProductSize));
}
// if (ServiceTypesContainer) setServicesTypes();

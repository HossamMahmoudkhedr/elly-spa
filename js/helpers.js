export function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
	let results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const mainImage = document.querySelector('.main-image');

const activeSubImage = (e, img) => {
	const currentTarget = e.currentTarget;
	const images = document.querySelectorAll('.sub-image');
	images.forEach((image) => {
		image.classList.remove('selected');
	});
	mainImage.children[0].src = img.link;
	currentTarget.classList.add('selected');
};

export const createMainImg = (images) => {
	const img = document.createElement('img');
	img.src = images[images.length - 1].link;
	mainImage.appendChild(img);
};

export const createSubImgs = (images) => {
	const subImages = document.querySelector('.more-images');
	images.map((img, i) => {
		const div = document.createElement('div');
		const subImage = document.createElement('img');
		subImage.src = img.link;
		subImage.alt = img.name;
		div.classList.add('sub-image');
		div.appendChild(subImage);
		if (i === images.length - 1) {
			div.classList.add('selected');
		}
		div.onclick = (e) => {
			activeSubImage(e, img);
		};
		subImages.appendChild(div);
	});
};

export const setData = (itemContainer, itemData) => {
	itemContainer.innerText = itemData || '';
};

export const setServicesTypes = (types, serviceId, container) => {
	let html = '';
	types.map((service) => {
		html += `
			<div class="service">
							<div class="service-info">
								<div>
									<h4>${service.name}</h4>
									<p>
										${service.description}
									</p>
									<div class="d-flex gap-3 align-items-center">
										<a href='./service_book.html?serviceId=${serviceId}&serviceTypeId=${service.id}'
											class="circular-button circular-button-primary fw-normal fs-6 no-hover px-4">
											حجز
										</a>
										<div
											class="whatsapp-icon position-static"
											style="padding: 8px 12px 10px 12px">
											<a href=''>
												<svg
													width="20"
													height="20"
													viewBox="0 0 32 32"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M25.4 6.54664C24.1776 5.31188 22.7216 4.33287 21.1169 3.66671C19.5121 3.00056 17.7908 2.66059 16.0533 2.66664C8.77334 2.66664 2.84 8.59998 2.84 15.88C2.84 18.2133 3.45334 20.48 4.6 22.48L2.73334 29.3333L9.73334 27.4933C11.6667 28.5466 13.84 29.1066 16.0533 29.1066C23.3333 29.1066 29.2667 23.1733 29.2667 15.8933C29.2667 12.36 27.8933 9.03998 25.4 6.54664ZM16.0533 26.8666C14.08 26.8666 12.1467 26.3333 10.4533 25.3333L10.0533 25.0933L5.89334 26.1866L7 22.1333L6.73334 21.72C5.637 19.9693 5.05486 17.9456 5.05334 15.88C5.05334 9.82664 9.98667 4.89331 16.04 4.89331C18.9733 4.89331 21.7333 6.03998 23.8 8.11998C24.8233 9.1386 25.6343 10.3502 26.1859 11.6845C26.7375 13.0189 27.0187 14.4495 27.0133 15.8933C27.04 21.9466 22.1067 26.8666 16.0533 26.8666ZM22.08 18.6533C21.7467 18.4933 20.12 17.6933 19.8267 17.5733C19.52 17.4666 19.3067 17.4133 19.08 17.7333C18.8533 18.0666 18.2267 18.8133 18.04 19.0266C17.8533 19.2533 17.6533 19.28 17.32 19.1066C16.9867 18.9466 15.92 18.5866 14.6667 17.4666C13.68 16.5866 13.0267 15.5066 12.8267 15.1733C12.64 14.84 12.8 14.6666 12.9733 14.4933C13.12 14.3466 13.3067 14.1066 13.4667 13.92C13.6267 13.7333 13.6933 13.5866 13.8 13.3733C13.9067 13.1466 13.8533 12.96 13.7733 12.8C13.6933 12.64 13.0267 11.0133 12.76 10.3466C12.4933 9.70665 12.2133 9.78664 12.0133 9.77331H11.3733C11.1467 9.77331 10.8 9.85331 10.4933 10.1866C10.2 10.52 9.34667 11.32 9.34667 12.9466C9.34667 14.5733 10.5333 16.1466 10.6933 16.36C10.8533 16.5866 13.0267 19.92 16.3333 21.3466C17.12 21.6933 17.7333 21.8933 18.2133 22.04C19 22.2933 19.72 22.2533 20.2933 22.1733C20.9333 22.08 22.2533 21.3733 22.52 20.6C22.8 19.8266 22.8 19.1733 22.7067 19.0266C22.6133 18.88 22.4133 18.8133 22.08 18.6533Z"
														fill="white" />
												</svg>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="service-image">
								<img
									src=${service.image}
									alt="" />
							</div>
						</div>
		`;
		container.innerHTML = html;
	});
};

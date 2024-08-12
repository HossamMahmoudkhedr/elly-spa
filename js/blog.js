import { postsData } from '../data/postsData.js';

const postsContainer = document.querySelector('.posts');

const setPosts = () => {
	let html = '';
	postsData.map((post) => {
		html += `
            <a
					href="#"
					class="post-card d-flex flex-column flex-row gap-3">
					<div class="post-image overflow-hidden rounded-4">
						<img
							height="100%"
							width="100%"
							src=${post.image}
							alt="" />
					</div>
					<div
						class="d-flex flex-column-reverse flex-lg-column gap-md-3 gap-2 justify-content-between">
						<div
							class="date-duration d-flex align-items-center justify-content-between">
							<p>${post.date}</p>
							<p>${post.readTime}</p>
						</div>
                        <div class="d-flex flex-column gap-md-3 gap-2 justify-content-between">
                        
						<div>
							<h4
								data-i18n="${post.i18nTitle}"
								class="text-black">
                                ${post.title}
							</h4>
						</div>
						<div class="d-flex flex-column post-description gap-md-4 gap-2">
							<p data-i18n="${post.i18nDescription}">
                                ${post.description.substring(0, 30)}...
							</p>
                            <div
								class="d-flex flex-column flex-lg-row gap-md-3 gap-2 align-items-lg-center">
                                ${post.tags
																	.map(
																		(tag) => `<p
									data-i18n="${post.i18nTag}"
									class="d-none d-lg-block circular-button border-opacity-10 border-dark py-2 text-black fw-normal">
									${tag.name}
								</p>`
																	)
																	.join('')}
								
								<p
									data-i18n="${post.i18nTag}"
									class="d-block d-lg-none post-tag py-2 text-primary">
									${post.tags[0].name}
								</p>
							</div>
						</div>
                        </div>
					</div>
				</a>
        `;
	});
	postsContainer.innerHTML = html;
};

setPosts();

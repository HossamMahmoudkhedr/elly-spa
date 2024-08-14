import { servicesData } from '../data/servicesData.js';
import {
	createMainImg,
	createSubImgs,
	getParameterByName,
	setData,
	setServicesTypes,
} from './helpers.js';

const serviceId = getParameterByName('serviceId');
const serviceTypeId = getParameterByName('serviceTypeId');
const currentService = servicesData.filter(
	(service) => service.id == serviceId
)[0];
const currentServiceType = currentService.types.filter(
	(type) => type.id == serviceTypeId
)[0];

const serviceName = document.getElementById('product-name');
const servicePrice = document.getElementById('product-price');
const serviceDescription = document.getElementById('product-description');
const serviceNumberOfRates = document.getElementById('number-of-rates');

const serviceNameContainer = document.getElementById('service-name');
const info = document.getElementById('benefits');
const ServiceTypesContainer = document.querySelector('.service-types');
const duration = document.getElementById('duration');

const serviceImages = currentServiceType.serviceImages;

createMainImg(serviceImages);
createSubImgs(serviceImages);
setData(serviceName, currentServiceType.name);
setData(serviceNameContainer, currentServiceType.name);
setData(servicePrice, currentServiceType.price);
setData(serviceDescription, currentServiceType.description);
setData(serviceNumberOfRates, currentServiceType.numberOfRates);
setData(info, currentServiceType.info);
setData(duration, currentServiceType.duration);

let types = currentService.types.filter(
	(service) => service.id != serviceTypeId
);
setServicesTypes(types, serviceId, ServiceTypesContainer);

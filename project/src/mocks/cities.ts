import { City } from '../types/city';

const paris: City = {
  id: 1,
  name: 'Paris',
  lat: 48.8534,
  lng: 2.3488,
  zoom: 13,
};

const cologne: City = {
  id: 2,
  name: 'Cologne',
  lat: 50.9333,
  lng: 6.95,
  zoom: 13,
};

const brussels: City = {
  id: 3,
  name: 'Brussels',
  lat: 50.8504,
  lng: 4.34878,
  zoom: 13,
};

const amsterdam: City = {
  id: 4,
  name: 'Amsterdam',
  lat: 52.374,
  lng: 4.88969,
  zoom: 13,
};

const hamburg: City = {
  id: 5,
  name: 'Hamburg',
  lat: 53.5753,
  lng: 10.0153,
  zoom: 13,
};

const dusseldorf: City = {
  id: 6,
  name: 'Dusseldorf',
  lat: 51.2217,
  lng: 6.77616,
  zoom: 13,
};

export const cities: City[] = [paris, cologne, brussels, amsterdam, hamburg, dusseldorf];

import { City } from '../types/city';

const paris: City = {
  name: 'Paris',
  lat: 48.8534,
  lng: 2.3488,
  zoom: 13,
};

const cologne: City = {
  name: 'Cologne',
  lat: 50.9333,
  lng: 6.95,
  zoom: 13,
};

const brussels: City = {
  name: 'Brussels',
  lat: 50.8504,
  lng: 4.34878,
  zoom: 13,
};

const amsterdam: City = {
  name: 'Amsterdam',
  lat: 52.374,
  lng: 4.88969,
  zoom: 13,
};

const hamburg: City = {
  name: 'Hamburg',
  lat: 53.5753,
  lng: 10.0153,
  zoom: 13,
};

const dusseldorf: City = {
  name: 'Dusseldorf',
  lat: 51.2217,
  lng: 6.77616,
  zoom: 13,
};

export const cities: City[] = [paris, cologne, brussels, amsterdam, hamburg, dusseldorf];

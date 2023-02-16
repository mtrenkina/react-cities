export type City = {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}

export type CityMock = {
  location: {
      latitude: number;
      longitude: number;
      zoom: number;
  };
  name: string;
}

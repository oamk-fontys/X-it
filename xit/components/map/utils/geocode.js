import { readAsStringAsync, writeAsStringAsync, getInfoAsync, documentDirectory } from 'expo-file-system';
import localCityCoords from './cityCoords.json';
import { saveCityCoord } from './saveCityCoord';

const CITY_COORDS_PATH = `${documentDirectory}cityCoords.json`;
const API_KEY = '66qd7IKejm31O+8I6kMriw==Q5sLsZkFHZheOKnW';

const ensureInitialCityCoords = async () => {
    const fileInfo = await getInfoAsync(CITY_COORDS_PATH);
    if (!fileInfo.exists) {
      await writeAsStringAsync(
        CITY_COORDS_PATH,
        JSON.stringify(localCityCoords, null, 2)
      );
      console.log("Initial cityCoords cache written");
    }
  };
  
  export const fetchCityCoordinates = async (city) => {
    try {
      await ensureInitialCityCoords();
  
      const json = await readAsStringAsync(CITY_COORDS_PATH);
      const fileData = JSON.parse(json);
  
      if (fileData[city]) {
        return fileData[city];
      }
  
      // Not cached, call API
      const response = await fetch(
        `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(city)}`,
        { headers: { 'X-Api-Key': API_KEY } }
      );
  
      const data = await response.json();
      if (!data || !data[0]) throw new Error('No results');
  
      const coords = {
        lat: parseFloat(data[0].latitude),
        lng: parseFloat(data[0].longitude),
      };
  
      // Save to file
      await saveCityCoord(city, coords);
      return coords;
    } catch (err) {
      console.error(`Failed to fetch coordinates for city "${city}"`, err);
      return null;
    }
  };

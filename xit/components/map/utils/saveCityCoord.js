import { readAsStringAsync, writeAsStringAsync, documentDirectory } from 'expo-file-system';

const CITY_COORDS_PATH = `${documentDirectory}cityCoords.json`;

export const saveCityCoord = async (city, coords) => {
  try {
    let currentData = {};
    try {
      const json = await readAsStringAsync(CITY_COORDS_PATH);
      currentData = JSON.parse(json);
    } catch (e) {
      currentData = {};
    }

    if (!currentData[city]) {
      currentData[city] = coords;
      await writeAsStringAsync(CITY_COORDS_PATH, JSON.stringify(currentData, null, 2));
      console.log(`Saved coordinates for ${city}`);
    }
  } catch (err) {
    console.error(`Failed to save coordinates for ${city}`, err);
  }
};

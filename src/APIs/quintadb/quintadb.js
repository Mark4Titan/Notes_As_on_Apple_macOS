import ky from "ky";
import iniStat from "./iniStat.json";

const apiKey = `?rest_api_key=${process.env.REACT_APP_APIKEY}`;
const appId = `${process.env.REACT_APP_APP_ID}`;
const entityId = `${process.env.REACT_APP_ENTITY_ID}`;


const api = ky.create({
  prefixUrl: "https://quintadb.com.ua/apps",  
});
// /apps/APP_ID/dtypes/entity/ENTITY_ID.json
export const getAllRecords = async () => {
  try {
    const data = await api.get(`${appId}/dtypes/entity/${entityId}.json${apiKey}`).json();
    // const data= iniStat
    return {data: data.records, status: 200};
  } catch (error) {
    return {
      data: {
        data: [],
        masage: "Failed to connect QuintaDB",
        status: error.status === undefined ? 404 : error.status,
      },
    };
  }
};

// /apps/APP_ID/dtypes/ID.json
export const deleteRecord = async () => {
  const id = 'DSJ5-8KkFF18B5m6pRc3n'
  try {
    const data = await api.delete(`${appId}/dtypes/${id}.json${apiKey}`).json();
    return {data: data, status: 200};
  } catch (error) {
    return {
      data: {
        data: [],
        masage: "Failed to connect QuintaDB",
        status: error.status === undefined ? 404 : error.status,
      },
    };
  }
};

// /apps/APP_ID/dtypes.json



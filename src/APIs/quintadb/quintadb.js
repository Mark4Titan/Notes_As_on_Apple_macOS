import axios from "axios";
import iniStat from "./iniStat.json";

const apiKey = process.env.REACT_APP_APIKEY;
const appId = process.env.REACT_APP_APP_ID;
const entityId = process.env.REACT_APP_ENTITY_ID;


const Url = "https://quintadb.com.ua/apps";

// /apps/APP_ID/dtypes/entity/ENTITY_ID.json
export const getAllRecords = async () => {
  try {
    // const response = await axios({
    //   method: "GET",
    //   url: `${Url}/${appId}/dtypes/entity/${entityId}.json?rest_api_key=${apiKey}`,
    // });         
    // return { data: response.data.records, status: response.status, masage: '' };

    const element = iniStat.records;
    return { data: element, status: 404, masage: 'load => iniStat.records' };
  } catch (error) {
    return {      
        data: [],
        masage: "Failed to connect QuintaDB!",
        status: error.status === undefined ? 404 : error.status,      
    };
  }
};

// /apps/APP_ID/dtypes/ID.json
export const deleteRecord = async (item) => {  
  try {
    const response = await axios({
      method: "DELETE",
      url: `${Url}/${appId}/dtypes/${item.id}.json`,
      data: {
        rest_api_key: apiKey,
      },
    });
    if (response.status === 200) {
      return { data: item, status: 200 };
    } else {
      return { data: {}, status: response.status, masage: '' };
    }
  } catch (error) {
    return {
      data: {
        data: {},
        masage: "Failed to delete record!",
        status: error.status === undefined ? 404 : error.status,
      },
    };
  }
};

// /apps/APP_ID/dtypes/ID.json
export const editRecord = async (changeItem, id) => {
  try {   
    const response = await axios({
      method: "PUT",
      url: `${Url}/${appId}/dtypes/${id}.json`,
      data: {
        rest_api_key: apiKey,
        values: {...changeItem,  entity_id: entityId,},
      },
    });
    
    return { data: response.data.record, status: response.status, masage: '' };
  } catch (error) {
    return {
      data: {
        data: {},
        masage: "Failed to connect Failed to make QuintaDB from mine!",
        status: error.status === undefined ? 404 : error.status,
      },
    };
  }
};

export const addRecord = async (newItem) => {
 
  try {    
    const response = await axios({
      method: "POST",
      url: `${Url}/${appId}/dtypes.json`,
      data: {
        rest_api_key: apiKey,
        values: {...newItem,  entity_id: entityId,},
      },
    });
    
    return { data: response.data.record, status: response.status, masage: '' };
  } catch (error) {
    return {
      data: {
        data: {},
        masage: "Failed to create new record in QuintaDB!",
        status: error.status === undefined ? 404 : error.status,
      },
    };
  }
};

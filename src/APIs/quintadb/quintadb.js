import ky from "ky";
import axios from "axios";
import iniStat from "./iniStat.json";
import { fieldKeysDB } from "./fieldKeysDB";

const apiKey = process.env.REACT_APP_APIKEY;

const appId = process.env.REACT_APP_APP_ID;
const entityId = process.env.REACT_APP_ENTITY_ID;

const { tCreated, tTitle, tContent, tId, tQuintadb, tIndexeddb } = fieldKeysDB;

const Url = "https://quintadb.com.ua/apps";

// /apps/APP_ID/dtypes/entity/ENTITY_ID.json
export const getAllRecords = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${Url}/${appId}/dtypes/entity/${entityId}.json?rest_api_key=${apiKey}`,
    });
    const element = response.data.records;
    return { data: element, status: response.status };

    // const element = iniStat.records;
    // return { data: element, status: 200 };
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
export const deleteRecord = async (item) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${Url}/${appId}/dtypes/${item.idQuintadb}.json`,
      data: {
        rest_api_key: apiKey,
      },
    });
    if (response.status === 200) {
      return { data: item, status: 200 };
    } else {
      return { data: [], status: response.status };
    }
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
export const editRecord = async (item) => {
  try {
   
    const response = await axios({
      method: "PUT",
      url: `${Url}/${appId}/dtypes/${item.idQuintadb}.json`,
      data: {
        rest_api_key: apiKey,
        values: {
          entity_id: entityId,
          [tContent]: item.content,
          [tTitle]: item.title,
          [tCreated]: item.created,
          [tId]: item?.id,

          [tQuintadb]: item.quintadb,
          [tIndexeddb]: item.indexeddb,
        },
      },
    });
    // const element = response.data.record;
    // console.log(element)
    return { data: response.data.record, status: response.status };
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

export const addRecord = async (item) => {
  try {
    console.log("item",item)
    const response = await axios({
      method: "POST",
      url: `${Url}/${appId}/dtypes.json`,
      data: {
        rest_api_key: apiKey,
        values: {
          entity_id: entityId,
          [tContent]: item.content,
          [tTitle]: item.title,
          [tCreated]: item.created,
          [tId]: item?.id,

          [tQuintadb]: item.quintadb,
          [tIndexeddb]: item.indexeddb,
        },
      },
    });
    const element = response.data.record;
    console.log(element);
    return { data: response.data.record, status: response.status };
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

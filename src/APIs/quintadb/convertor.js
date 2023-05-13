import { fieldKeysDB } from "./fieldKeysDB";
import { addRecord, deleteRecord, editRecord, getAllRecords } from "./quintadb";

const { tCreated, tTitle, tContent, tId, tQuintadb, tIndexeddb } = fieldKeysDB;

function Convertor() {
  async function getAll() {
    const elements = [];

    const records = await getAllRecords();
    for (const el of records.data) {
      elements.push({
        created: el.values[tCreated],
        title: el.values[tTitle],
        content: el.values[tContent],
        id: el.values[tId],
        idQuintadb: el.id,
        quintadb: el.values[tQuintadb] === "false" ? false : true,
        indexeddb: el.values[tIndexeddb] === "false" ? false : true,
      });
    }

    // return { datd: [], status: 200 };
    return { datd: elements, status: records.status };
  }


// 
  async function delRecord(item) {    
    const records = await deleteRecord(item);    
    const newAtem = {
      ...item,
      quintadb: records.status === 200 ? false : true,
    };

    return { data: newAtem, status: records.status };
  }


// 
  async function changeRecord(item) {   
    const records = await editRecord(item);   
    return { data: records, status: records.status };
  }

  async function cloneRecord(item) {   
    const records = await addRecord(item);   
    return { data: records, status: records.status };
  }
  async function addRecord(item) {   
    const records = await addRecord(item);   
    return { data: records, status: records.status };
  }

  return { getAll, delRecord, changeRecord, cloneRecord, addRecord };
}




export default Convertor;

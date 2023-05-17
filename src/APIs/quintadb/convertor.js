import moment from "moment/moment";
import { addRecord, deleteRecord, editRecord, getAllRecords } from "./quintadb";


const tCreated= "dcRvtdP8jilOo5WPbxfSou"
  const tTitle= "buWR7cRrzdWP7cK8krv09J"
  const tContent= "dcSCoUW7bdH4kgW4HSFGOo"

function Convertor() {
  async function getAll() {
    const elements = [];

    const records = await getAllRecords();
    if (records.status === 404) return { data: [], status: records.status, masage: records.masage };
  
    for (const el of records.data) {
      elements.push({
        created: el.values[tCreated],
        title: el.values[tTitle] === undefined ? '' : el.values[tTitle],
        content: el.values[tContent] === undefined ? '' : el.values[tContent],
        id: el.id,
        quintadb: true,
        indexeddb: false,
      });
    }
    return { datd: elements, status: records.status, masage: records.masage };   
   
  }

  //
  async function delRecord(item) {
    const records = await deleteRecord(item);
    if (records.status === 404) return records;

    return { data: item, status: records.status, masage: records.masage };
  }

  //
  async function changeRecord(item) {
    if (item.id === undefined) return { data: {}, status: 404 };
    
    const changeItem = {
      [tCreated]: item.created,  
      [tTitle]: item.title,
      [tContent]: item.content,
    };
   

    const records = await editRecord(changeItem, item.id);
    if (records.status === 404) return { data: [], status: records.status, masage: records.masage };
 
    const newEdit = {
     created : records.data.values[tCreated],     
      title: records.data.values[tTitle],     
      content: records.data.values[tContent],    
      id: records.data.id,
      quintadb: true,
      indexeddb: false,
    };
    
    return { data: newEdit, status: records.status, masage: records.masage };
  }



  async function addRec(item) {
    const newItem = {
      [tContent]: item.content === undefined ? "" : item.content,
      [tTitle]: item.title === undefined ? "" : item.title,
      [tCreated]: moment().format("DD.MM.YYYY  (HH:mm)"),    
    };

    const records = await addRecord(newItem);
    if (records.status === 404) return { data: [], status: records.status, masage: records.masage };   
    const newRecord = {
      id: records.data.id,
      quintadb: true,
      indexeddb: false,
      created: records.data.values[tCreated],
    };

    return { data: newRecord, status: records.status, masage: records.masage };
  }

  return { getAll, delRecord, changeRecord, addRec };
}

export default Convertor;

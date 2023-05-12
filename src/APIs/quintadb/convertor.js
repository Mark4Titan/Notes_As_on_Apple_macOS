import { getAllRecords } from "./quintadb";

const tCreated = `${process.env.REACT_APP_TRANSLATOR_CREATED}`;
const tTitle = `${process.env.REACT_APP_TRANSLATOR_TITLE}`;
const tContent = `${process.env.REACT_APP_TRANSLATOR_CONTENT}`;
const tId = `${process.env.REACT_APP_TRANSLATOR_IDITEM}`;

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
        quintadb: true,
      });
    }

    return {datd:elements, status: records.status};
  }

  return { getAll };
}

export default Convertor;

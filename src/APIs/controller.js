const controller = () => {
  const items = [
    {
      id: 1,
      data: "9.05.2023  (23:59)",
      db: { indexeddb: false, quintadb: false },
      title: "Lorem Ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      data: "10.05.2023  (00:46)",
      db: { indexeddb: true, quintadb: false },
      title: "text of the",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has be.",
    },
    {
      id: 3,
      data: "10.05.2023  (00:46)",
      db: { indexeddb: false, quintadb: true },
      title: "simply dummy",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has be.",
    },
    {
      id: 4,
      data: "10.05.2023  (00:46)",
      db: { indexeddb: false, quintadb: true },
      title: " industry. Lorem",
      content:
        "and typesetting industry. Lorem Ipsum has be.",
    },
    {
      id: 511,
      data: "10.05.2023  (00:46)",
      db: { indexeddb: true, quintadb: true },
      title: "of the printing an",
      content:
        "Lorem of the printing an Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has be.",
    },
    
  ];
  return items;
};
export default controller;

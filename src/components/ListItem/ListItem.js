// import moment from "moment/moment";

import { useEffect, useRef, useState } from "react";
import {
  DivBasis,
  DivDB,
  LiItems,
  DivList,
  UlListContent,
  DivTitle,
} from "./ListItem.styled";
import useWindowSize from "../../Hooks/useWindowSize";
import Icons from "../ico/Icons";

const ListItem = ({ items, closeCart, openCart, openItem, stateInput }) => {
  // console.log(moment().format('DD/MM/YYYY  HH:mm'))
  const [item, setItems] = useState(items);
  let myRef = useRef(null);

  useEffect(() => {
    setItems(() => {
      return items.filter((item) =>
        Object.keys(item)
          .filter((key) => key !== "id")
          .some((key) =>
            item[key]
              .toString()
              .toLowerCase()
              .includes(stateInput.toLowerCase())
          )
      );
    });
  }, [items, stateInput]);

  const manager = (data) => {
    if (openItem.id === data.id) return closeCart();
    return openCart(data);
  };

  const contentPat = [220, 480, 5, 35];
  const titlePat = [220, 480, 10, 35];

  let contentWi = useWindowSize(myRef, contentPat);
  let titlWi = useWindowSize(myRef, titlePat);

  return (
    <DivList>
      <UlListContent ref={myRef}>
        {item.map((elem) => (
          <LiItems
            key={elem.id}
            SColor={openItem.id === undefined ? true : openItem.id === elem.id}
            onClick={() => manager(elem)}
          >
            <DivBasis>
              <DivTitle>{elem.title?.substr(0, titlWi.inW)}</DivTitle>
              <div>{elem.content?.substr(0, contentWi.inW)}...</div>
              <div>{elem.created?.substr(0, 10)}</div>
            </DivBasis>
            <DivDB>
              <div>
                {elem.indexeddb !== undefined && elem.indexeddb ? (
                  <Icons ico="Databas" C="StyDatabasIn" />
                ) : (
                  <Icons ico="Databas" C="StyDatabasOut" />
                )}
              </div>
              <div>
                {elem.quintadb !== undefined && elem.quintadb ? (
                  <Icons ico="cloud" C="StyDatabasIn" />
                ) : (
                  <Icons ico="cloud" C="StyDatabasOut" />
                )}
              </div>
            </DivDB>
          </LiItems>
        ))}
      </UlListContent>
    </DivList>
  );
};
export default ListItem;

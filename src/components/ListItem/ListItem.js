import { useEffect, useRef, useState } from "react";
import {
  DivBasis,
  LiItems,
  DivList,
  UlListContent,
  DivTitle,
} from "./ListItem.styled";
import useWindowSize from "../../Hooks/useWindowSize";
import Icons from "../ico/Icons";

const ListItem = ({ items, closeCart, openCart, openItem, stateSearch }) => {
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
              .includes(stateSearch.toLowerCase())
          )
      );
    });
  }, [items, stateSearch]);

  const manager = (data) => {
    if (openItem.id === data.id) return closeCart();
    return openCart(data);
  };

  const titlePat = [220, 480, 7, 27];
  const contentPat = [220, 480, 4, 35];

  let titlWi = useWindowSize(myRef, titlePat);
  let contentWi = useWindowSize(myRef, contentPat);

  return (
    <DivList SColor={openItem.id === undefined}>
      <UlListContent ref={myRef}>
        {item.map((elem) => (
          <LiItems
            key={elem.id}
            SColor={openItem.id === undefined ? true : openItem.id === elem.id}
            onClick={() => manager(elem)}
          >
            <DivBasis>
              <DivTitle>{elem.title?.substr(0, titlWi.inW)}</DivTitle>

              {elem.indexeddb !== undefined && elem.indexeddb ? (
                <Icons ico="Databas" C="StyDatabas" />
              ) : (
                <Icons ico="cloud" C="StyDatabas" />
              )}
            </DivBasis>
            <DivBasis template="1fr/1fr 0.4fr">
              <div>{elem.content?.substr(0, contentWi.inW)}...</div>
              <div>{elem.created?.substr(0, 10)}</div>
            </DivBasis>
          </LiItems>
        ))}
      </UlListContent>
    </DivList>
  );
};
export default ListItem;

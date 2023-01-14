import update from "immutability-helper";
import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card.jsx";
const ItemTypes = {
  CARD: "card",
};

const style = {
  padding: "0rem 1rem",
};
const ITEMS = [
  {
    id: 1,
    text: "Write a cool JS library",
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
  {
    id: 4,
    text: "Create some examples",
  },
  {
    id: 5,
    text: "Spam in Twitter and IRC to promote it",
  },
  {
    id: 6,
    text: "???",
  },
  {
    id: 7,
    text: "PROFIT",
  },
  {
    id: 8,
    text: "Write a cool JS library",
  },
  {
    id: 9,
    text: "Make it generic enough",
  },
  {
    id: 10,
    text: "Write README",
  },
  {
    id: 11,
    text: "Create some examples",
  },
  {
    id: 12,
    text: "Spam in Twitter and IRC to promote it",
  },
  {
    id: 13,
    text: "???",
  },
  {
    id: 14,
    text: "PROFIT",
  },
];
const Container = () => {
  const [cards, setCards] = useState(ITEMS);
  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );
  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );
  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  return (
    <div ref={drop} style={style}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  );
};

export default React.memo(Container);

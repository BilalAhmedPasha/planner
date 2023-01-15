import update from "immutability-helper";
import React, { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card.jsx";
const ItemTypes = {
  CARD: "card",
};

const style = {
  padding: "0rem 1rem",
};

const Container = ({ tasks }) => {
  const [cards, setCards] = useState(tasks);
  useEffect(() => {
    setCards(tasks);
  }, [tasks]);
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
  const [selectedCardId, setSelectedCardId] = useState("");
  return (
    <div ref={drop} style={style}>
      {cards.map((card) => (
        <Card
          key={card.id}
          cardDetails={card}
          moveCard={moveCard}
          findCard={findCard}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      ))}
    </div>
  );
};

export default Container;

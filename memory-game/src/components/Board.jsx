import Card from './Card.jsx'

function Board({cards, onCardClick}) {
  return (
    <div className="board">
      {cards.map(card => (
        <Card 
          key={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  )
}

export default Board
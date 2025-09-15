
function Card({ value, isFlipped, onClick }) {
  return (
    <button className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        {isFlipped ? value : "?"}
    </button>
  )
}

export default Card
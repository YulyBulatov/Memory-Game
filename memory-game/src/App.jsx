import './App.css'
import Board from './components/Board.jsx'
import { useState, useEffect} from 'react'

function App() {
  const [cards, setCards] = useState([])       // array of all cards
  const [flipped, setFlipped] = useState([])   // ids of currently flipped cards
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)

  function createDeck() {
    const emojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿']
    const doubled = [...emojis, ...emojis]
    const shuffled = doubled.sort(() => Math.random() - 0.5)
    return shuffled.map((value, index) => ({
      id: index,
      value,
      matched: false
    }))
  }

  useEffect(() => {
    setCards(createDeck())
  }, [])


  function handleCardClick(id) {
    console.log('Card clicked:', id)
    if (flipped.includes(id)) return
    if (!running) setRunning(true)

      if (flipped.length === 0) {
        setFlipped([id])
      } else if (flipped.length === 1) {
        const firstId = flipped[0]
        setFlipped([firstId, id])
        setMoves(m => m + 1)

        setTimeout(() => {
          const firstCard = cards.find(c => c.id === firstId)
          const secondCard = cards.find(c => c.id === id)

          if (firstCard.value === secondCard.value) {
            setCards(prev => prev.map(c => 
              c.id === firstId || c.id === id ? {...c, matched: true} : c
            ))
          }

          setFlipped([])
        }, 800)
      }
    }

    useEffect(() => {
  if (!running) return
  const id = setInterval(() => setTime(t => t + 1), 1000)
  return () => clearInterval(id)
}, [running])

function resetGame() {
  setCards(createDeck())
  setFlipped([])
  setMoves(0)
  setTime(0)
  setRunning(false)
}



    useEffect(() => {
      if (cards.length > 0 && cards.every(card => card.matched)) {
        setRunning(false)
      }
    }, [cards])


  return (
    <div className="App">
      <header>
        <h1>Hello Memory Game</h1>
      </header>
      <main>
        <div>Moves: {moves} | Time: {time}s</div>
        <button onClick={resetGame}>Reset Game</button>
        <Board cards={cards.map(c => ({
          ...c, isFlipped: flipped.includes(c.id) || c.matched
        }))} onCardClick={handleCardClick} />
      </main>
    </div> 
  )
}

export default App

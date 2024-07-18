import { useEffect, useMemo, useState } from "react"
import { CardData } from "../../utils/types.ts"
import n1_data from "../../assets/jlptn1.json"
import n2_data from "../../assets/jlptn2.json"
import n3_data from "../../assets/jlptn3.json"
import n4_data from "../../assets/jlptn4.json"
import n5_data from "../../assets/jlptn5.json"

const FlashCard = () => {
  type JLPTLevel = "N1" | "N2" | "N3" | "N4" | "N5"
  const levels: JLPTLevel[] = ["N1", "N2", "N3", "N4", "N5"]
  // <Record<JLPTLevel, boolean>>  key type, value type
  const [selectedButtons, setSelectedButtons] = useState<
    Record<JLPTLevel, boolean>
  >({
    N1: true,
    N2: true,
    N3: true,
    N4: true,
    N5: true,
  })

  const [randomCard, setRandomCard] = useState<CardData | null>(null)
  const [answerState, setAnswerState] = useState(false)
  const handleButtonClick = (level: JLPTLevel) => {
    setSelectedButtons((prevState) => ({
      ...prevState,
      [level]: !prevState[level],
    }))
    console.log(level)
  }

  // Combine data function
  const combineData = () => {
    const dataMap = {
      N1: n1_data,
      N2: n2_data,
      N3: n3_data,
      N4: n4_data,
      N5: n5_data,
    }

    let combined: CardData[] = []

    for (const level in selectedButtons) {
      if (selectedButtons[level as JLPTLevel]) {
        combined = combined.concat(dataMap[level as keyof typeof dataMap])
      }
    }
    return combined
  }

  // Update data everytime selectedButton is updated
  const combinedData = useMemo(() => combineData(), [selectedButtons])

  // Ensure combinedData is run on initial mount
  useEffect(() => {
    combineData()
  }, [])
  // Picking a random card
  const pickRandomCard = () => {
    if (combinedData.length > 0) {
      const randomIndex = Math.floor(Math.random() * combinedData.length)
      setRandomCard(combinedData[randomIndex])
    }
  }
  useEffect(() => {
    pickRandomCard()
    console.log(combinedData)
  }, [combinedData])

  const handleAnswerButton = () => {
    // Pick a new card if card is flipped
    if (answerState) {
      pickRandomCard()
    }
    setAnswerState((prevState) => !prevState)
  }
  return (
    <section className="flex flex-col items-center gap-4 innerWidth">
      {/* Level Selector */}
      <h1 className="text-center text-xl">Test Your Knowledge</h1>
      <p className=""> Level Select:</p>
      <div className="flex flex-row justify-evenly mb-8 gap-2 px-4">
        {levels.map((level: JLPTLevel) => (
          <button
            key={level}
            className={`level-btn grow max-w-[95px] ${
              selectedButtons[level] ? "selected" : ""
            }`}
            onClick={() => handleButtonClick(level)}
          >
            <span className="hidden sm:inline">JLPT</span> {level}
          </button>
        ))}
      </div>

      {/* Main container */}
      <div className="bg-[#ff3c3c82] w-3/4 h-[400px] text-white flex flex-col items-center rounded-xl justify-center">
        {!answerState && randomCard && (
          <div className="flex flex-col gap-4 justify-center items-center rounded-lg shadow-md w-4/5 h-3/4 p-16">
            {/* Level */}
            <p>{randomCard.level}</p>
            {/* Grammar */}
            <h1 className="text-4xl">{randomCard.grammar}</h1>
            {/* Example sentence */}
            <h2 className="text-2xl text-center"> {randomCard.sentences[0]}</h2>
          </div>
        )}

        {answerState && randomCard && (
          <div className="flex flex-col gap-4 justify-center items-center rounded-lg shadow-md w-4/5 h-3/4 p-16">
            {/* Level */}
            <p>{randomCard.level}</p>

            {/* English */}
            <h2 className="text-2xl text-center"> {randomCard.english}</h2>
            <h2 className="text-2xl text-center"> {randomCard.meaning}</h2>
          </div>
        )}
      </div>
      {/* Buttons */}
      <button className="level-btn" onClick={() => handleAnswerButton()}>
        {answerState ? "Next" : "Answer"}
      </button>
    </section>
  )
}

export default FlashCard

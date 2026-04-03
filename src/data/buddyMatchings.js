import PARTICIPANTS from './participants.js'

// Pre-shuffled participant list with fixed matchings
// Using a seeded shuffle to ensure everyone gets one unique buddy
function seededShuffle(array, seed) {
  let m = array.length
  let t
  let i

  while (m) {
    i = Math.floor(random(seed) * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
    seed++
  }

  return array
}

function random(seed) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

// Shuffle participants with a fixed seed
const SHUFFLED_PARTICIPANTS = seededShuffle([...PARTICIPANTS], 12345)

// Create circular buddy matchings (each person's buddy is the next person)
const BUDDY_MATCHINGS = {}

for (let i = 0; i < SHUFFLED_PARTICIPANTS.length; i++) {
  const currentPerson = SHUFFLED_PARTICIPANTS[i]
  const nextPerson = SHUFFLED_PARTICIPANTS[(i + 1) % SHUFFLED_PARTICIPANTS.length]
  
  BUDDY_MATCHINGS[currentPerson.nickname] = nextPerson
}

// Export the matchings
export default BUDDY_MATCHINGS

// Also export the shuffled list for reference
export { SHUFFLED_PARTICIPANTS }

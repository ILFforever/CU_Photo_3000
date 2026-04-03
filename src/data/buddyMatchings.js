import PARTICIPANTS from './participants.js'
import STAFF from './staff.js'

// Pre-shuffled combined list with fixed matchings
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

// Combine participants and staff
const ALL_PEOPLE = [...PARTICIPANTS, ...STAFF]

// Shuffle combined list with a fixed seed
const SHUFFLED_PEOPLE = seededShuffle([...ALL_PEOPLE], 12345)

// Create circular buddy matchings (each person's buddy is the next person)
const BUDDY_MATCHINGS = {}

for (let i = 0; i < SHUFFLED_PEOPLE.length; i++) {
  const currentPerson = SHUFFLED_PEOPLE[i]
  const nextPerson = SHUFFLED_PEOPLE[(i + 1) % SHUFFLED_PEOPLE.length]
  
  BUDDY_MATCHINGS[currentPerson.nickname] = nextPerson
}

// Export the matchings
export default BUDDY_MATCHINGS

// Also export the shuffled list for reference
export { SHUFFLED_PEOPLE }

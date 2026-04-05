import { createContext, useContext, useState } from 'react';

const VoteContext = createContext(null);

export function VoteProvider({ children }) {
  const [session, setSession] = useState(null);
  // session shape: { phone, fullName, nickname, group, votingCode, votesUsed, votedPhotoIds }

  function startSession(data) {
    setSession({ ...data, votedPhotoIds: [] });
  }

  function recordVote(photoId) {
    setSession((s) => ({
      ...s,
      votesUsed: s.votesUsed + 1,
      votedPhotoIds: [...s.votedPhotoIds, photoId],
    }));
  }

  function clearSession() {
    setSession(null);
  }

  return (
    <VoteContext.Provider value={{ session, startSession, recordVote, clearSession }}>
      {children}
    </VoteContext.Provider>
  );
}

export function useVote() {
  return useContext(VoteContext);
}

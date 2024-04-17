import React from 'react'
import { persistor } from '../../utils/store';

const Bookmarks = () => {
  const handleReset = async () => {
    await persistor.purge(); // Clears the persisted store
    window.location.reload(); // Optional: reload the page to reinitialize the state
};
  return (
    <div>
      <button onClick={handleReset}>reset state</button>
    </div>
  )
}

export default Bookmarks
import React, { useState } from "react";

export default function SearchInput({ sendSearch }) {
  const [state, setState] = useState({ value: '', typing: false, typingTimeout: 0 });

  const changeName = (event) => {
    if (state.typingTimeout) {
      clearTimeout(state.typingTimeout);
    }

    setState({
      value: event.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        sendSearch(state.value);
      }, 4000),
    });
  };

  return (
    <div>
      <input value={state.value} onChange={changeName}></input>
    </div>
  );
}

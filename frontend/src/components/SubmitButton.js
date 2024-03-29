import React from 'react';

function SubmitButton(props) {
  return(
    <div className="submitButton">
      <button
        className="btn"
        disabled={props.disabled}
        onClick={ () => props.onClick()}
      >
        {props.text}
      </button>
    </div>
  );
}

export default SubmitButton;
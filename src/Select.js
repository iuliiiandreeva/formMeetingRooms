import React from 'react';

function Select(props) {

  return (
    <div>
      <label><p>{props.label}</p></label>
      <select value={props.val} required onChange={props.onChange}>
        <option value="">Выбери один из вариантов</option>
        {props.options && props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}


export default Select;
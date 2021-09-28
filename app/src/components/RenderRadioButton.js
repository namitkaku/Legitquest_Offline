import React from "react";

export default function RenderRadioButton({
  compareableLabel,
  CaseCount,
  selected,
  label,
  onClick,
  name,
  defaultValue,
  isSupreamCourt,
}) {
  return (
    <div className="custom-radio">
      <label className="f-14 font-weight-normal d-flex">
        <input
          onClick={() => onClick && onClick(compareableLabel)}
          className="d-none"
          type="radio"
          name={`filter_${name ? name : ""}`}
          defaultChecked={selected}
          defaultValue={defaultValue}
        />
        <span> {label}</span>
        {isSupreamCourt && (
          <img
            style={{
              marginLeft: 10,
              marginTop: 6,
              /* padding: 3.5,   */ maxWidth: 31,
              height: 13,
            }}
            src={"https://www.legitquest.com/lq/idraf-icon.png"}
          />
        )}
        <small className="ml-auto text-primary font-weight-bold">
          {CaseCount}
        </small>
      </label>
    </div>
  );
}

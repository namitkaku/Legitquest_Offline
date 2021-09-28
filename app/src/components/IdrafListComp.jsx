import React, { useState } from "react";

export default function IdrafListComp({
  toggleIdraf,
  IdrafListOpen,
  onSelectIDraf,
  list,
  IdrafSelected
}) {
  const [isOpen, setIsOpen] = useState();
  return (
    <div id="idraf" className="form-group mb-0">
      <label
        onClick={() => toggleIdraf(!IdrafListOpen)}
        className={
          IdrafListOpen
            ? "mb-2 text-muted d-flex align-items-center"
            : "mb-2 text-muted d-flex align-items-center collapsed"
        }
        data-toggle="collapse"
        data-target="#idraf-filter">
        <div className="arrow-triangle mr-2" /> By iDraf
      </label>
      <ul
        className={
          IdrafListOpen
            ? "filter-list mb-0 collapse list-unstyled show "
            : "filter-list mb-0 collapse list-unstyled"
        }
        id="idraf-filter">
        <li className="mb-1 pl-2">
          {list?.map((item, key) => {
            return (
              <div key={key} className="custom-radio">
                <label className="f-14 font-weight-normal d-flex">
                  <input
                    onClick={()=>onSelectIDraf(item)}
                    className="d-none"
                    type="radio"
                    name="disposition"
                    /* defaultValue */
                    defaultChecked={IdrafSelected ===item}
                  />
                  <span> {item}</span>
                </label>
              </div>
            );
          })}
        </li>
      </ul>
    </div>
  );
}

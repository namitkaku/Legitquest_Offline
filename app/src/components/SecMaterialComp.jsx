import React from "react";
 
import { secMaterialList } from "../utils/appConst";

export default function SecMaterialComp({toogleScMaterial, secondrayMaterial}) {
  return (
    <div className="search-top-bar mb-0">
      <nav>
        <div className="listing-tabs owl-carousel list-unstyled mb-0 capitalizeClass owl-loaded owl-drag">
          <div className="owl-stage-outer">
            <div className="owl-stage row">
              {secMaterialList?.map((item, key) => {
                const { label, value } = item;
                return (
                  <div key={key} className={"owl-item"}>
                    <a
                      onClick={() => {
                        toogleScMaterial({ value });
                      }}
                      className={
                        secondrayMaterial == value
                          ? "active-link m-1 active"
                          : "active-link m-1"
                      }
                      data-id={value}>
                      {label}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

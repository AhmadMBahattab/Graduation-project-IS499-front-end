import React, { Component } from "react";
import Dropdown from "react-dropdown";

const AdvanceSearchFiltter = ({
  advanceSearch,
  handelInputChange,
  applyAdvanceSearch,
  cancelAdvanceSearch,
  onChangeCity,
}) => {
  let citys = [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Medina",
    "Dammam",
    "Al Hufuf",
    "Buraydah",
    "Al hillah",
    "Tabuk",
    "Khamis Mushayt",
    "Al Qatif",
    "Al Mubarraz",
    "Al Kharj",
    "Najran",
    "Yanbu",
    "Abha",
    "Arar",
    "Jazan",
    "Sakaka",
    "Baḩah",
  ];
  let neighborhoods = [
    "al-falah",
    " al-rawda",
    "al-naseem",
    " al-sali",
    "al-hamra",
    "cordoba",
    "al jazeera",
    "deira",
    "menfouha",
    "al-malaz",
    "al-suwaidi",
    "araq",
    "al-maqla",
    "qarnata",
    "shifa",
    "ghadeer",
    "al-navel",
    "mansoura",
    "king saud university",
    "al rayyan ",
    "al-batha",
    "al thumama",
  ];
  const { minPrice, maxPrice, chaletHight, chaletWidth, pitches } =
    advanceSearch;
  return (
    <React.Fragment>
      <div className="fillter-search-container">
        <div className="price-container">
          <label htmlFor="price">Min price</label>
          <input
            name="minPrice"
            type="number"
            className=" form-control"
            placeholder={minPrice}
            onChange={handelInputChange}
          />
          <label htmlFor="price">Max price</label>
          <input
            name="maxPrice"
            type="number"
            className=" form-control"
            placeholder={maxPrice}
            onChange={handelInputChange}
          />
        </div>
        <br />
        <div className="price-container">
          <label htmlFor="hight">Chalet length</label>
          <input
            name="chaletHight"
            type="number"
            className=" form-control"
            placeholder={chaletHight}
            onChange={handelInputChange}
          />
          <label htmlFor="width">Chalet width</label>
          <input
            name="chaletWidth"
            type="number"
            className=" form-control"
            placeholder={chaletWidth}
            onChange={handelInputChange}
          />
        </div>
        <br />
        <Dropdown
          options={citys.sort()}
          onChange={onChangeCity}
          value="Select your city..."
          placeholder="Select an option"
        />
        <br />
        <div className="pitchis-container checkbox-container">
          <label htmlFor="football" className="single-checkbox-container">
            Football
            <input
              id="football"
              name="pitch"
              value="Football"
              type="checkbox"
              onChange={handelInputChange}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="pool" className="single-checkbox-container">
            Pool
            <input
              id="pool"
              name="pitch"
              value="Pool"
              type="checkbox"
              onChange={handelInputChange}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="vollyball" className="single-checkbox-container">
            Vollyball
            <input
              id="vollyball"
              name="pitch"
              value="Vollyball"
              type="checkbox"
              onChange={handelInputChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="apply-button-container">
          <button
            onClick={applyAdvanceSearch}
            className="btn btn-primary"
            disabled={
              (advanceSearch.minPrice === "" ||
                advanceSearch.maxPrice === "") &&
              advanceSearch.pitches.length < 1
                ? true
                : false
            }
          >
            Apply
          </button>
          <button className="btn btn-light" onClick={cancelAdvanceSearch}>
            Reset
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdvanceSearchFiltter;

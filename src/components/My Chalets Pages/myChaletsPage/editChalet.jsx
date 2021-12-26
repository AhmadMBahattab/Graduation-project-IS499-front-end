import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { useParams } from "react-router-dom";
import "../../../styles/editChalet.css";
import "../../../styles/createPost.css";

const EditChalet = ({ user, posts, updatePost, canceleUpdatePost }) => {
  const { id } = useParams();

  let singleChalet = posts.filter((e) => e._id === id);
  singleChalet = singleChalet[0];

  const [postId, setId] = useState(singleChalet._id);
  const [ownerName, setOwnerName] = useState(singleChalet.ownerName);
  let [chaletName, setChaletName] = useState(singleChalet.chaletName);
  let [price, setPrice] = useState(singleChalet.price);
  let [chaletHight, setchaletHight] = useState(singleChalet.chaletHight);
  let [chaletWidth, setchaletWidth] = useState(singleChalet.chaletWidth);
  let [image, setimage] = useState(singleChalet.image);
  let [city, setcity] = useState(singleChalet.city);
  let [neighborhood, setneighborhood] = useState(singleChalet.neighborhood);
  let [pitches, setpitches] = useState([]);
  let [type, settype] = useState([]);
  let [description, setDescription] = useState(singleChalet.description);

  const handeleSubmit = (e) => {
    e.preventDefault();
  };
  const onChangeCity = (e) => {
    let city = "";
    city = e.value;
    console.log(city);
    setcity(city);
  };
  const onChangeNeighborhood = (e) => {
    let neighborhood = "";
    neighborhood = e.value;
    console.log(neighborhood);
    setneighborhood(neighborhood);
  };
  const handelePitchesCheckbox = ({ currentTarget: input }) => {
    let index = pitches.indexOf(input.value);
    if (index === -1) {
      pitches.push(input.value);
      pitches.sort();
    }
    if (index !== -1) {
      pitches.splice(index, 1);
    }

    console.log(pitches);
    setpitches(pitches);
  };
  const handeleTypesCheckbox = ({ currentTarget: input }) => {
    let index = type.indexOf(input.value);
    if (index === -1) {
      type.push(input.value);
      type.sort();
    }
    if (index !== -1) {
      type.splice(index, 1);
    }

    console.log(type);
    settype(type);
  };

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
  return (
    <div className="edit-chalet-container">
      {singleChalet === null || singleChalet === undefined ? (
        <Redirect to="/not-found" />
      ) : (
        <div></div>
      )}
      <div className="editChalet-container">
        <div
          style={{ color: "gray" }}
          onClick={() => canceleUpdatePost(user._id)}
          className="closeEdit-btn"
        >
          X
        </div>
        <form
          onSubmit={handeleSubmit}
          // method="POST"

          encType="multipart/form-data"
        >
          <div className="create-post-image">
            <br />

            <div className="editPost-image">
              <img
                src={require(`../../../Photos/${image}`).default}
                width={200}
                height={100}
              />
              <div className="input">
                <input
                  hidden={true}
                  className="custom-file-input"
                  id="file"
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setimage(e.target.files[0].name);
                  }}
                  required
                />
                <label htmlFor="file">Change image</label>
              </div>
            </div>

            <hr />
          </div>
          <div className="create-post-information-area">
            <div className="post-info">
              <div className="txt_field">
                <input
                  type="text"
                  name="chaletName"
                  maxLength={25}
                  value={chaletName}
                  onChange={(e) => {
                    setChaletName(e.target.value);
                  }}
                  required
                />
                <span></span>
                <label>Chalet name</label>
              </div>
              <div className="txt_field">
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  required
                />
                <span></span>
                <label>Chalet price</label>
              </div>
              <div className="txt_field">
                <input
                  type="number"
                  name="chaletHight"
                  maxLength={25}
                  value={chaletHight}
                  onChange={(e) => {
                    setchaletHight(e.target.value);
                  }}
                  required
                />
                <span></span>
                <label>Chalet length</label>
              </div>
              <div className="txt_field">
                <input
                  type="number"
                  name="chaletWidth"
                  value={chaletWidth}
                  onChange={(e) => {
                    setchaletWidth(e.target.value);
                  }}
                  required
                />
                <span></span>
                <label>Chalet width</label>
              </div>
              <Dropdown
                options={citys.sort()}
                onChange={onChangeCity}
                value={city}
                placeholder="Select an option"
              />
              <Dropdown
                options={neighborhoods.sort()}
                onChange={onChangeNeighborhood}
                value={neighborhood}
                placeholder="Select an option"
              />

              <div className="checkbox-container">
                {``}
                <p style={{ color: "gray" }}>Chalet contain...</p>
                <label className="single-checkbox-container" htmlFor="pool">
                  Pool{" "}
                  <input
                    type="checkbox"
                    id="pool"
                    name="pitch"
                    value="Pool"
                    onChange={handelePitchesCheckbox}
                  />
                  <span className="checkmark"></span>
                </label>

                <label className="single-checkbox-container" htmlFor="football">
                  Football pitch
                  <input
                    type="checkbox"
                    id="football"
                    name="pitch"
                    value="Football"
                    onChange={handelePitchesCheckbox}
                  />
                  <span className="checkmark"></span>
                </label>

                <label
                  className="single-checkbox-container"
                  htmlFor="vollyball"
                >
                  Volleyball pitch
                  <input
                    type="checkbox"
                    id="vollyball"
                    name="pitch"
                    value="Vollyball"
                    onChange={handelePitchesCheckbox}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="checkbox-container">
                {``}
                <p className="requier" style={{ color: "gray" }}>
                  Chalet type...
                </p>
                <label className="single-checkbox-container" htmlFor="family">
                  Family{" "}
                  <input
                    type="checkbox"
                    id="family"
                    name="chaletType"
                    value="Family"
                    onChange={handeleTypesCheckbox}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="single-checkbox-container" htmlFor="single">
                  Singles
                  <input
                    type="checkbox"
                    id="single"
                    name="chaletType"
                    value="Singles"
                    onChange={handeleTypesCheckbox}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <br />
            </div>
            <div>
              <textarea
                maxLength={80}
                className="form-control textarea"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <br />
          <div className="create-post-buttons">
            <button
              disabled={
                image !== null &&
                price > 100 &&
                price < 10000 &&
                chaletName.length > 4 &&
                chaletName.length < 30 &&
                city != "" &&
                neighborhood != ""
                  ? false
                  : true
              }
              onClick={() =>
                updatePost(
                  user._id,
                  postId,
                  chaletName,
                  ownerName,
                  price,
                  chaletHight,
                  chaletWidth,
                  description,
                  image,
                  pitches,
                  type,
                  city,
                  neighborhood
                )
              }
              style={{ marginRight: 5 }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChalet;

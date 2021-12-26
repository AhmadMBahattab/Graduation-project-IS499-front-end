import React, { Component } from "react";
import Dropdown from "react-dropdown";
import { BsFillImageFill } from "react-icons/bs";
import "react-dropdown/style.css";
import "../../../styles/createPost.css";

const apiEndPoint = "http://localhost:5000/myChalets/myChaletsPage";
class CreatePost extends Component {
  state = {
    post: {
      ownerName: "test owner name",
      chaletName: "test",
      city: "",
      neighborhood: "",
      chaletHight: 0,
      chaletWidth: 0,
      price: 0,
      rate: 0,
      image: null,
      fileName: null,
      phoneNumber: "00011",
      description: "",
      pitches: [],
      type: [],
    },
    citys: [
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
    ],
    neighborhoods: [
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
    ],
    checked: false,
    buttonState: true,
  };
  onChangeFile = (e) => {
    let post = { ...this.state.post };

    if (e.target.name === "file") {
      post.image = e.target.files[0].name;
      post.fileName = e.target.files[0];
      console.log(post.fileName);
    }
    this.setState({ post });
  };
  onChangeCity = (e) => {
    let post = { ...this.state.post };
    console.log(post);
    post.city = e.value;
    console.log(post);
    this.setState({ post });
  };
  onChangeNeighborhoods = (e) => {
    let post = { ...this.state.post };
    console.log(post);
    post.neighborhood = e.value;
    console.log(post);
    this.setState({ post });
  };
  handeleInputChange = ({ currentTarget: input }) => {
    let post = { ...this.state.post };
    post[input.name] = input.value;

    if (input.name == "pitch") {
      let index = post.pitches.indexOf(input.value);
      if (index === -1) {
        post.pitches.push(input.value);
        post.pitches.sort();
      }
      if (index !== -1) {
        post.pitches.splice(index, 1);
      }
      console.log("pitchis are : ", post.pitches);
    }
    if (input.name == "chaletType") {
      let index = post.type.indexOf(input.value);
      if (index === -1) {
        post.type.push(input.value);
        post.type.sort();
      }
      if (index !== -1) {
        post.type.splice(index, 1);
      }
      console.log("chalet type is : ", post.type);
    }
    this.setState({ post });
  };

  handeleSubmit = (e) => {
    e.preventDefault();

    console.log("Handle submite working", this.state.post);
  };
  closeCreatePostComponnent = (userId) => {
    window.location = "/myChalets/myChaletsPage/" + userId;
  };

  render() {
    const { addPostOfBackend, closeButton, closeCreatePost, user } = this.props;

    const { citys, neighborhoods, post } = this.state;
    return (
      <React.Fragment>
        {closeButton && (
          <div className="middle">
            <div
              className="close-btn"
              style={{ color: "gray" }}
              onClick={closeCreatePost}
            >
              X
            </div>

            <form
              onSubmit={this.handeleSubmit}
              // method="POST"
              encType="multipart/form-data"
            >
              <div className="create-post-image">
                <br />
                <br />
                {!post.image ? (
                  <>
                    <input
                      className="custom-file-input"
                      id="file"
                      type="file"
                      name="file"
                      accept="image/png, image/jpeg, image/jpg"
                      // onChange={this.handeleInputChange}
                      onChange={this.onChangeFile}
                    />
                  </>
                ) : (
                  <div className="createPost-image">
                    <img
                      src={require(`../../../Photos/${post.image}`).default}
                      width={200}
                      height={100}
                    />
                    <div className="input ">
                      <input
                        hidden={true}
                        className="custom-file-input "
                        id="file"
                        type="file"
                        name="file"
                        accept="image/png, image/jpeg, image/jpg"
                        // onChange={this.handeleInputChange}
                        onChange={this.onChangeFile}
                      />
                      <label htmlFor="file">Change image</label>
                    </div>
                  </div>
                )}
                <hr />
              </div>
              <div className="create-post-information-area">
                <div className="post-info">
                  <div className="txt_field">
                    <input
                      type="text"
                      name="chaletName"
                      onChange={this.handeleInputChange}
                      maxLength={25}
                      required
                    />
                    <span></span>
                    <label>Chalet name</label>
                  </div>
                  <div className="txt_field">
                    <input
                      type="number"
                      name="price"
                      onChange={this.handeleInputChange}
                      required
                    />
                    <span></span>
                    <label>Chalet price</label>
                  </div>
                  <div className="txt_field">
                    <input
                      type="number"
                      name="chaletHight"
                      onChange={this.handeleInputChange}
                      maxLength={25}
                      required
                    />
                    <span></span>
                    <label>Chalet length</label>
                  </div>
                  <div className="txt_field ">
                    <input
                      type="number"
                      name="chaletWidth"
                      onChange={this.handeleInputChange}
                      required
                    />
                    <span></span>
                    <label>Chalet width</label>
                  </div>
                  <div>
                    <Dropdown
                      options={citys.sort()}
                      onChange={this.onChangeCity}
                      value="Select your city..."
                      placeholder="Select an option"
                    />
                  </div>
                  <div>
                    <Dropdown
                      options={neighborhoods.sort()}
                      onChange={this.onChangeNeighborhoods}
                      value="Select your neighborhood..."
                      placeholder="Select an option"
                    />
                  </div>

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
                        onChange={this.handeleInputChange}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label
                      className="single-checkbox-container"
                      htmlFor="football"
                    >
                      Football pitch
                      <input
                        type="checkbox"
                        id="football"
                        name="pitch"
                        value="Football"
                        onChange={this.handeleInputChange}
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
                        onChange={this.handeleInputChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="checkbox-container">
                    {``}
                    <p className="requier" style={{ color: "gray" }}>
                      Chalet type...
                    </p>
                    <label
                      className="single-checkbox-container"
                      htmlFor="family"
                    >
                      family{" "}
                      <input
                        type="checkbox"
                        id="family"
                        name="chaletType"
                        value="Family"
                        onChange={this.handeleInputChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label
                      className="single-checkbox-container"
                      htmlFor="single"
                    >
                      Single
                      <input
                        type="checkbox"
                        id="single"
                        name="chaletType"
                        value="Singles"
                        onChange={this.handeleInputChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div className="discription-area">
                  <textarea
                    maxLength={150}
                    className="form-control textarea"
                    name="description"
                    placeholder="Chalet description"
                    onChange={this.handeleInputChange}
                  ></textarea>
                </div>
              </div>
              <br />
              <div className="create-post-buttons">
                <button
                  type="submit"
                  disabled={
                    post.image !== null &&
                    post.price > 100 &&
                    post.price < 10000 &&
                    post.chaletName.length > 4 &&
                    post.chaletName.length < 30 &&
                    post.city != "" &&
                    post.neighborhood != ""
                      ? false
                      : true
                  }
                  onClick={() => addPostOfBackend(user, post)}
                  style={{ marginRight: 5 }}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
            <br />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CreatePost;

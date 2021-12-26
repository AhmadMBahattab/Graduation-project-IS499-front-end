import React, { Component } from "react";
import CommentDate from "./commentDate";
import { getMyChalets } from "../../Services/myChaletesData";
import http from "../../Services/httpService";
import { MdDelete, MdOutlineClear } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { ThemeConsumer } from "styled-components";

const EndPoint = "http://localhost:5000/home/chalet";
const EndPointComment = "http://localhost:5000/comment";
class Comments extends Component {
  state = {
    comment: "",
    chaletComments: [],
    commentDate: null,
  };

  async componentDidMount() {
    let { data: chaletComments } = await http.get(EndPointComment);
    chaletComments = chaletComments.sort((a, b) => {
      return ("" + b.date).localeCompare(a.date);
    });
    this.setState({ chaletComments });
  }
  addToBackendComment = async (singleChaletId, user, date) => {
    let chaletComments = [...this.state.chaletComments];
    console.log(date);
    const newComment = {
      postId: singleChaletId,
      user,
      userId: user._id,
      userName: user.userName,
      fullName: user.firstName + " " + user.lastName,
      image: user.image,
      comment: this.state.comment.slice(),
      roles: {
        hideUserName: user.roles.hideUserName,
        hideFullName: user.roles.hideFullName,
        hidePersonalImage: user.roles.hidePersonalImage,
      },
      date: date,
    };

    if (newComment.comment.length <= 0)
      return console.log("comment litters < 1");

    const { data: comment } = await http.post(
      EndPoint + "/" + singleChaletId,
      newComment
    );

    console.log(comment);
    chaletComments = [comment, ...chaletComments];

    this.setState({ chaletComments, comment: "" });
    // window.location = "/home/chalet/" + singleChaletId;
  };
  deleteCommentBackend = async (id, user, comment) => {
    let userAndComment = { ...user, ...comment };
    let chaletComments = [...this.state.chaletComments];
    chaletComments = chaletComments.filter(
      (comment) => comment.comment !== userAndComment.comment
    );
    const { data: coment } = await http.put(
      EndPoint + "/" + id,
      userAndComment
    );
    console.log(coment);

    this.setState({ chaletComments });
  };
  cancleInput = () => {
    // delete the wrettin comment on the input form
    this.setState({ comment: "" });
  };
  updateInput = (key, value) => {
    console.log(key, value);
    if (value.length == 100) return;
    this.setState({ [key]: value });
  };

  dateOfTheComment = () => {
    let commentDate = new Date();
    CommentDate = commentDate.toLocaleString();
    this.setState({ commentDate });
    return commentDate;
  };
  render() {
    const { chaletComments, comment, commentDate } = this.state;
    const { singleChalet, user } = this.props;

    const postComments = chaletComments.filter((comment) => {
      return comment.postId == singleChalet._id;
    });

    console.log(postComments);
    return (
      <React.Fragment>
        <h1>Comments</h1>
        {/* Comment label input & buttons */}
        <div className="comment-buttons">
          {comment.length > 0 ? (
            <div className="clear-button">
              <TiDelete onClick={() => this.cancleInput()} />
            </div>
          ) : null}

          <input
            className="form-control"
            placeholder="Add comment..."
            type="text"
            value={this.state.comment}
            onChange={(e) => this.updateInput("comment", e.target.value)}
          />
          <br />
          <button
            className="btn btn-primary"
            disabled={user ? false : true}
            onClick={() =>
              this.addToBackendComment(
                singleChalet._id,
                user,
                new Date().toLocaleString()
              )
            }
          >
            Comment
          </button>
        </div>

        {/* Comments container in the chalet page */}

        <div className="comments-container">
          {singleChalet
            ? postComments.map((comment) => (
                <div key={comment._id} className="singl-comment-container">
                  <div className="singl-comment-tools-container">
                    <div className="comment-user-info">
                      {user ? (
                        <img
                          className="comment-image"
                          src={
                            comment.roles.hidePersonalImage
                              ? require(`../../Photos/defaultUser.png`).default
                              : require(`../../Photos/${comment.image}`).default
                          }
                          alt="User profile image"
                          width={65}
                          height={60}
                        />
                      ) : (
                        <img
                          className="comment-image"
                          src={require(`../../Photos/defaultUser.png`).default}
                          alt="User profile image"
                          width={65}
                          height={60}
                        />
                      )}
                      {user ? (
                        <div style={{ paddingLeft: 10 }}>
                          {comment.roles.hideFullName ? (
                            <div>
                              <h4>Anonymes</h4>
                            </div>
                          ) : (
                            <div>
                              <h4>{comment.fullName}</h4>
                            </div>
                          )}

                          {comment.roles.hideUserName ? (
                            <div>
                              <p>@Anonymes</p>
                              <p style={{ color: "gray" }}>
                                <CommentDate dateAsString={comment.date} />
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p>@{comment.userName}</p>
                              <p style={{ color: "gray" }}>
                                <CommentDate dateAsString={comment.date} />
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p
                          style={{
                            paddingLeft: 10,
                            fontSize: 12,
                            color: "red",
                          }}
                        >
                          be member to see comment info
                        </p>
                      )}
                    </div>
                    <div className="delete-comment-button">
                      {user && user._id === comment.userId ? (
                        <button
                          onClick={() =>
                            this.deleteCommentBackend(user._id, user, comment)
                          }
                        >
                          <MdDelete style={{ color: "gray", fontSize: 20 }} />
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <hr />

                  <div className="user-comment-comment-section">
                    {comment.comment}
                  </div>
                </div>
              ))
            : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Comments;

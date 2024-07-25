import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../ApiHelper/AllApis";

import { GalleryContext } from "./GalleryContext";

interface Params {
  id?: string;
}

const ArtDetail: React.FunctionComponent = () => {
  const [artworkData, setArtworkData] = useState<any>();
  const params: Params = useParams();
  const [notification, setNotification] = useState<string>("");

  //Get the context
  const context = useContext(GalleryContext);

  const { name, setName, comment, setComment, comments, setComments, artName, setArtName } = context;

  //fetching art data
  const getData = async (id: string) => {
    const data = await getSingleData({ id });
    setArtworkData(data);
  };
  useEffect(() => {
    params?.id && getData(params.id);
  }, [params.id]);

  const navigate = useNavigate();

  // back button function
  const handleClickgallery = () => {
    navigate("/");
  };

  // dummy img url
  const dummyImageUrl = `https://lh3.googleusercontent.com/ci/AL18g_QgKwWYiYGeRxuLUWjnR5tRizbeYNmwX3VMls2WSkleZDnDXWxCrk1Rj4zVkHty7RZpXTouOE8`;

  //handle image error function
  const handleImgError = (event: any) => {
    event.target.src = dummyImageUrl;
  };

  // handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newComment = { name, comment, artName: artworkData?.data?.title || "default" };
    setComments([...comments, newComment]);
    setName("");
    setComment("");
    setNotification("Thanks for adding a comment");
    setTimeout(() => {
      setNotification("");
    }, 1000);
  };

  return (
    <>
      <div className="artwork-container">
        {/* back button */}
        <div className="backbtn ">
          <button onClick={handleClickgallery}> &larr; Back to Gallery</button>
        </div>
        <h2 style={{ margin: "0" }}>{artworkData?.data?.title}</h2>
        <div className="artwork-detail" style={{ display: "flex", justifyContent: "space-around" }}>
          {/* image area  */}
          <div>
            <img
              src={
                artworkData?.data?.image_id
                  ? `https://www.artic.edu/iiif/2/${artworkData?.data?.image_id}/full/843,/0/default.jpg`
                  : dummyImageUrl
              }
              alt={artworkData?.data?.title}
              className="descriptionImage"
              onError={handleImgError}
            ></img>
          </div>

          {/* details area */}
          <div className="artwork-info">
            <p>
              <span>Artist:</span> {artworkData?.data?.artist_title}
            </p>
            <hr style={{ borderTop: "1px solid #f26541" }} />
            <p>
              <span> Artist Information: </span> {artworkData?.data?.artist_display}
            </p>
            <hr style={{ borderTop: "1px solid #f26541" }} />

            <p>
              <span>Place:</span> {artworkData?.data?.place_of_origin}
            </p>
            <hr style={{ borderTop: "1px solid #f26541" }} />

            <p>
              {" "}
              <span>Date:</span> {artworkData?.data?.date_display}
            </p>
            <hr style={{ borderTop: "1px solid #f26541" }} />
            <p>
              <span>Department: </span>
              {artworkData?.data?.department_title}
            </p>
            <hr style={{ borderTop: "1px solid #f26541" }} />

            <p>
              <span>Classification:</span> {artworkData?.data?.classification_title}
            </p>
            <hr style={{ borderTop: "1px solid #f26541" }} />

            <p>
              {" "}
              <span>Medium:</span> {artworkData?.data?.medium_display}
            </p>

            <hr style={{ borderTop: "1px solid #f26541" }} />

            <p>
              <span> Category: </span>
              {artworkData?.data?.category_titles[0]}
            </p>
            <hr style={{ borderTop: "1px solid #f26541" }} />

            <p>
              <span>Dimension:</span> {artworkData?.data?.dimensions}{" "}
            </p>
          </div>
        </div>
        {/* comment section */}
        {/* <div className="comment-section">
          <h3>Add a Comment</h3>
          <form onSubmit={handleSubmit}>
            <div >
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Comment:</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
          {notification && <div className="notification">{notification}</div>}
        </div> */}

<div className="comment-section">
  <h3>Add a Comment</h3>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
    </div>
    <div className="form-group">
      <label htmlFor="comment">Comment:</label>
      <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
    </div>
    <button type="submit" className="submit-button">Submit</button>
  </form>
  {notification && <div className="notification1">{notification}</div>}
</div>

      </div>
    </>
  );
};

export default ArtDetail;

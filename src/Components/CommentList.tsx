import React, { useContext } from "react";
import { GalleryContext, ArtComment } from "./GalleryContext";


const CommentsList = () => {
  const { comments } = useContext(GalleryContext);

  // Group them based on art name
  const groupedComments = comments.reduce<Record<string, ArtComment[]>>(
    (acc, comment) => {
      if (!acc[comment.artName]) {
        acc[comment.artName] = [];
      }
      acc[comment.artName].push(comment);
      return acc;
    },
    {}
  );

  return (
    <div className="comments-container">
      <h2 className="comments-heading" >Comments</h2>
      {Object.keys(groupedComments).map((artName) => (
        <div key={artName} className="art-section">
          {groupedComments[artName].map((c, index) => (
            <div key={index} className="comment-item">
              <div className="comment-number">{index + 1}.</div>
              <div className="comment-text">
                <span className="art-name">{artName}</span>
                <strong>{c.name}:</strong> {c.comment}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;

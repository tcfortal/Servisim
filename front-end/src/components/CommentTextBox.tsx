import {
  Box,
  Rating,
} from "@mui/material";

import { useState } from "react";

interface props{
    comment: string,
    stars: number,
    date: string
}
export const CommentTextBox:React.FC <props> = ({date,comment,stars}) => {

  return (
    <Box className="comments-grid-item-box">
      <div>
        <div className="comment-details">
          <div className="comment-data">{date}</div>
          <div className="comment-stars">
            <Rating
              className="stars"
              name="rating"
              defaultValue={stars}
              precision={1.0}
              readOnly
            />
          </div>
        </div>
        <div className="comment-content">
          
          <div className="comment-text-box">
            <p className="comment-text">
                {comment}
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};

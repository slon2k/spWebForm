import * as React from "react";

const TicketHistory = ({ versions }) => {
  const [comment, setComment] = React.useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleAddComment = () => {
    console.log(comment);
    setComment("");
  }

  return (
    <div>
      {versions.map(item => (
        <div>
          {item.Editor.LookupValue}
          <br />
          Status: {item.Status}
          {item.Comments && <p>{item.Comments}</p>}
        </div>
      ))}
      <textarea value={comment} name="Comments" onChange={handleChange} />
      <button type="button" onClick={handleAddComment}>Add</button>
    </div>
  );
};

export default TicketHistory;

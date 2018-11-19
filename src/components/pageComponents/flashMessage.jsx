import React from "react";

const FlashMessage = ({ flashData }) => {
  return flashData.showFlash ? (
    <div className="flash-container">
      <div className={"alert alert-" + flashData.alertClass + " flash"}>
        {flashData.message}
      </div>
    </div>
  ) : null;
};

export default FlashMessage;

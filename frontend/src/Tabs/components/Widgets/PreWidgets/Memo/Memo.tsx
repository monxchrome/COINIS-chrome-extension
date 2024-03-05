import React from "react";

import microphoneIcon from "../../../../assets/resources/microphone.svg";

import css from "./styles/memo.module.css";

const Memo = ({ memos }: any) => {
  const { pageName } = memos;
  console.log(pageName);
  return (
    <div>
      <div className={css.ScrollableTable}>
        <div
          className={css.TableCell}
          key={memos.id}
          // onClick={() => handleMemoPageClick(memoPage)}
        >
          <img src={microphoneIcon} alt="" />
          <p>{pageName}</p>
        </div>
      </div>
    </div>
  );
};

export default Memo;

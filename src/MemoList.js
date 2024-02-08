import React from "react";
import Logo from "./Logo";

const MemoList = ({ memos, onMemoSelect, onAddNewMemo }) => {
  const sortedByUpdate = [...memos].sort((a, b) => b.updateAt - a.updateAt);

  return (
    <div className="Sidebar">
      <Logo />
      <ul className="SidebarList">
        {sortedByUpdate.map((memo) => (
          <li
            key={memo.id}
            onClick={() => onMemoSelect(memo.id)}
            className="row"
          >
            <b>{memo.content.split("\n")[0]}</b>
          </li>
        ))}
      </ul>
      <button onClick={onAddNewMemo} className="CreateButton">
        新規作成
      </button>
    </div>
  );
};

export default MemoList;

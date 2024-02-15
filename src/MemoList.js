import React from "react";
import Logo from "./Logo";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const MemoList = ({ memos, onMemoSelect, onAddNewMemo }) => {
  const sortedByUpdate = [...memos].sort((a, b) => b.updateAt - a.updateAt);
  const { isLoggedIn } = useContext(AuthContext);

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

      {isLoggedIn && (
        <button onClick={onAddNewMemo} className="CreateButton">
          新規作成
        </button>
      )}
    </div>
  );
};

export default MemoList;

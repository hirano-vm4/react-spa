import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

const MemoActions = ({ onSave, onDelete, selectedMemo }) => {
  const [memoText, setMemoText] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (selectedMemo) {
      setMemoText(selectedMemo.content);
    } else {
      setMemoText("");
    }
  }, [selectedMemo]);

  const handleSaveClick = () => {
    if (memoText === "") {
      return alert("メモは1文字以上入力してください");
    }

    if (selectedMemo) {
      onSave(memoText);
      alert("メモが更新されました");
    } else {
      onSave(memoText);
      alert("新しいメモが保存されました");
    }
    setMemoText("");
  };

  const handleDeleteClick = () => {
    const check = window.confirm("メモを本当に削除しますか？");

    if (check) {
      onDelete(selectedMemo.id);
      alert("メモが削除されました");
      setMemoText("");
    }
  };

  return (
    <div className="MemoActionsContainer">
      <label htmlFor="textarea" className="Title">
        メモの作成
      </label>

      <textarea
        className="TextArea"
        cols="80"
        rows="15"
        placeholder="メモを入力してください(1行目がタイトルになります)"
        value={memoText}
        readOnly={!isLoggedIn}
        onChange={(e) => setMemoText(e.target.value)}
      ></textarea>

      <div className="ButtonContainer">
        {!isLoggedIn && <div className="LoginButtonPlaceholder"></div>}
        {isLoggedIn && (
          <>
            <button
              onClick={handleSaveClick}
              className="ActionButton SaveButton"
            >
              保存
            </button>
            {selectedMemo && (
              <button
                onClick={handleDeleteClick}
                className="ActionButton DeleteButton"
              >
                削除
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemoActions;

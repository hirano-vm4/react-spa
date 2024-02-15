import "./App.css";
import MemoList from "./MemoList";
import MemoActions from "./MemoActions";
import AuthenticationButton from "./AuthenticationButton";
import { AuthContextProvider } from "./AuthContext";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [memos, setMemos] = useState([]);
  const [selectedMemoId, setSelectedMemoId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedMemos = localStorage.getItem("memos");

    if (savedMemos) {
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  const handleSaveMemo = (content) => {
    let updatedMemos;

    if (selectedMemoId) {
      updatedMemos = memos.map((memo) =>
        memo.id === selectedMemoId
          ? { ...memo, content, updateAt: Date.now() }
          : memo
      );
      setMessage("メモが更新されました");
    } else {
      const newMemo = {
        id: uuidv4(),
        content,
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      updatedMemos = [...memos, newMemo];
      setMessage("新しいメモが保存されました");
    }

    refreshMemoState(updatedMemos);
  };

  const handleDeleteMemo = (id) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);

    setMessage("メモが削除されました");
    refreshMemoState(updatedMemos);
  };

  const handleMemoSelect = (id) => {
    setSelectedMemoId(id);
    setIsEditing(true);
  };

  const handleAddNewMemo = () => {
    setSelectedMemoId(0);
    setIsEditing(true);
  };

  const saveMemoToLocalStorage = (memos) => {
    localStorage.setItem("memos", JSON.stringify(memos));
  };

  const refreshMemoState = (memos) => {
    setMemos(memos);
    saveMemoToLocalStorage(memos);
    setSelectedMemoId(0);
    setIsEditing(false);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <AuthContextProvider>
      <div className="App">
        {message && <div className="MessageContainer">{message}</div>}
        <MemoList
          memos={memos}
          onMemoSelect={handleMemoSelect}
          onAddNewMemo={handleAddNewMemo}
        />
        <AuthenticationButton />
        {(selectedMemoId || isEditing) && (
          <MemoActions
            onSave={handleSaveMemo}
            onDelete={handleDeleteMemo}
            selectedMemo={memos.find((memo) => memo.id === selectedMemoId)}
          />
        )}
      </div>
    </AuthContextProvider>
  );
};
export default App;

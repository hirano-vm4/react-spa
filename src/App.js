import "./App.css";
import MemoList from "./MemoList";
import MemoActions from "./MemoActions";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [memos, setMemos] = useState([]);
  const [selectedMemoId, setSelectedMemoId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

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
    } else {
      const newMemo = {
        id: uuidv4(),
        content,
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      updatedMemos = [...memos, newMemo];
    }

    refreshMemoState(updatedMemos);
  };

  const handleDeleteMemo = (id) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);

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
  };

  return (
    <div className="App">
      <MemoList
        memos={memos}
        onMemoSelect={handleMemoSelect}
        onAddNewMemo={handleAddNewMemo}
      />
      {(selectedMemoId || isEditing) && (
        <MemoActions
          onSave={handleSaveMemo}
          onDelete={handleDeleteMemo}
          selectedMemo={memos.find((memo) => memo.id === selectedMemoId)}
        />
      )}
    </div>
  );
};
export default App;

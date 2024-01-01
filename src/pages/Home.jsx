import React, { useState} from "react";
import Card from "../components/Card";
import DialogBox from "../components/DialogBox";

export default function Home() {
  const [visible, setVisible] = useState(false); 
  const [allCards] = useState(JSON.parse(localStorage.getItem("cards")) || []);

  return (
    <div className="home p-3">
      <nav className="navbar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <DialogBox visible = {visible} setVisible={setVisible}/>
    <div className="card-container mt-6 ml-3">
     {Array.isArray(allCards) && 
      allCards.map((item)=>{
        return <Card key={item.id} item={item}/>
      })
     }
      </div>

      <button className="create-card-btn" onClick={() => setVisible(true)}>
        Create New Card
      </button>
    </div>
  );
}

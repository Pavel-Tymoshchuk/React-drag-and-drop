import React,{useState} from 'react';
import './App.css';

const App = () => {
    const [boards, setBoards] = useState([
        {id: 1, title: 'Сделать', items: [{id: 1, text: "Купить хлеб"},{id: 2, text: "Выбросить мусор"},{id: 3, text: "Как сделать create-react-app"}]},
        {id: 2, title: 'В работе', items: [{id: 1, text: "Реализация приложения"},{id: 2, text: "Покупка телефона"}]},
        {id: 3, title: 'Готово', items: [{id: 1, text: "Выучить основы React"},{id: 2, text: "Сделать приложание Drag and drop используюя React"}]},
    ]);
    
    const [currentBoard, setCurrentBord] = useState(null);
    const [currentItem, setCurrentItem] = useState(null)
    
    function dragOverHendler(e) {
        e.preventDefault();
        if(e.target.className === 'drag-elem') {
            e.target.style.boxShadow = "0px 2px 3px gray";
        }
    }
    function dragLeaveHendler(e) {
        e.target.style.boxShadow = "none";
        
    }
    function dragStartHendler(board,item) {
        setCurrentBord(board);
        setCurrentItem(item);
    }
    function dragEndHendler(e) {
        e.target.style.boxShadow = "none";
    }
    function dropHendler(e,board,item) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex,1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1,0, currentItem);
        setBoards(boards.map(b => {
            if(b.id === board.id) {
                return board;
            }
            if(b.id === currentBoard.id) {
                return currentBoard;
            }
            
            return b;
        }));
        e.target.style.boxShadow = "none";
    }
    
    function dropCardHendler(e,board) {
        e.preventDefault();
        if(e.target.className !== "drag-elem") {
            board.items.push(currentItem);
            const currentIndex = currentBoard.items.indexOf(currentItem);
            currentBoard.items.splice(currentIndex,1);
            
            setBoards(boards.map(b => {
                if(b.id === board.id) {
                    return board;
                }
                if(b.id === currentBoard.id) {
                    return currentBoard;
                }
                
                return b;
            }));
        }
    }
    
    return (
        <ul className="drag-list">
            {boards.map((board,index) =>{
                return (
                <li className="drag-item" 
                    key={index} 
                    onDragOver={(e) => dragOverHendler(e)} 
                    onDrop={(e) => dropCardHendler(e,board)}>
                    <p className="drag-item__caption">{board.title}</p>
                    {board.items.map((item,index) => {
                        return(
                        <div className="drag-elem" key={index}
                        draggable={true}
                        onDragOver={(e) => dragOverHendler(e)}
                        onDragLeave={e => dragLeaveHendler(e)}
                        onDragStart={e => dragStartHendler(board,item)}
                        onDragEnd={e => dragEndHendler(e)}
                        onDrop={e => dropHendler(e,board,item)}
                        >
                            {item.text}</div>
                    )})}
                </li>
            )})}
        </ul>
    );
}

export default App;

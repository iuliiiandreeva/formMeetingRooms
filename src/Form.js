import './App.css';
import React, { useState, useEffect } from 'react';
import Select from './Select';
import axios from 'axios';


function Form() {

    const [towers, setTowers] = useState("");
    const [selectedTower, setSelectedTower] = useState("");
    const [floors, setFloors] = useState("");
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [rooms, setRooms] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [date, setDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [text, setText] = useState("");
    // Загрузим башню для переговоров
    useEffect(() => {
    axios.get("http://localhost:3001/towers").then((response) => {
        setTowers(response.data);
    });
    }, []);
    // Изменили башню для переговоров
    const handleTowerChange = (event) => {
    setSelectedTower(event.target.value);
    };

    // При изменении башни подгрузили в сервера данные
    useEffect(() => {
    if (selectedTower) {
        axios
        .get(`http://localhost:3001/floors`)
        .then((response) => {
            setFloors(response.data);
        });
        console.log(floors);
    } else {
        setFloors([]);
        setSelectedFloor(null);
        setRooms([]);
        setSelectedRoom(null);
        // Показать ошибочку
    }
    }, [selectedTower]);

    // Изменили этаж для переговоров
    const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
    };
    // Подрузим с сервера данные 

    useEffect(() => {
    if (selectedFloor) {
        axios
        .get(`http://localhost:3001/rooms`)
        .then((response) => {
            setRooms(response.data);
        });
    } else {
        setRooms([]);
        setSelectedRoom(null);
    }
    }, [selectedFloor]);
    // Теперь есть доступные номера переговорок

    const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
    };

    useEffect(() => {
    if (selectedRoom) {
        axios
        .get(`http://localhost:3001/time`)
        .then((response) => {
            setDate(response.data);
        });
    } else {
        setRooms([]);
        setSelectedRoom(null);
    }
    }, [selectedRoom]);

    const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(selectedDate);
    };

    const handleCommentChange = (event) => {
    setText(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTime = date.filter(item => item.value === selectedDate);
        console.log(updatedTime[0].id);
        axios.delete('http://localhost:3001/time/' + updatedTime[0].id)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        console.log({
            "tower": selectedTower, 
            "floor":selectedFloor, 
            "room" : selectedRoom, 
            "date" :selectedDate,
            "comment": text});
    };

    const handleReset = () => {
    setSelectedTower('');
    setSelectedFloor('');
    setSelectedRoom('');
    setSelectedDate('');
    setText('');
    };



    return (
    <div class="container">
    <form onSubmit={handleSubmit} class="form">
        <Select label="Выбери башню" options={towers} onChange={handleTowerChange} val={selectedTower} />
        {selectedTower && (<Select label="Выбери этаж" options={floors} onChange={handleFloorChange} change={handleFloorChange} />)}
        {selectedFloor && (<Select label="Выбери переговорную" options={rooms} onChange={handleRoomChange} change = {handleRoomChange} />)}
        {selectedRoom && (<Select label="Выбери точное время" options={date} onChange={handleDateChange} />)}
        <label>
        <p>Комментарий</p>
        <textarea name="message" value={text} onChange={handleCommentChange} />
        </label>
        <div class="buttons">
        <button type="submit">Забронировать</button>
        <button type="reset" onClick={handleReset}>Сбросить форму</button> 
        </div>
    </form>
    </div>


    );
};

export default Form;

import React, { useState } from 'react';

import { axiosWithAuth } from '../helpers/axiosWithAuth';

import EditMenu from './EditMenu';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [editedColor, setEditedColor] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(res);
        const newColor = colors.map((item) => {
          if (item.id === colorToEdit.id) {
            return colorToEdit;
          } else {
            return item;
          }
        });
        updateColors(newColor);
        setColorToEdit(initialColor);
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        console.log(res);
        const newColor = colors.filter((item) => {
          return item.id !== color.id;
        });
        updateColors(newColor);
      })
      .catch((err) => console.log(err));
  };

  const addColor = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/colors', editedColor)
      .then((res) => {
        console.log(res);
        updateColors(res.data);
        setEditedColor(initialColor);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>Colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                X
              </span>{' '}
              {color.color}
            </span>

            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <h5>Add new color</h5>
      <form onSubmit={editedColor}>
        <input
          type="text"
          placeholder="Enter Color Name"
          onChange={(event) =>
            setEditedColor({
              ...editedColor,
              color: event.target.value,
            })
          }
          value={editedColor.color}
        />
        <input
          type="text"
          placeholder="Enter hex value"
          onChange={(event) =>
            setEditedColor({
              ...editedColor,
              code: { hex: event.target.value },
            })
          }
          value={editedColor.code.hex}
        />
        <button>Add New Color</button>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.

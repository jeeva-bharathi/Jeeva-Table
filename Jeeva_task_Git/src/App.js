import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const URL = 'http://jsonplaceholder.typicode.com/albums'

const App = () => {
    const [albums, setAlbums] = React.useState([])

    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setAlbums(response.data)
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = albums.filter(photo => id !== photo.id)
            setAlbums(del)
        })
    }

    const renderHeader = () => {
        let headerElement = [ albumId, id, title, url, thumbnailUrl ]

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return albums && albums.map(({ albumId, id, title, url, thumbnailUrl }) => {
            return (
                <tr key={id}>
                    <td>{albumId}</td>
                    <td>{title}</td>
                    <td>{url}</td>
                    <td>{thumbnailUrl}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>React Table</h1>
            <table id='photo'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}

export default App;
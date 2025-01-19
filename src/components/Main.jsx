import { useState, useEffect } from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imgURL: "http://i.imgflip.com/1bij.jpg"
    })
    const [memeArr, setMemeArr] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemeArr(data.data.memes))
    }, [])

    function handleChange(event) {
        const { value, name } = event.currentTarget
        setMeme(prevMeme => ({...prevMeme, [name]: value, }))
    }

    function getMeme() {
        const randNum = Math.floor(Math.random() * memeArr.length)
        const randMeme = memeArr[randNum]
        setMeme(prevMeme => ({...prevMeme, imgURL: randMeme.url }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imgURL} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}
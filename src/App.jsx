import { React, useState, useEffect } from 'react'
import { FaTwitterSquare } from 'react-icons/fa'
import { m } from 'framer-motion'
import './index.css'

function App() {
    const [quote, setQuote] = useState({
        text: '',
        author: '',
    })
    const [allQuotes, setAllQuotes] = useState([])
    useEffect(() => {
        fetch('https://type.fit/api/quotes')
            .then((res) => res.json())
            .then((data) => {
                getQuote(data)
                setAllQuotes(data)
            })
    }, [])

    function getQuote(data) {
        const randNumber = Math.floor(Math.random() * data.length)
        const randAuthor = data[randNumber].author
        const randText = data[randNumber].text

        setQuote((prevQuote) => ({
            ...prevQuote,
            text: randText,
            author: randAuthor,
        }))
    }
    return (
        <div onLoad={getQuote} id="wrapper">
            <div id="quote-box">
                <p id="text">"{quote.text}"</p>
                <p id="author">{quote.author}</p>
                <div id="button-cont">
                    <a
                        id="tweet-quote"
                        href={`https://twitter.com/intent/tweet?text=${
                            '"' + quote.text + '"' + ' ' + quote.author
                        }`}
                        taget="_blank"
                    >
                        <button id="but-twitter">
                            <FaTwitterSquare size={25} />
                        </button>
                    </a>
                    <button onClick={() => getQuote(allQuotes)} id="new-quote">
                        New Quote
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App

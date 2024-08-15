import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Interface({ Email, Name, Tell }) {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [conversation, setConversation] = useState([{ chat: '', time: '' }]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (Name.length === 0) {
            navigate('/');
        }
    }, [Name, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTyping(false);
        }, 500);

        const chat = chatRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }

        return () => clearTimeout(timer);
    }, [input]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSubmitted(false);
        }, 10);

        const chat = chatRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }

        return () => clearTimeout(timer);
    }, [submitted]);

    function handleSubmit() {
        const currentTime = new Date();
        setShowEmojiPicker(false);
        const formattedTime = ("0" + currentTime.getHours()).slice(-2) + ":" + ("0" + currentTime.getMinutes()).slice(-2);
        setIsTyping(false);
        setSubmitted(true);
        setConversation((old) => [...old, { chat: input, time: formattedTime }]);
        setInput('');
    }

    function onEmojiClick(event) {
        setInput(input + event.emoji);
    }

    return (
        <>
            <section className="container">
                <div>
                    <div className="top">
                        <h1>Live</h1>
                    </div>
                    <div>
                        <div className="people">
                            <div>
                                <div>
                                    <img className="profile" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="Profile"/>
                                    <p>Alex</p>
                                </div>
                                <div>
                                    <img className="profile" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="Profile"/>
                                    <p>Karabo</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-container">
                            <div className="chat-display" ref={chatRef}>
                                {conversation.map((text, index) => (
                                    text.chat.trim().length > 0 && (
                                        <div key={index}>
                                            <p>{text.chat}</p>
                                            <p>{text.time}</p>
                                        </div>
                                    )
                                ))}
                                {isTyping && <p>typing...</p>}
                            </div>
                            <div className="input-box">
                                <MdEmojiEmotions onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="icons"/>
                                {showEmojiPicker && <EmojiPicker onEmojiClick={(event) => onEmojiClick(event)} className="emoji" />}
                                <input
                                    type="text"
                                    placeholder="Type something..."
                                    onChange={(event) => {
                                        setInput(event.target.value);
                                        setIsTyping(true);
                                    }}
                                    value={input}
                                />
                                <IoMdSend className="send" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-profile">
                    <p>My profile</p>
                    <div>
                        <img className="profile" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="Profile"/>
                        <div>
                            <p>{Name}</p>
                            <p>{Email}</p>
                            <p>{Tell}</p>
                        </div>
                        <p className="status"></p>
                    </div>
                    <div className="btn-box">
                        <button onClick={() => navigate('/')}>Log out</button>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Interface;

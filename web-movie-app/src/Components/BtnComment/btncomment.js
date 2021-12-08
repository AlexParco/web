import { useState } from 'react'
import useUser from '../../Hooks/useUser'
import Modal from '../Modal/modal'
import './btncomment.css'

export const BtnComment = ({title}) => {
    const [comment, setComment] = useState("")
    const [showModal, setShowModal] = useState(false);
    
    const { updateComment } = useUser()

    const handleClick = () => {
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false);
    };

    const handleSend = () => {
        updateComment({comment: comment, title: title})
    }

    return (
        <>
            <button onClick={handleClick} className="btn_comment">✏️</button>
            {
                showModal && (
                    <Modal onClose={handleClose}>
                        <div className="form_comment">
                            <input onChange={e => setComment(e.target.value)} className="input_comment" type='text' placeholder="What's up!" />
                            <button onClick={handleSend}> Submit </button>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

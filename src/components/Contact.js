import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <Container className='contactconatiner'>
            <div className="contactcard">
                <h1>SOOJI YOU</h1>

                <div className="contacticon"><button className='buttonicon github'><a href="https://github.com/soojiyou"><FaGithub /> GitHub</a></button>
                    <button className='buttonicon linkedin'><a href="https://www.linkedin.com/in/sooji-you-9bb2b5272/"><FaLinkedin /> LinkedIn</a></button>
                </div>
            </div >
        </Container>
    )
}

export default Contact
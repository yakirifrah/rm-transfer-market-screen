import './style.scss';
export default function MessageCard({msg = ""}) {
    return (
        <div className='MessageCard'>
            <div className="MessageCard__content">
                <h1>{msg}</h1>
            </div>
        </div>
    );
};


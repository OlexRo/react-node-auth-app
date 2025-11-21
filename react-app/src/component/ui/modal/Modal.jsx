//Стили React
import './Modal.sass'

export const Modal= ({children,
                    active,
                    setActive}) => {
    return (
        <div
            className={active
            ? 'modalWrapper active'
            : 'modalWrapper'}
            onClick={() => setActive(false)}>
            <div
                className={active
                ? 'modalContent active'
                : 'modalContent'}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};


import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function Popup() {
    return <div className="popup">A message</div>;
}

const InfoButton = () => {
    const [showPop, setShowPop] = useState(false);

    const showInfoPopup = () => {
        console.log(showPop);
        setShowPop((prev) => !prev);
    };

    return (
        <>
            <button className="btn btn--info" onClick={showInfoPopup}>
                <span className="flex-sm">
                    <InformationCircleIcon width={25} />
                </span>
            </button>
            {showPop && (
                <div className="btn btn--info2">
                    <p>
                        This app uses local storage to save data.{' '}
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">
                            Click Here For Information
                        </a>
                    </p>
                </div>
            )}
        </>
    );
};

export default InfoButton;

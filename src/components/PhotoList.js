import React from 'react';
import Photo from './Photo';
import NoResults from './NoResults';

const PhotoList = ({ pics, title }) => {
    let photos = [];
    
    //Checks if there is anything to display in the photo gallery and if not displays a NoResults message.
    if(pics.length > 0) {
        photos = pics.map(pic => <Photo key={pic.id} url={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} />)
    }else {
        photos = <NoResults />
    }

return (
    <div className="photo-container">
        <h2>{title}</h2>
        <ul>
            {photos}
        </ul>
    </div>
)
}
export default PhotoList;
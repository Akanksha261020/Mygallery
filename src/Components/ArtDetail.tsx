import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../ApiHelper/AllApis";

interface Params {
    id?: string
}

const ArtDetail: React.FunctionComponent = () => {
    const [artworkData, setArtworkData] = useState<any>();
    const params: Params = useParams();

    //fetching art data
    const getData = async (id: string) => {
        const data = await getSingleData({ id });
        setArtworkData(data);
    }
    useEffect(() => {
        params?.id && getData(params.id)
    }, [params.id])

    const navigate = useNavigate();

    // back button function 
    const handleClickgallery = () => {
        navigate('/')
    }


    // dummy img url
    const dummyImageUrl = `https://lh3.googleusercontent.com/ci/AL18g_QgKwWYiYGeRxuLUWjnR5tRizbeYNmwX3VMls2WSkleZDnDXWxCrk1Rj4zVkHty7RZpXTouOE8`;

    //handle image error function
    const handleImgError = (event: any) => {
        event.target.src = dummyImageUrl;
    };

    return (
        <>
            <div className="artwork-container">

                {/* back button */}
                <div className='backbtn '>
                    <button onClick={handleClickgallery}>  &larr; Back to Gallery</button>
                </div>
                <h2 style={{ margin: '0' }}>{artworkData?.data?.title}</h2>
                <div className="artwork-detail" style={{ display: "flex", justifyContent: 'space-around', }}>

                    {/* image area  */}
                    <div>

                        <img
                            src={
                                artworkData?.data?.image_id
                                    ? `https://www.artic.edu/iiif/2/${artworkData?.data?.image_id}/full/843,/0/default.jpg`
                                    : dummyImageUrl
                            }
                            alt={artworkData?.data?.title}
                            className="descriptionImage"
                            onError={handleImgError}
                        ></img>
                    </div>

                    {/* details area */}
                    <div className="artwork-info">
                        <p>
                            <span>Artist:</span> {artworkData?.data?.artist_title}
                        </p>
                        <hr style={{ borderTop: '1px solid #f26541' }} />
                        <p>
                            <span> Artist Information: </span> {artworkData?.data?.artist_display}
                        </p>
                        <hr style={{ borderTop: '1px solid #f26541' }} />

                        <p>
                            <span>Place:</span> {artworkData?.data?.place_of_origin}
                        </p>
                        <hr style={{ borderTop: '1px solid #f26541' }} />

                        <p>
                            {" "}
                            <span>Date:</span> {artworkData?.data?.date_display}
                        </p>
                        <hr style={{ borderTop: '1px solid #f26541' }} />
                        <p>
                            <span>Department: </span>
                            {artworkData?.data?.department_title}
                        </p>
                        <hr style={{ borderTop: '1px solid #f26541' }} />

                        <p>
                            <span>Classification:</span> {artworkData?.data?.classification_title}
                        </p>
                        <hr style={{ borderTop: '1px solid #f26541' }} />

                        <p>
                            {" "}
                            <span>Medium:</span> {artworkData?.data?.medium_display}
                        </p>

                        <hr style={{ borderTop: '1px solid #f26541' }} />

                        <p>
                            <span> Category: </span>
                            {artworkData?.data?.category_titles[0]}
                        </p>
                        <hr style={{ borderTop: '1px solid #f26541' }} />

                        <p>
                            <span>Dimension:</span> {artworkData?.data?.dimensions}{" "}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArtDetail;
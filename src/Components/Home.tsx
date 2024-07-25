import React, { useEffect, useState } from "react";
import { getAllDataApi, getSearchData } from "../ApiHelper/AllApis";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Home: React.FunctionComponent = () => {
    // store data of arts
    const [dataList, setDataList] = useState([])
    // store data for search string
    const [searchData, setSearchData] = useState()
    // store pagination data
    const [paginationData, setPaginationData] = useState<any>()
    // store error message
    const [error, setError] = useState<string>("")

    // fetching default data
    const allData = async () => {
        const data = await getAllDataApi(1);
        if (data.data) {
            setDataList(data?.data)
            setPaginationData(data?.pagination)
            setError('');
        } else {
            setError('Something went wrong');
        }
    }

    console.log("dataList", dataList);
    
    // fetching search data
    const handleSearch = async () => {
        const data = await getSearchData(searchData, 1);
        if (data.data) {
            setDataList(data?.data)
            setPaginationData(data?.pagination)
            setError('');
        } else {
            setError('Something went wrong');
        }
    }

    // fetching pagination data
    const handlePagination = async ({ page }) => {
        if (searchData) {
            const data = await getSearchData(searchData, page);
            if (data.data) {
                setDataList(data?.data)
                setPaginationData(data?.pagination)
                setError('');
            } else {
                setError('Something went wrong');
            }
        } else {
            const data = await getAllDataApi(page);
            if (data.data) {
                setDataList(data?.data)
                setPaginationData(data?.pagination)
                setError('');
            } else {
                setError('Something went wrong');
            }
        }
    }

    const handleSort = async (order: string) => {
        const target: any = JSON.parse(JSON.stringify([...dataList]));
        target.sort((a: any, b: any) => {
            if (order === "ASC") {
                return a.title.toLowerCase().split('').join().localeCompare(b.title.toLowerCase().split('').join())
            } else {
                return b.title.toLowerCase().split('').join().localeCompare(a.title.toLowerCase().split('').join())
            }
        })

        setDataList(target);
    };

    useEffect(() => {
        allData()
    }, [])

    // dummy img url
    const dummyImageUrl = `https://dummyimage.com/600x400/000/fff&text=No+Image+Available`;

    return (
        <>
            <div style={{ display: 'flex', alignItems: "flex-start ", width: '100%', background: '#fef3f2' }}>

                {/* sidebar area */}
                <div style={{
                    boxSizing: "border-box",
                    width: '20%',
                }}>
                    <div style={{
                        padding: "20px",
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'flex-start',
                        fontSize: '20px',
                        borderBottom: '3px solid #fff',
                        marginBottom: '10px',
                        boxSizing: "border-box"
                    }}>
                        Filters
                    </div>
                    <div style={{
                        padding: "10px 20px",
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'flex-start',
                        fontSize: '16px',
                        boxSizing: "border-box"
                    }}>
                        Category
                    </div>
                    <div style={{ display: "flex", columnGap: '10px', padding: '10px 20px', borderBottom: '3px solid #fff', marginBottom: "10px" }}>
                        <input type="text" onChange={(e: any) => { setSearchData(e.target.value) }} />
                        <button onClick={() => { handleSearch() }} className="search-btn">Search</button>
                    </div>

                    <div style={{ display: "flex", columnGap: '10px', padding: '10px 20px', borderBottom: '3px solid #fff', marginBottom: "10px" }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'flex-start',
                            fontSize: '16px',
                            boxSizing: "border-box",
                        }}>
                            Sort
                        </div>
                        <div style={{
                            display: 'flex',
                            columnGap: '10px'
                        }}>
                            <button className="page-button" onClick={() => handleSort('ASC')}>Asc</button>
                            <button className="page-button" onClick={() => handleSort('DESC')}>Desc</button>
                        </div>
                    </div>

                    <div style={{ flexDirection: 'column', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '3px solid #fff', marginBottom: "10px", display: "flex", alignItems: 'center' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'flex-start',
                            fontSize: '16px',
                            boxSizing: "border-box",
                        }}>
                            Page
                        </div>
                        <div>
                            {`${paginationData?.current_page || 0} of ${paginationData?.total_pages || 0}`}
                        </div>
                        <div style={{ display: 'flex', gap: "10px", marginTop: '10px' }}>

                            <button className="page-button" style={{ fontSize: '15px' }} disabled={paginationData?.current_page > 1 ? false : true} onClick={() => { handlePagination({ page: 1 }) }}>❮❮</button>
                            <button className="page-button" style={{ fontSize: '15px' }} disabled={paginationData?.current_page > 1 ? false : true} onClick={() => { handlePagination({ page: paginationData?.current_page - 1 }) }}>
                                ❮</button>
                            <button className="page-button" style={{ fontSize: '15px' }} disabled={paginationData?.current_page < paginationData?.total_pages ? false : true} onClick={() => { handlePagination({ page: paginationData?.current_page + 1 }) }}>
                                ❯</button>
                            <button className="page-button" style={{ fontSize: '15px' }} disabled={paginationData?.current_page < paginationData?.total_pages ? false : true} onClick={() => { handlePagination({ page: paginationData?.total_pages  }) }}>❯❯</button>
                        </div>
                    </div>

                </div>

                {/* main content area */}
                <div className="results">
                    {!error ? dataList.length > 0 ? dataList?.map((artitem: any, i: number) => (
                        <Link to={`/art/${artitem.id}`} className="art-cards-url" id={`${i}`} key={i}>
                            <div style={{ paddingBottom: '10px' }}>
                                <Card sx={{
                                    maxHeight: '250px', height: '250px', ':hover': {
                                        boxShadow: 20,
                                    },
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        width="250"
                                        image={
                                            artitem.image_id
                                                ? `https://www.artic.edu/iiif/2/${artitem.image_id}/full/843,/0/default.jpg`
                                                : dummyImageUrl
                                        }
                                        alt={artitem.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '12px', fontWeight: '500' }}>
                                            {`${artitem.title} - ${artitem.artist_title}`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        </Link>
                    ))
                        : <div className="home-error">
                            <Card sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'red'
                            }}>No Data Found</Card>
                        </div>
                        :
                        <div className="home-error">
                            <Card sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'red'
                            }}>{error}</Card>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Home; 

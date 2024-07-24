
//fetch defaultdata
const getAllDataApi = async (page) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=10`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e, 'error')
        return e;
    }

}

//fetch searchdata
const getSearchData = async (search, page) => {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=id,title,image_id,artist_title,artwork_type_title,fiscal_year&page=${page}&limit=${10}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//fetch single art data
const getSingleData = async ({ id }) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_title,classification_title,date_display,artist_display,place_of_origin,dimensions_detail,dimensions,medium_display,category_titles,artist_display,department_title,image_id`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e, 'error')
        return e;
    }
}

export { getAllDataApi, getSingleData, getSearchData }
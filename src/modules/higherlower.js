import fetch from "node-fetch";
import fs from 'fs';
import request from 'request';

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

var query = `
query ($id: Int, $page: Int, $perPage: Int, $sortType: [MediaSort]) {
    Page (page: $page, perPage: $perPage) {
        media (id: $id, type: ANIME, sort: $sortType) {
            title { english romaji }
            cover:coverImage { url:extraLarge color }
            genres 
            score:averageScore 
            favourites
            popularity
        }
    }
}
`;

const fetchData = async function(query, variables) {
    var url = "https://graphql.anilist.co",
        options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
        };

    return fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    return data.data.Page.media;
}

function handleError(error) {
    console.error(error);
}

async function main() {
    let data = [];
    for(let i = 1; i <= 10; i++) {
        const arr = await fetchData(query, {
            sortType: ["POPULARITY_DESC"],
            page: i,
            perPage: 50,
        });
        for(const img of arr){
            const url = img.cover.url
            const filename = url.split("/").pop()
            img.cover.filename = filename
            try{
                download(url, `img/${filename}`, () => console.log(`DONE - ${filename}`))
            } catch {
                console.log(`ERROR - ${filename}`)
            }
        }
        data = [...data, ...arr];
    }
    // console.log(data)
    var dict = JSON.stringify(data);
    fs.writeFile("data1.json", dict, function(err, result) {
        if(err) console.log('error', err);
    });
}

main()

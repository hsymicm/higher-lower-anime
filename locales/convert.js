import fetch from "node-fetch"
import json from "./en.json" assert {type: "json"}
import fs from "node:fs"

async function translate(word, start, end) {
    const content = word.toString().replace(" ", "%20")
    var url = `https://api.mymemory.translated.net/get?q=${content}&langpair=${start}|${end}`
    return fetch(url).then(res => res.json()).then(data => { return data.responseData})
}

async function main() {
    const arr = json
    async function newObject(object) {
        if(typeof object !== 'object') {
            const res = await translate(object, "en", "fr")
            return res.translatedText
        }
        const clonedObj = { ...object };
        const entries = Object.entries(clonedObj);
        for(let [key, value] of entries) {
            if(Array.isArray(value)){
                const newArr = []
                for(const val of value) {
                    newArr.push(await newObject(val))
                }
                clonedObj[key] = newArr
            } else {
                clonedObj[key] = await newObject(value);
            }
        }
        return clonedObj
    }
    const arr_translated = await newObject(arr)
    var dict = JSON.stringify(arr_translated, null, 4);
    fs.writeFile("fr.json", dict, function(err, result) {
        if(err) console.log('error', err);
    });
}

main()
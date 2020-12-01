import axios from 'axios';
const url = "https://covid19.mathdro.id/api";
const url2 = "https://api.covid19api.com/summary";

export const fetchData = async () =>{
    try{
        const {data} = await axios.get(url);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }
        return modifiedData;
    } catch(err){
        console.log(err);
    }
}

export const fetchCountryData = async () =>{
    try{
        const {data:{Countries}} = await axios.get(url2);
        return Countries;
    } catch(err){
        console.log(err);
    }
}
import axios from 'axios';
const url = "https://api.covid19api.com/summary";

export const fetchData = async () =>{
    try{
        const {data} = await axios.get(url);
        const modifiedData = {
            confirmed: data.Global.TotalConfirmed,
            recovered: data.Global.TotalRecovered,
            deaths: data.Global.TotalDeaths,
            lastUpdate: data.Date
        }
        return modifiedData;
    } catch(err){
        console.log(err);
    }
}

export const fetchCountryData = async () =>{
    try{
        const {data:{Countries}} = await axios.get(url);
        return Countries;
    } catch(err){
        console.log(err);
    }
}
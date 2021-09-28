import MainLayout from "Layout/MainLayout";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
 
const actlist =  () => {
    useEffect( ()=> {
        // console.log("Hello");
        axios.get('http://localhost:5000/act-list').then(response => {
            console.log(response);
        })
    })
    return (
        <React.Fragment>
            <MainLayout>
            <p>This is Act List Component</p>
            </MainLayout>
        </React.Fragment>        
    )
}

export default actlist;
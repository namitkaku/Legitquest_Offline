import MainLayout from "Layout/MainLayout";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const actlist = () => {
    const style = {
        backgroundColor:'#fff',
    }
    const btnStyle = {
        padding: '4px 10px 6px 8px',
        borderRadius:'0px',
        fontSize:'15px'
    }
    const [data, setData] = useState([]);
    const [loader,setloader] = useState(true);
    const [acttype,setType] = useState('State Act List');
    const [action,setAction] = useState(true);

    function getSelectValue(event)
    {
        var value = event.target.value;
        if(value == 0)
        {
            alert("Invalid type");
        }
        else {
            axios.get('http://localhost:5000/act-list-type/' + value).then(response => {
                console.log(response);
                setData(response.data.data);
                setloader(false);
            })
        }
        // alert(event.target.value);

    }

    function getCentralData()
    {
        axios.get('http://localhost:5000/act-list-central').then(response => {
            console.log(response);
            setData(response.data.data);
            setType('Central Act List');
            setAction(false);
            setloader(false);
        })
    }

    function getWithoutCentralData()
    {
        axios.get('http://localhost:5000/act-list').then(response => {
            console.log(response);
            setData(response.data.data);
            setType('State Act List');
            setAction(true);
            setloader(false);
        })
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


    useEffect(() => {
        // console.log("Hello");
        axios.get('http://localhost:5000/act-list').then(response => {
            console.log(response.data.data);
            setData(response.data.data);
            setType('State Act List');
            setloader(false);
        })
    }, [])
    return (
        <MainLayout>
            <section className="search-listing-section bg-gray py-0">
                <div className="d-flex position-relative">
                    <div className="posts__wrapper flex-fill  mb-5 mb-lg-0 order-lg-2">
                        <div className="bg-dark latest-case-tab">
                            <div className="container">
                                <a href=""></a>
                                <ul className="nav nav-tabs posts__categories-list justify-content-start  flex-row mb-0 border-0" role="tablist">
                                    <li className="post-category nav-item  ">
                                        <a className="active" data-toggle="tab" role="tab" aria-selected="false" onClick={getWithoutCentralData}>STATE LIST</a>
                                    </li>
                                    <li className="post-category">
                                        <a className="" data-toggle="tab" role="tab" aria-selected="false" onClick={getCentralData}>CENTRAL LIST</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="container">
                            <div className="d-flex p-3 flex-wrap case-header">
                             <h4 className="font-weight-bold mb-3 mb-lg-0 mr-2 ">{acttype}</h4>

                                {action ? <div id="resultStats " className="mb-0 ml-auto">
                                    <span className="d-none d-md-inline-block">Type</span>
                                    <span className="text-muted"> </span>
                                    <select className="sort-by" onChange={getSelectValue}>
                                        <option value="0">Select</option>
                                        <option value="1">Amendment</option>
                                        <option value="2">Act</option>
                                        <option value="3">Regulations</option>
                                        <option value="4">Rules</option>
                                        <option value="5">Ordinance</option>
                                    </select>
                                </div> : null}
                                {/* <div id="resultStats " className="mb-0 ml-4">
                                    <span className="d-none d-md-inline-block">State</span>
                                    <span className="text-muted"> </span>
                                    <select className="sort-by">
                                        <option value="order_rel">Select</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>
                        <div className="container">
                            <div className="bare-act-container mx-auto">
                                <div className="table-responsive p-1">
                                    <table className="table table-padded border-0">
                                        <thead>
                                            <th>#</th>
                                            {/* <th>Bare act Id</th> */}
                                            <th>Act Name</th>
                                            {/* <th>BareAct Types</th> */}
                                            <th>Download PDF</th>
                                        </thead>
                                        {loader? <div><strong>Loading Please Wait...</strong></div> : 
                                        <tbody>
                                            {
                                                data.map((items, index) => {
                                                    return <tr style={style} key={items.Id}>
                                                       
                                                        <td>{index + 1}</td>
                                                        {/* <td>{items.bareacts_id}</td> */}
                                                        <Link to={"/act-detail/" + items.bareacts_id}><td><a className="act-link" href="">{items.bareacts_name}</a></td></Link>
                                                        {/* <td>{items.bareacts_recordtype}</td> */}
                                                        <td className="row-actions"> <a style={btnStyle} class="btn btn-outline-primary download-btn">
                                                        Download</a>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default actlist;

import MainLayout from "Layout/MainLayout";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const actlist = () => {
    const style = {
        backgroundColor:'#fff',
    }
    const [data, setData] = useState([]);
    const [loader,setloader] = useState(true);

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
    useEffect(() => {
        // console.log("Hello");
        axios.get('http://localhost:5000/act-list').then(response => {
            console.log(response.data.data);
            setData(response.data.data);
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
                                        <a className="active" data-toggle="tab" role="tab" aria-selected="false">Bare Acts List</a>
                                    </li>
                                    {/* <li className="post-category">
                                        <a className="" data-toggle="tab" role="tab" aria-selected="true">Central Acts</a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="container">
                            <div className="d-flex p-3 flex-wrap case-header">
                                <h4 className="font-weight-bold mb-3 mb-lg-0 mr-2 ">Bare Acts List</h4>

                                <div id="resultStats " className="mb-0 ml-auto">
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
                                </div>
                                <div id="resultStats " className="mb-0 ml-4">
                                    <span className="d-none d-md-inline-block">State</span>
                                    <span className="text-muted"> </span>
                                    <select className="sort-by">
                                        <option value="order_rel">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="bare-act-container mx-auto">
                                <div className="table-responsive p-1">
                                    <table className="table table-padded border-0">
                                        <thead>
                                            <th>#</th>
                                            <th>Act Name</th>
                                            <th>BareAct Types</th>
                                            <th>Download PDF</th>
                                        </thead>
                                        {loader? <div><strong>Loading Please Wait</strong></div> : 
                                        <tbody>
                                            {
                                                data.map((items, index) => {
                                                    return <tr style={style} key={items.Id}>
                                                        <td>{index + 1}</td>
                                                        <Link to={"/act-detail/" + items.bareacts_id}><td><a className="act-link" href="">{items.bareacts_name}</a></td></Link>
                                                        <td>{items.bareacts_recordtype}</td>
                                                        <td width="100" className="row-actions"> <a class="btn btn-outline-primary download-btn" href="#">
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

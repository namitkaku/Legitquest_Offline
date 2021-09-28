import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCourts, getDataForFilterForm, markSetupDone,getBenchs, setSelectedYear, setSelectedState, setSelectedBench, setSelectedCourt } from '../redux/components/app-state/appStateAction'
import { getResultForSelectedTextWithFilterForm, queryToSearch, searchTypeHead } from '../redux/components/search/searchActions'


export const mapStateToProps = state => ({
    setUpCompleted:   state.appState.setUpCompleted,
    appState:{ ...state.appState }, 
    errors:{ ...state.errors},
    search: {...state.search} ,
})

export const mapDispatchToProps = {
    
    markSetupDone$:markSetupDone,
    getDataForFilterForm$:getDataForFilterForm,
    getResultForSelectedTextWithFilterForm$:getResultForSelectedTextWithFilterForm,
    searchTypeHead$:searchTypeHead,
    queryToSearch$:queryToSearch,
    getCourts$:getCourts,
    getBenchs$:getBenchs,
    setSelectedYear$:setSelectedYear,
    setSelectedState$:setSelectedState,
    setSelectedBench$:setSelectedBench,
    setSelectedCourt$:setSelectedCourt
 
}

export const hocComponentName = (WrappedComponent) => {
    const hocComponent = ({ ...props }) => <WrappedComponent {...props} />

    hocComponent.propTypes = {
    }

    return hocComponent
}

export default ReduxWrapper => connect(mapStateToProps, mapDispatchToProps)(hocComponentName(ReduxWrapper))

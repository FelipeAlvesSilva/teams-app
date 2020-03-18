import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import Pagination from 'rc-pagination'
import { MATCHES_BRASILEIRO, MATCHES_COPA_BRASIL } from '../queries/champioshipsQueries'
import { CHAMPIOSHIPS_ID } from '../utils'
import { Loader } from './template/Loader'
import Header from './template/Header'
import MatchesList from './MatchesList'

const ChampioshipList = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [matchesPerPage, setMatchesPerPage] = useState(10)

    const queryList = props.idLeague === CHAMPIOSHIPS_ID.brasileiro ? MATCHES_BRASILEIRO : MATCHES_COPA_BRASIL
    const { loading, data } = useQuery(queryList)

    const indexOfLastMatch = currentPage * matchesPerPage
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
    
    var matchesResponse, currentMatches = null

    useEffect(() => {
        setMatchesPerPage(10)
    }, [])

    if (loading)
        return <Loader />

    if (data) {
        matchesResponse = props.idLeague === CHAMPIOSHIPS_ID.brasileiro 
            ? data.partidasBrasileiro 
            : data.partidasCopaBrasil

        currentMatches = matchesResponse.slice(indexOfFirstMatch, indexOfLastMatch)

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const handleOnChange = (e) => setCurrentPage(e)

    return (
        <Fragment>
            <Header team={props.myTeam} large={true} />
            <MatchesList matches={currentMatches} />
            <Pagination total={matchesResponse.length} pageSize={matchesPerPage} onChange={handleOnChange} />
        </Fragment>
    )
}

export const mapStateToProps = (state) => ({
    idLeague: state.league.idChampioship,
    myTeam: state.team.myTeam
})
export default connect(mapStateToProps, null)(ChampioshipList)
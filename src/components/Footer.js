import React from 'react'
import moment from 'moment'

function Footer(){
    return(
        <footer className="sticky-foote">
            <div className="my-auto p-4 bg-light">
            <div className="copyright text-center my-auto">
            <span>Copyright &copy; LinkCard {moment().format('YYYY')}</span>
            </div>
            </div>
        </footer>
    )
}

export default Footer
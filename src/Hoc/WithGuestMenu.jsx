import React from 'react'
import Menu from '../Components/Menu/Menu'

const WithGuestMenu = (Component) => (props) => {
    return <> <Menu /> <Component {...props} /></>
}


export default WithGuestMenu
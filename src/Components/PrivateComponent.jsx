import React from 'react'
import { useUser } from 'Context/UserContext'

const PrivateComponent = ({roleList, children}) => {
    const {userData} = useUser();

    if(roleList.includes(userData.rol)){
        return children;
    }

    return <></>
}

export default PrivateComponent

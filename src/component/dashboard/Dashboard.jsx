import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import Headers from '../Home-Page/Header';

export default function Dashboard() {
    const selectUser=useSelector((state)=>state.authActivity.user)
    const history=useHistory();
    

    useEffect(() => {
        if(selectUser==null){
            history.push(`/signin`);
        }
    }, [selectUser])

    return (
        <>
        <Headers/>
        <div>
            {selectUser!=null?
        selectUser.user
        :   history.push(`/signin`)

        }
        </div>

        </>
    )
}

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import Headers from '../Home-Page/Header';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Sidebar from './Side-bar';


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
        <Sidebar active="dashboard"/>
        <div>
  
  fdfd
        
        </div>

        </>
    )
}

import React, { useState } from 'react'
import Button from 'rsuite/lib/Button';


export default function Hometest(props) {
    const [drawerState, setDrawerState] = useState(false)
    const closeDrawer = ()=>setDrawerState(false)
    const openDrawer = ()=>setDrawerState(true)

    return (
      <div>
   
          <Button onClick={openDrawer}>Open</Button>
     
        
      </div>
    );
}

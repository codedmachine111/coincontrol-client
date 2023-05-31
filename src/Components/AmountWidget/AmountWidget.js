import './AmountWidget.scss'
import Icon from '@mui/material/Icon';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { red } from '@mui/material/colors';
import { UserContext } from '../../App';
import { useContext } from 'react';

export const AmountWidget = (props)=>{
    const { type, icon} = props;
    const {authUser} = useContext(UserContext);
    return(
        <>
        <div className="amount-widget-container">
            <div className='aw-icon'>
            {icon === 'up' ? <ArrowUpwardIcon className='aw-icon' color='success'/> : <ArrowDownwardIcon className='aw-icon' sx={{color : red[500]}}/>}
            </div>
            <div className='aw-amount-content'>
                <p id='type'>{type}</p>
                {type === 'Income' ? <p id='amount'>+{authUser.credit}</p> : <p id='amount'>-{authUser.expenses}</p>}
            </div>
        </div>
        </>
    )
}
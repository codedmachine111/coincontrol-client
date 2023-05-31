import './AmountWidget.scss'
import Icon from '@mui/material/Icon';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { red } from '@mui/material/colors';

export const AmountWidget = (props)=>{
    const {amount, type, icon} = props;
    return(
        <>
        <div className="amount-widget-container">
            <div className='aw-icon'>
            {icon === 'up' ? <ArrowUpwardIcon className='aw-icon' color='success'/> : <ArrowDownwardIcon className='aw-icon' sx={{color : red[500]}}/>}
            </div>
            <div className='aw-amount-content'>
                <p id='type'>{type}</p>
                <p>₹ {amount}0</p>
            </div>
        </div>
        </>
    )
}
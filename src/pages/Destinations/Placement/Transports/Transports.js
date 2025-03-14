import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import PlacementItem from "../../../../components/PlacementItem/PlacementItem";
import styles from './Transports.module.scss'

const cx = classNames.bind(styles)

function Transports() {
    let { placement } = useParams();
    const TRANSPORTS = [
        {
            name : 'Temple of Literature123',
            city : 'Ha Noi',
            star : 3.5,
            price: 20,
            img : 'https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg',
            description : "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
        },
        {
            name : 'Temple of Literature',
            city : 'Ha Nam',
            star : 4,
            price: 20,
            img : 'https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg',
            description : "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue."
        },
        {
            name : 'Temple of Literature',
            city : 'Ha Noi',
            star : 4,
            price: 20,
            img : 'https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg',
            description : "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue."
        },
        {
            name : 'Temple of Literature',
            city : 'Ha Nam',
            star : 4,
            price: 20,
            img : 'https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg',
            description : "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue."
        },
        {
            name : 'Temple of Literature',
            city : 'Ha Giang',
            star : 4,
            price: 20,
            img : 'https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg',
            description : "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue."
        },
        

    ]
    
    return ( 
    <div className={cx('wrapper')}>
        {TRANSPORTS.filter(transports => placement.replace(/([a-z])([A-Z])/g, '$1 $2') === transports.city).map((transport,index) => {
              
        return (
            <div className={cx('transports-wrapper')} key={index}>
                <PlacementItem client type={Transports.name.toLowerCase()} 
                    data = {transport}
                />
            </div>
        )})}  
    </div>)
                
}

export default Transports;
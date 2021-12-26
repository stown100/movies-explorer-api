import pic1 from '../../images/pic__COLOR_pic.png'
import pic2 from '../../images/pic__COLOR_pic2.png'
import pic3 from '../../images/pic__COLOR_pic3.png'

const title = '33 слова о дизайне';
const hour = '1ч42м';
function getRandom() {
    return Math.random();
  }

const MyCards = [
    {
        name: title,
        link: pic1,
        alt: title,
        time: hour,
        _id: getRandom()
    },
    {
        name: title,
        link: pic2,
        alt: title,
        time: hour,
        _id: getRandom()
    },
        {
        name: title,
        link: pic3,
        alt: title,
        time: hour,
        _id: getRandom()
    },
]

export default MyCards;
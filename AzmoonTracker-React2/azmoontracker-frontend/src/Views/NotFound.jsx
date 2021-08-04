import NotFound404 from '../Assets/NotFound404.png'

export default function NotFound(){

    return(
    <img 
    style={{
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: '-110px'
    }}
    src={NotFound404} alt="404_notFound"/>
    )
}
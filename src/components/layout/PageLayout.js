import Footer from '../Footer'
import Header from '../Header'


function PageLayout(props) {
    return (
        <div>
            <Header/>
            { props.children }
            <Footer />
        </div>
    )
}

export default PageLayout
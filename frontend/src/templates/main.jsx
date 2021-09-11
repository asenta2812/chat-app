import { Route, Redirect } from "react-router-dom"
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { isAuth } from "../utils"

const MainLayout = (props) => {
    return (
        <>
            {/* Header */}
            <Header />
            {/* End Header */}

            {/* Content */}
            {props.children}
            {/* End content */}


            {/* Footer */}
            <Footer />
            {/* End Footer */}
        </>
    )
}
const MainTemplate = ({ Page, ...props }) => (
    <Route  {...props}
        render={(propsComponent) => {
            const addClassToRoot = (className) => {
                const elmRoot = document.getElementById('root');
                // clear class name and add class page 
                elmRoot.className = `page ${className}`;
            }
            return <MainLayout>
                {isAuth() ? <Page {...propsComponent} addClassToRoot={addClassToRoot} /> : <Redirect to="/sign-in" />}
            </MainLayout>

        }}
    />
)
export default MainTemplate;
import { Container } from "@chakra-ui/react"
import { Route } from "react-router-dom"

const AuthenLayout = (props) => {
    return (
             <Container
                maxW="100%"
                height="100vh"
                pt="12"
                centerContent
            >
                {props.children}
            </Container>
    )
}
const AuthenTemplate = ({ Page, ...props }) => (
    <Route  {...props}
        render={(propsComponent) => {
            return <AuthenLayout>
               <Page {...propsComponent} /> 
            </AuthenLayout>
        }}
    />
)
export default AuthenTemplate;
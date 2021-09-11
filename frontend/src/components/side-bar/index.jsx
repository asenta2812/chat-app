import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { Fragment } from 'react';
import ChatRecent from '../chat-recent';
import ContactList from '../contact-list';
import HeadSideBar from '../head-sidebar';
const Sidebar = (props) => {

    return (
        <Fragment>
            <HeadSideBar {...props} />

            <Accordion allowToggle defaultIndex={[0]} height="calc(100vh - 6.5vw)" overflow="hidden" overflowY="auto">
                <AccordionItem borderTop="none">
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Recent chat
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        <ChatRecent />
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem borderBottom="none" >
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Contact on app
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        <ContactList />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Fragment>

    )
}
export default Sidebar;
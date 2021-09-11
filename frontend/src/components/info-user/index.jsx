import { Avatar, Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from '../../apis/axios';
import { showError } from "../../services/show-toast.service";

const InfoUser = ({ participant }) => {
    // const [participantInfo, setParticipantInfo] = useState(null);
    // useEffect(() => {
    //     axios.get('/user/get-user/' + props.participant.userId._id).then(result => {
    //         setParticipantInfo(result.user);
    //     }).catch(err => showError(err.message))
    // }, [props.participant])
    return (
        <>
            <Container centerContent p={5}>
                <Avatar src={participant.userId.avatar} name={participant.nickname} size="2xl" />
                <Heading as="h3" size="lg" my={5}>{participant.nickname}</Heading>
            </Container>
        </>
    )
}
export default InfoUser;
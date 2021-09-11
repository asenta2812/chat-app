import { Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, useDisclosure, useMergeRefs } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import LinkStyle from '../link-style';

export default function PassWordField({ isUseLogin = false, isConfirmPassword = false, ...props }) {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef(null);

    const mergeRefs = useMergeRefs(props.ref, inputRef);
    const onClickReveal = () => {
        onToggle();
        // set pointer focus input 
        const input = inputRef.current;
        if (input) {
            input.focus({ prevenScroll: false });

            // set pointer end of input
            const length = input.value.length * 2;
            requestAnimationFrame(() => {
                input.setSelectionRange(length, length);
            })
        }

    }
    return (
        <FormControl id={isConfirmPassword ? 'confirm-password' : 'password'}>
            <Flex justify="space-between">
                <FormLabel>{isConfirmPassword ? 'Confirm' : ''} Password</FormLabel>
                {isUseLogin ? <LinkStyle to="/forgot-password">Forgot password?</LinkStyle> : ''}
            </Flex>
            <InputGroup>
                <Input ref={mergeRefs} name={isConfirmPassword ? 'confirmPassword' : 'password'}
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="password" required {...props} />
                <InputRightElement>
                    <IconButton
                        bg="transparent !important"
                        variant="ghost"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
            </InputGroup>
        </FormControl>
    )
}

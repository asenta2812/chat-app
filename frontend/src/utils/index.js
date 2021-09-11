import React from 'react';
import ActionKey from '../constants/ActionKey';
import ConstantValue from '../constants/ConstantValue';
import store from '../stores';

export const useOnScroll = () => {
    const scrollPos = 0,
        threshold = 100;
    // config onscroll
    const [scrollTop, setScrollTop] = React.useState(0);

    React.useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.documentElement.scrollTop);

            const allProjectBut = document.querySelector('.fs-all-project-but');
            const socialFooter = document.querySelector('.fs-social');
            const navBut = document.querySelector('.fs-nav-but');
            const windowH = window.innerHeight;

            [].slice
                .call(document.querySelectorAll('.project-item'))
                .forEach(function (elm) {
                    if (
                        Math.abs(elm.getBoundingClientRect().top) <=
                        windowH - threshold
                    ) {
                        elm.classList.add('fs-ani');
                    }
                });

            [].slice
                .call(
                    document.querySelectorAll(
                        '.member, .fs-benefit-item, .wedo-item, .fs-how-we-work .fs-box'
                    )
                )
                .forEach(function (elm) {
                    if (
                        Math.abs(elm.getBoundingClientRect().top) <=
                        windowH - threshold
                    ) {
                        elm.classList.add('fs-ani');
                    }
                });

            [].slice
                .call(document.querySelectorAll('.fs-section'))
                .forEach(function (elm) {
                    if (
                        Math.abs(elm.getBoundingClientRect().top) <=
                        windowH - threshold
                    ) {
                        elm.classList.add('fs-ani');
                    }

                    if (
                        elm.getBoundingClientRect().top - scrollPos <
                        windowH / 2
                    ) {
                        [].forEach.call(
                            document.querySelectorAll('.fs-section.active'),
                            function (el) {
                                el.classList.remove('active');
                            }
                        );

                        elm.classList.add('active');

                        var target = elm.getAttribute('data-section');

                        if (
                            target == 'abouts-us' ||
                            target == 'services' ||
                            target == 'featured' ||
                            target == 'join-us'
                        ) {
                            navBut.classList.add('yellow');
                        } else {
                            navBut.classList.remove('yellow');
                        }

                        if (
                            document.querySelector(
                                '.fs-section[data-section=meet-the-team]'
                            ) !== null
                        ) {
                            var teamObj = document.querySelector(
                                '.fs-section[data-section=meet-the-team]'
                            );

                            if (
                                teamObj.getBoundingClientRect().top <=
                                    windowH / 2 + 115 &&
                                Math.abs(teamObj.getBoundingClientRect().top) <=
                                    windowH
                            ) {
                                navBut.classList.add('white');
                            } else if (
                                teamObj.getBoundingClientRect().top >
                                windowH / 2 + 115
                            ) {
                                navBut.classList.remove('white');
                            } else if (
                                Math.abs(teamObj.getBoundingClientRect().top) >
                                windowH
                            ) {
                                navBut.classList.remove('white');
                            }
                        }
                    }

                    if (
                        elm.getBoundingClientRect().top - scrollPos <
                        windowH / 10
                    ) {
                        [].forEach.call(
                            document.querySelectorAll(
                                '.fs-section.active-menu'
                            ),
                            function (el) {
                                el.classList.remove('active-menu');
                            }
                        );
                        elm.classList.add('active-menu');

                        const target = elm.getAttribute('data-section');

                        if (
                            target === 'abouts-us' ||
                            target === 'services' ||
                            target === 'featured' ||
                            target === 'join-us'
                        ) {
                            allProjectBut.classList.add('black-project');
                        } else {
                            allProjectBut.classList.remove('black-project');
                        }
                    }

                    if (
                        elm.getBoundingClientRect().top - scrollPos <
                        windowH * 0.9
                    ) {
                        [].forEach.call(
                            document.querySelectorAll(
                                '.fs-section.active-footer'
                            ),
                            function (el) {
                                el.classList.remove('active-footer');
                            }
                        );
                        elm.classList.add('active-footer');

                        const target = elm.getAttribute('data-section');
                        if (
                            target === 'abouts-us' ||
                            target === 'services' ||
                            target === 'featured' ||
                            target === 'join-us'
                        ) {
                            socialFooter.classList.add('black-footer');
                        } else {
                            socialFooter.classList.remove('black-footer');
                        }
                    }
                });
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollTop]);
};

export const isAuth = () => {
    const token = store.getState().authen.token?.token;
    if (!token) {
        return false;
    }
    const dataToken = parseJwt(token);
    // check expired
    if (Date.now() > dataToken.exp * 1000) {
        store.dispatch({ type: ActionKey.Unauthorized });
        return false;
    }
    return true;
};
export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
};
export function getItemInStorage(key = ConstantValue.AccessTokenStorageKey) {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return '';
}

export async function playSound(key = ConstantValue.Sound.Message) {
    const pathArray = {
        [ConstantValue.Sound.Message]: '/assets/sounds/sound-1.mp3',
        [ConstantValue.Sound.NewUser]: '/assets/sounds/sound-2.mp3',
    };

    const audio = new Audio(pathArray[key]);
    audio.play().catch((err) => console.log(err));
}

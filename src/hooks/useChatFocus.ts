import { useState, useEffect, useCallback } from "react";

export const useChatFocus = () => {
    const [isMessagePanelActive, setMessagePanelActive] = useState(false);

    const handleFocus = useCallback(() => setMessagePanelActive(true), []);
    const handleBlur = useCallback(() => setMessagePanelActive(false), []);

    useEffect(() => {
        console.log(isMessagePanelActive);
    }, [isMessagePanelActive]);

    useEffect(() => {
        const addListeners = (element: HTMLElement) => {
            element.addEventListener('focus', handleFocus);
            element.addEventListener('blur', handleBlur);
        }

        const removeListeners = (element: HTMLElement) => {
            element.removeEventListener('focus', handleFocus);
            element.removeEventListener('blur', handleBlur);
        }

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    const chatWindows = document.querySelectorAll('.msg-overlay-conversation-bubble');
                    chatWindows.forEach(chatWindow => {
                        const messageInput = chatWindow.querySelector('.msg-form__contenteditable') as HTMLElement;
                        if (messageInput) {
                            addListeners(messageInput);
                        }
                    });
                }
            }

            
        });

        observer.observe(document.body, { childList: true, subtree: true });
        // console.log('state:', isMessagePanelActive);

        // Clean up the observer when the component unmounts
        return () => {
            observer.disconnect();
            document.querySelectorAll('.msg-overlay-conversation-bubble').forEach(element => {
                removeListeners(element as HTMLElement);
            })
        };
    }, [handleFocus, handleBlur]);

    return isMessagePanelActive;
};

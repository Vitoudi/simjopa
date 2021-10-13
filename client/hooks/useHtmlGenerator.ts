import React, { ReactElement, useEffect, useState } from 'react'

interface useHtmlGeneratorReturnValue {
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
  makeSelectedBald: () => void;
  addPTag: () => void;
  addContentToCurrentElement: (content: string) => void;
}

interface Props {
    htmlInputContainerId: string;
}

export default function useHtmlGenerator({ htmlInputContainerId }: Props): useHtmlGeneratorReturnValue {
    const [currentElement, setCurrentElement] = useState<Element | null>(null);
    const [htmlContentPayload, setHtmlContentPayload] = useState(""); 
    const [htmlContent, setHtmlContent] = useState("");

    function getHtmlInputContainerContent() {
        const container = document.querySelector(`#${htmlInputContainerId}`);
        return container?.innerHTML || "";
    }

    function updateCurrentHtmlContentToContainerHtmlContent() {
        const htmlInputContainerContent = getHtmlInputContainerContent();

        setHtmlContent(htmlInputContainerContent);
    }

    function cleanHtmlPayload() {
        setHtmlContentPayload("");
    }

    function wrapSelectionByTagName(tagName: keyof HTMLElementTagNameMap) {
        if (!window) return;

        const selection = window.getSelection();
        if (selection?.toString().length === 0) return;
        console.log(selection);
        const range = selection?.getRangeAt(0).cloneRange();
        range?.cloneContents().children
        // const range = {...range!}
        if (!range) return;
        if (range) range.surroundContents(document.createElement(tagName));
        cleanHtmlPayload();
    }

    function addPayloadToActualHtmlContent() {
        setHtmlContent(currentContent => `${currentContent}${htmlContentPayload}`);
        cleanHtmlPayload();
    }

    function addPTag() {
        addPayloadToActualHtmlContent();
        const pElement = document.createElement("p")
        setCurrentElement(pElement);

    }

    function addContentToCurrentElement(content: string) {
        if (!currentElement) return;
        // const clonedElement = currentElement.cloneNode();
        const newContent = currentElement.innerHTML + content;
        const updatedElement = document.createElement(currentElement.tagName.toLowerCase());
        currentElement.remove();
        updatedElement.innerHTML = newContent;
        console.log(updatedElement)
        setCurrentElement(updatedElement);
    }

    function makeSelectedBald() {
        wrapSelectionByTagName("b");

        updateCurrentHtmlContentToContainerHtmlContent();
    }

    

    useEffect(() => {
        if (!currentElement) return;
        const currentElementOuterHtml = currentElement.outerHTML;
        setHtmlContentPayload(currentElementOuterHtml);
    }, [currentElement])

    useEffect(() => console.log(htmlContentPayload), [htmlContentPayload])
    // useEffect(() => console.log("actual content: ", htmlContent), [htmlContent]);

    return { htmlContent: htmlContent + htmlContentPayload, setHtmlContent, makeSelectedBald, addPTag, addContentToCurrentElement };
}


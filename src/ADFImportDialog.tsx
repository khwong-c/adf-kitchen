import React, {useState} from 'react';
import Button from '@atlaskit/button/new';
import TextArea from '@atlaskit/textarea';

import {Label} from '@atlaskit/form';
import type {EditorActions} from '@atlaskit/editor-core';
import exampleDoc from './editor/staticPage.json';

import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';

export default function ADFImportDialog(props: {
    isOpen: boolean,
    editorActions: EditorActions,
    closeDialog: () => void,
}) {
    const [adfDoc, setAdfDoc] = useState("");
    return (
        <ModalTransition>
            {props.isOpen && (
                <Modal width="large">
                    <ModalHeader>
                        <ModalTitle>Import ADF Document</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Label htmlFor="adfDoc">Paste the ADF Document below.</Label>
                        <TextArea
                            id="adfDoc"
                            name="adfDoc"
                            value={adfDoc}
                            onChange={(e) => setAdfDoc(e.target.value)}
                            onPointerEnterCapture={()=>{}}
                            onPointerLeaveCapture={()=>{}}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button appearance="subtle" onClick={(e) => {
                            props.closeDialog()
                        }}>
                            Cancel
                        </Button>
                        <Button appearance="discovery" onClick={(e) => {
                            setAdfDoc(JSON.stringify(exampleDoc, null, 2));
                        }}>
                            Get Sample ADF
                        </Button>
                        <Button appearance="primary" onClick={(e) => {
                            props.editorActions.clear();
                            props.editorActions.replaceDocument(adfDoc);
                            props.closeDialog();
                        }}>
                            Import
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </ModalTransition>
    );
}

import React from 'react';
import Button from '@atlaskit/button/new';
import {CodeBlock} from '@atlaskit/code';

import {copyToClipboard} from "@atlaskit/editor-common/clipboard";

import {Label} from '@atlaskit/form';

import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';

export default function ADFExportDialog(props: {
    isOpen: boolean,
    closeDialog: () => void,
    code: object,
}) {
    return (
        <ModalTransition>
            {props.isOpen && (
                <Modal width="large">
                    <ModalHeader>
                        <ModalTitle>Export ADF Document</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Label htmlFor="adfDocExport">Exported ADF Object as below.</Label>
                        <CodeBlock
                            id="adfDocExport"
                            name="adfDocExport"
                            text={JSON.stringify(props.code, null, 2)}
                            language={"json"}
                            showLineNumbers={false}
                            contentEditable={false}
                            onPointerEnterCapture={()=>{}}
                            onPointerLeaveCapture={()=>{}}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button appearance="subtle" onClick={(e) => {
                            props.closeDialog();
                        }}>
                            Close
                        </Button>
                        <Button appearance="primary" onClick={(e) => {
                            copyToClipboard(JSON.stringify(props.code, null, 2));
                            props.closeDialog();
                        }}>
                            Copy and Close
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </ModalTransition>
    );
}

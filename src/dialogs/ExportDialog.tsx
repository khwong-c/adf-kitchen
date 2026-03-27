import Modal, {ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition,} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button/new';
import TextArea from '@atlaskit/textarea';
import {Label} from '@atlaskit/form';

import {copyToClipboard} from "@atlaskit/editor-common/clipboard";

const ADFExportDialog = (props: {
    isOpen: boolean,
    exportedCode: string,
    onCloseDialog: () => void,
}) => {
    const {exportedCode, onCloseDialog, isOpen} = props;
    return (
        <ModalTransition>
            {isOpen && (
                <Modal width="large">
                    <ModalHeader>
                        <ModalTitle>Export ADF Document</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Label htmlFor="adfDocExport">Exported ADF Object as below.</Label>
                        <TextArea
                            id="adfDocExport"
                            name="adfDocExport"
                            maxHeight="50vh"
                            isReadOnly
                        >
                            {exportedCode}
                        </TextArea>
                    </ModalBody>
                    <ModalFooter>
                        <Button appearance="subtle" onClick={onCloseDialog}>
                            Close
                        </Button>
                        <Button appearance="primary" onClick={async () => {
                            await copyToClipboard(exportedCode);
                            onCloseDialog()
                        }}>
                            Copy and Close
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </ModalTransition>
    )
}

export default ADFExportDialog;
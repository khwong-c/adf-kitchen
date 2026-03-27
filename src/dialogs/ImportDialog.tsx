import Modal, {ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition,} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button/new';
import TextArea from '@atlaskit/textarea';
import {Label} from '@atlaskit/form';

import exampleDoc from '../assets/staticPage.json';

const ADFImportDialog = (props: {
    isOpen: boolean,
    adfDoc: string,
    setAdfDoc: (value: string) => void,
    onCloseDialog: () => void,
    onImport: () => void,
}) => {
    const {onCloseDialog, onImport, adfDoc, setAdfDoc, isOpen} = props;
    return (
        <ModalTransition>
            {isOpen && (
                <Modal width="large" onClose={onCloseDialog}>
                    <ModalHeader>
                        <ModalTitle>Import ADF Document</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Label htmlFor="adfDoc">Paste the ADF Document below.</Label>
                        <TextArea
                            id="adfDoc"
                            name="adfDoc"
                            value={adfDoc}
                            onChange={
                                (e) => setAdfDoc(e.target.value)
                            }
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button appearance="subtle" onClick={onCloseDialog}>
                            Cancel
                        </Button>
                        <Button appearance="discovery" onClick={
                            () => {
                                setAdfDoc(JSON.stringify(exampleDoc, null, 2));
                            }
                        }>
                            Get Sample ADF
                        </Button>
                        <Button appearance="primary" onClick={onImport}>
                            Import
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </ModalTransition>
    )
}

export default ADFImportDialog;
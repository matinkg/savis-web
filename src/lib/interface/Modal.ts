export interface ModalProps {
  openModal: any;
  setOpenModal: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
  modalTitle?: string;
  modalTitleStyle?: string;
  modalStylel?: string;
  headingDivStyle?: string;
}

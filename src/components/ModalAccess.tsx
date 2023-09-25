import React from 'react';
import { Modal } from '@mui/base/Modal';
import { Button } from '@mui/base/Button';
import { Box } from '@mui/system';

const ModalAccess: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desrip'
        open={open}
        slotProps={{ backdrop: {
          className:
            'bg-black'
        }}}
      >
        <Box>

        </Box>
      </Modal>
    </div>
  )
}

export default ModalAccess;
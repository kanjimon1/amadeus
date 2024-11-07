import React, { useState } from 'react';
//import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@/components/ui/dialog';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
//import Input from '@mui/material/Input';
//import Select from '@mui/material/Select';

const DeleteModal = ({ isOpen, onClose, onDelete, id }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} classes={{ paper: 'customDialog' }} // Customize width and height here
        >
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
                <p>¿Estás seguro de que quieres eliminar el registro con ID {id}?</p>
            </DialogContent>
            <DialogActions>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="destructive" onClick={() => onDelete(id)}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;